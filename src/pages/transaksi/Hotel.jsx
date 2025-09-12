import React, { useState, useEffect, useMemo } from "react";
import { Search, Filter, Calendar, Download, Eye, MoreVertical, RefreshCcw, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

const Hotel = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");


  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/transactions`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      if (!response.status==='ok') {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.data;
      
      const hotelTransactions = data
        .filter(transaction => transaction.transactionable_type === 'hotel')
        .map(transaction => ({
          ...transaction,
          hotel_name: transaction.transactionable?.name || `Hotel ${transaction.transactionable_id}`,
          guest_name: transaction.transactionable?.guest_name || `Guest ${transaction.id}`,
          external_id: transaction.external_id || `EXT-HTL-${transaction.id.toString().padStart(3, '0')}`
        }));
      
      setTransactions(hotelTransactions);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_status: status
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTransactions();
    } catch (err) {
      console.error('Error updating transaction:', err);
      setError(err.message);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTransactions();
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = 
        (transaction.external_id?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.hotel_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.guest_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.id.toString().includes(searchTerm));
      
      const matchesStatus = statusFilter === "all" || transaction.payment_status === statusFilter;
      const matchesPaymentMethod = paymentMethodFilter === "all" || transaction.payment_method === paymentMethodFilter;
      
      return matchesSearch && matchesStatus && matchesPaymentMethod;
    });
  }, [transactions, searchTerm, statusFilter, paymentMethodFilter]);

  const formatCurrency = (amount, currency = 'IDR') => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
      unpaid: "bg-amber-100 text-amber-800 border-amber-200",
      failed: "bg-red-100 text-red-800 border-red-200"
    };
    
    const displayStatus = status === 'paid' ? 'Paid' : status === 'unpaid' ? 'Unpaid' : 'Failed';
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[status] || statusConfig.unpaid}`}>
        {displayStatus}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    if (!method) return <span className="px-2 py-1 rounded-md text-xs font-medium border bg-gray-100 text-gray-800">-</span>;
    
    const methodConfig = {
      "Credit Card": "bg-purple-100 text-purple-800 border-purple-200",
      "Bank Transfer": "bg-blue-100 text-blue-800 border-blue-200",
      "E-Wallet": "bg-green-100 text-green-800 border-green-200"
    };
    
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${methodConfig[method] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {method}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-sm">
          <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
          <span className="text-slate-700">Memuat transaksi...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-sm border border-red-200">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-red-800 font-medium">Error memuat data</p>
            <p className="text-red-600 text-sm">{error}</p>
            <button 
              onClick={fetchTransactions}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className=" mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              {/* <h1 className="text-3xl font-bold text-slate-800">Transaksi Hotel</h1>
              <p className="text-slate-600 mt-2">Kelola dan pantau semua transaksi pemesanan hotel</p> */}
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={fetchTransactions}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-gray-100 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm"
              >
                <RefreshCcw className="w-4 h-4" />
                <span className="text-sm font-medium">Refresh</span>
              </button>
              <button className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200"
            >
              <option value="all">Semua Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200"
            >
              <option value="all">Semua Metode Pembayaran</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="E-Wallet">E-Wallet</option>
            </select>

            <div className="flex items-center justify-end">
              <span className="text-sm text-slate-600">
                {filteredTransactions.length} transaksi ditemukan
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">ID Transaksi</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Hotel & Tamu</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">External ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Jumlah</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Metode Pembayaran</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Tanggal</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr 
                    key={transaction.id} 
                    className={`border-b border-slate-100 hover:bg-slate-50/50 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white/50' : 'bg-slate-50/30'
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="font-mono text-sm font-medium text-slate-800">
                        #{transaction.id.toString().padStart(4, '0')}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        HTL-{transaction.transactionable_id}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-800 text-sm">
                        {transaction.hotel_name}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Tamu: {transaction.guest_name}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-md inline-block">
                        {transaction.external_id}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800">
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {transaction.currency}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getPaymentMethodBadge(transaction.payment_method)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(transaction.payment_status)}
                        <select
                          value={transaction.payment_status}
                          onChange={(e) => updateTransactionStatus(transaction.id, e.target.value)}
                          className="text-xs border border-slate-200 rounded px-1 py-0.5"
                        >
                          <option value="unpaid">Unpaid</option>
                          <option value="paid">Paid</option>
                          <option value="failed">Failed</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-slate-800">
                        {transaction.transaction_date ? 
                          new Date(transaction.transaction_date).toLocaleDateString('id-ID') :
                          new Date(transaction.created_at).toLocaleDateString('id-ID')
                        }
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(transaction.created_at).toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-1.5 hover:bg-primary-100 rounded-lg transition-colors duration-200"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4 text-primary-600" />
                        </button>
                        <button 
                          onClick={() => deleteTransaction(transaction.id)}
                          className="p-1.5 hover:bg-red-100 rounded-lg transition-colors duration-200"
                          title="Hapus Transaksi"
                        >
                          <MoreVertical className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-2">
                <Calendar className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg font-medium">Tidak ada transaksi ditemukan</p>
                <p className="text-sm">Coba ubah filter pencarian Anda</p>
              </div>
            </div>
          )}
        </div>

        {filteredTransactions.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Menampilkan {filteredTransactions.length} dari {transactions.length} transaksi
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 disabled:opacity-50">
                Sebelumnya
              </button>
              <span className="px-4 py-2 bg-primary-500 text-white rounded-lg">1</span>
              <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 disabled:opacity-50">
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotel;