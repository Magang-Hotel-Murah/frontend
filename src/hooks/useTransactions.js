import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ApiService from "../services/ApiService";
import transformTransaction from '@utils';

export const useTransactions = () => {
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
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/${id}`,
        { payment_status: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/transactions/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchTransactions();
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.external_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.hotel_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.guest_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toString().includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || t.payment_status === statusFilter;
      const matchesPaymentMethod =
        paymentMethodFilter === "all" || t.payment_method === paymentMethodFilter;

      return matchesSearch && matchesStatus && matchesPaymentMethod;
    });
  }, [transactions, searchTerm, statusFilter, paymentMethodFilter]);

  return {
    transactions,
    filteredTransactions,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    paymentMethodFilter,
    setPaymentMethodFilter,
    fetchTransactions,
    updateTransactionStatus,
    deleteTransaction,
  };
};
