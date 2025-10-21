import { useState, useEffect, useCallback } from "react";
import ApiService from "../services/ApiService";

export const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReservations = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
            
      const response = await ApiService.getReservations(params);

      const data = response?.data?.data || response?.data || response || [];

      setReservations(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Gagal mengambil data reservasi", err);
      console.error("Response was:", response);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }, []);

    const getReservationById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await ApiService.getReservationsById(id);
      return response;
    }catch(err) {
      console.error("Gagal mengambil data reservasi", err);
      setError(err);
    }finally {
      setLoading(false);
    }
  }, []);

  const fetchRoom = useCallback(async () => {
    try {
      setLoading(true);
      setError(null)
      const data = await ApiService.getRooms();
      setRooms(data);
    }catch(err) {
      console.error("Gagal mengambil data ruangan:", err);
      setError(null);
    }finally{
      setLoading(false);
    }
  }, []);

  const createReservation = async (reservationData) => {
    try {
      setLoading(true);
      const newReservation = await ApiService.createReservation(reservationData);
      setReservations((prev) => [...prev, newReservation]);
      return newReservation;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id, status) => {
    try {
      setLoading(true);
      await ApiService.updateReservationStatus(id, status);
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === id ? { ...reservation, status } : reservation
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteReservation = async (id) => {
    try {
      setLoading(true);
      await ApiService.deleteReservation(id);
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
    fetchRoom();
  }, [fetchReservations, fetchRoom]);

  return {
    reservations,
    rooms,
    loading,
    error,
    fetchReservations,
    getReservationById,
    fetchRoom,
    createReservation,
    updateReservationStatus,
    deleteReservation,
  };
};
