import React, { useState, useMemo } from "react";
import { Search, Filter, Calendar, Download, Eye, MoreVertical } from "lucide-react";

const Hotel = () => {
  // Sample data - dalam implementasi nyata, data ini akan dari API
  const [transactions] = useState([
    {
      id: 1,
      transactionable_id: "HTL001",
      transactionable_type: "hotel",
      external_id: "EXT-HTL-001",
      amount: 1500000,
      currency: "IDR",
      payment_method: "Credit Card",
      payment_status: "completed",
      transaction_date: "2024-08-20",
      created_at: "2024-08-20 10:30:00",
      updated_at: "2024-08-20 10:32:00",
      hotel_name: "Grand Hyatt Jakarta",
      guest_name: "Ahmad Rizki"
    },
    {
      id: 2,
      transactionable_id: "HTL002",
      transactionable_type: "hotel",
      external_id: "EXT-HTL-002",
      amount: 2250000,
      currency: "IDR",
      payment_method: "Bank Transfer",
      payment_status: "pending",
      transaction_date: "2024-08-21",
      created_at: "2024-08-21 14:15:00",
      updated_at: "2024-08-21 14:15:00",
      hotel_name: "The Ritz-Carlton Jakarta",
      guest_name: "Sari Dewi"
    },
    {
      id: 3,
      transactionable_id: "HTL003",
      transactionable_type: "hotel",
      external_id: "EXT-HTL-003",
      amount: 950000,
      currency: "IDR",
      payment_method: "E-Wallet",
      payment_status: "completed",
      transaction_date: "2024-08-22",
      created_at: "2024-08-22 09:45:00",
      updated_at: "2024-08-22 09:47:00",
      hotel_name: "Hotel Indonesia Kempinski",
      guest_name: "Budi Santoso"
    },
    {
      id: 4,
      transactionable_id: "HTL004",
      transactionable_type: "hotel",
      external_id: "EXT-HTL-004",
      amount: 3200000,
      currency: "IDR",
      payment_method: "Credit Card",
      payment_status: "failed",
      transaction_date: "2024-08-23",
      created_at: "2024-08-23 16:20:00",
      updated_at: "2024-08-23 16:22:00",
      hotel_name: "Mandarin Oriental Jakarta",
      guest_name: "Lisa Andriani"
    },
    {
      id: 5,
      transactionable_id: "HTL005",
      transactionable_type: "hotel",
      external_id: "EXT-HTL-005",
      amount: 1800000,
      currency: "IDR",
      payment_method: "Bank Transfer",
      payment_status: "completed",
      transaction_date: "2024-08-24",
      created_at: "2024-08-24 11:10:00",
      updated_at: "2024-08-24 11:12:00",
      hotel_name: "Four Seasons Hotel Jakarta",
      guest_name: "David Kurniawan"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");

  // Filter transaksi hanya untuk hotel dan berdasarkan filter lainnya
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(transaction => transaction.transactionable_type === "hotel") // Filter hanya hotel
      .filter(transaction => {
        const matchesSearch = 
          transaction.external_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.hotel_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.guest_name.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || transaction.payment_status === statusFilter;
        const matchesPaymentMethod = paymentMethodFilter === "all" || transaction.payment_method === paymentMethodFilter;
        
        return matchesSearch && matchesStatus && matchesPaymentMethod;
      });
  }, [transactions, searchTerm, statusFilter, paymentMethodFilter]);

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      failed: "bg-red-100 text-red-800 border-red-200"
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    const methodConfig = {
      "Credit Card": "bg-purple-100 text-purple-800 border-purple-200",
      "Bank Transfer": "bg-blue-100 text-blue-800 border-blue-200",
      "E-Wallet": "bg-green-100 text-green-800 border-green-200"
    };
    
    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${methodConfig[method]}`}>
        {method}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className=" mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {/* <div>
              <p className="text-slate-600 mt-2">Kelola dan pantau semua transaksi pemesanan hotel</p>
            </div> */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            >
              <option value="all">Semua Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            {/* Payment Method Filter */}
            <select
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            >
              <option value="all">Semua Metode Pembayaran</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="E-Wallet">E-Wallet</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-end">
              <span className="text-sm text-slate-600">
                {filteredTransactions.length} transaksi ditemukan
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
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
                      {getStatusBadge(transaction.payment_status)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-slate-800">
                        {new Date(transaction.transaction_date).toLocaleDateString('id-ID')}
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
                        <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors duration-200">
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors duration-200">
                          <MoreVertical className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-2">
                <Calendar className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg font-medium">Tidak ada transaksi ditemukan</p>
                <p className="text-sm">Coba ubah filter pencarian Anda</p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Menampilkan {filteredTransactions.length} dari {filteredTransactions.length} transaksi
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