import { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getRooms();
      setRooms(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async (roomData) => {
    try {
      setLoading(true);
      const newRoom = await ApiService.createRoom(roomData);
      setRooms((prev) => [...prev, newRoom]);
      return newRoom;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRoom = async (id, updatedData) => {
    try {
      setLoading(true);
      const updatedRoom = await ApiService.updateRoom(id, updatedData);
      setRooms((prev) =>
        prev.map((room) => (room.id === id ? updatedRoom : room))
      );
      return updatedRoom;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    try {
      setLoading(true);
      await ApiService.deleteRoom(id);
      setRooms((prev) => prev.filter((room) => room.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom,
  };
};
