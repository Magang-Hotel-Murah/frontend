import { useState, useEffect, useMemo } from "react";
import ApiService from "../services/ApiService";
import { transformTransaction } from '@utils';

export const useTransactions = (type = null) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await ApiService.getTransactions();

      const transformed = data.map(t => transformTransaction(t, type))

      setTransactions(transformed);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionStatus = async (id, status) => {
    try {
      await ApiService.updateTransaction(id, { payment_status: status });
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
      await ApiService.deleteTransaction(id);
      await fetchTransactions();
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [type]);

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    updateTransactionStatus,
    deleteTransaction,
  };
};
