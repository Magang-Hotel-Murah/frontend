import { useState, useEffect } from 'react';
import ApiService from '../services/apiMeetRoom';

export const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getReservations();
      setReservations(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getRooms();
      setRooms(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const createReservation = async (reservationData) => {
    try {
      setLoading(true);
      const newReservation = await ApiService.createReservation(reservationData);
      setReservations(prev => [...prev, newReservation]);
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
      setReservations(prev => 
        prev.map(reservation => 
          reservation.id === id 
            ? { ...reservation, status }
            : reservation
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
      setReservations(prev => prev.filter(reservation => reservation.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [reservationsData, roomsData] = await Promise.all([
        ApiService.getReservations(),
        ApiService.getRooms()
      ]);
      setReservations(reservationsData);
      setRooms(roomsData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return {
    reservations,
    rooms,
    loading,
    error,
    fetchReservations,
    fetchRooms,
    createReservation,
    updateReservationStatus,
    deleteReservation,
    loadInitialData
  };
};