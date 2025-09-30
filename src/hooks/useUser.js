import { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

export const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const  userData = await ApiService.getUsers();

      setUsers(Array.isArray(userData.data) ? userData.data : Array.isArray(userData) ? userData :[]);

    } catch (err) {
      setError(err.message);
      console.error("Error laoding users:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  const toggleUserStatus = async (id) => {
    try {
      setLoading(true);
      await ApiService.deleteUser(id);
      setUsers((prev) =>
        prev.map((u) => 
          u.id === id
            ? { ...u, deleted_at: u.deleted_at ? null : new Date().toISOString() }
            : u
          )
      );
    } catch (err) {
      console.error("Gagal toggle status user", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return {
    users,
    loading,
    error,
    updateUser,
    toggleUserStatus,
    loadInitialData,
  };
};
