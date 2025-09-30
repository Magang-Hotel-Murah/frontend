import React, { useState, useEffect, useMemo } from "react";
import { Download, RefreshCcw, AlertCircle } from "lucide-react";
import axios from "axios";
import { paginateData, filterBySearch } from "@utils";
import { TransactionFilter, TransactionTable } from "@contenttransaction";
import { Pagination } from "@common";
import { useTransactions } from "@hooks";

const Hospitality = () => {
  const { transactions, loading, error, fetchTransactions, updateTransactionStatus, deleteTransaction } = useTransactions("hotel");


  const [filterStatus, setFilterStatus] = useState("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  
  const handleViewDetail = (transaction) => {
    console.log("View detail:", transaction);
    // Implement modal or navigation to detail page
  };

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
