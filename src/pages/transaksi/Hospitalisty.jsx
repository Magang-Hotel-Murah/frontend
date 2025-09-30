import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Download,
  Eye,
  MoreVertical,
  RefreshCcw,
  Loader2,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { paginateData, filterBySearch } from "@utils";
import { TransactionFilter, TransactionTable } from "@contenttransaction";
import { Pagination } from "@common";

const Hospitality = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterStatus, setFilterStatus] = useState("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.status === "ok") {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.data;

      const hotelTransactions = data
        .filter((transaction) => transaction.transactionable_type === "hotel")
        .map((transaction) => ({
          ...transaction,
          hotel_name:
            transaction.transactionable?.name ||
            `Hotel ${transaction.transactionable_id}`,
          guest_name:
            transaction.transactionable?.guest_name ||
            `Guest ${transaction.id}`,
          external_id:
            transaction.external_id ||
            `EXT-HTL-${transaction.id.toString().padStart(3, "0")}`,
        }));

      setTransactions(hotelTransactions);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_status: status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTransactions();
    } catch (err) {
      console.error("Error updating transaction:", err);
      setError(err.message);
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTransactions();
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError(err.message);
    }
  };

  const handleViewDetail = (transaction) => {
    console.log("View detail:", transaction);
    // Implement modal or navigation to detail page
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = filterBySearch(transactions, searchTerm, [
    "external_id",
    "hotel_name",
    "guest_name",
    "id",
  ]).filter((transaction) => {
    const matchesStatus =
      filterStatus === "" || transaction.payment_status === filterStatus;
    const matchesPaymentMethod =
      filterPaymentMethod === "" ||
      transaction.payment_method === filterPaymentMethod;

    return matchesStatus && matchesPaymentMethod;
  });

  const { currentData: currentTransaction, totalPages } = paginateData(
    filteredTransactions,
    currentPage,
    itemsPerPage
  );

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
            <div></div>
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

        <TransactionFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setFilterPaymentMethod={setFilterPaymentMethod}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          resultCount={filteredTransactions.length}
          totalCount={transactions.length}
        />

        <br />
        
        <TransactionTable
          transactions={currentTransaction}
          loading={loading}
          onUpdateStatus={updateTransactionStatus}
          onDelete={deleteTransaction}
          onViewDetail={handleViewDetail}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredTransactions.length}
        />
      </div>
    </div>
  );
};

export default Hospitality;
