import React, { useState, useEffect } from "react";
import { Calendar, Filter, Plus, Search, Check, X, Trash2, Users, Clock } from "lucide-react";
import api from "../../services/apiMeetRoom";
import { CreateReservationModal, Pagination } from "@ui";


export const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRoom, setFilterRoom] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [newReservation, setNewReservation] = useState({
    meeting_room_id: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [reservationsData, roomsData] = await Promise.all([
        api.getReservations(),
        api.getRooms(),
      ]);
      setReservations(reservationsData);
      setRooms(roomsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReservation = async () => {
    if (
      !newReservation.meeting_room_id ||
      !newReservation.start_time ||
      !newReservation.end_time
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const created = await api.createReservation(newReservation);
      setReservations([...reservations, created]);
      setShowCreateModal(false);
      setNewReservation({ meeting_room_id: "", start_time: "", end_time: "" });
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.updateReservationStatus(id, status);
      setReservations(
        reservations.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteReservation = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        await api.deleteReservation(id);
        setReservations(reservations.filter((r) => r.id !== id));
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch = 
      reservation.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.room?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.user?.division?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "" || reservation.status === filterStatus;
    const matchesRoom = filterRoom === "" || reservation.meeting_room_id.toString() === filterRoom;
    
    return matchesSearch && matchesStatus && matchesRoom;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentReservations = filteredReservations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("id-ID"),
      time: date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Booking Ruangan Meeting
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari nama, ruangan, atau divisi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Semua Ruangan</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>

          <div className="flex items-center text-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            {filteredReservations.length} dari {reservations.length} reservations
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meeting Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentReservations.map((reservation) => {
                const startTime = formatDateTime(reservation.start_time);
                const endTime = formatDateTime(reservation.end_time);
                
                return (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {reservation.room?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {reservation.user?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {reservation.user?.division?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {startTime.date}
                          </div>
                          <div className="text-sm text-gray-500">
                            {startTime.time} - {endTime.time}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          reservation.status
                        )}`}
                      >
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {reservation.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(reservation.id, "approved")}
                              className="text-green-600 hover:text-green-900 p-1"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(reservation.id, "rejected")}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeleteReservation(reservation.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {currentReservations.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No reservations found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {filteredReservations.length === 0 && searchTerm === "" && filterStatus === "" && filterRoom === ""
                ? "Get started by creating a new reservation."
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredReservations.length}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Create Reservation Modal */}
      <CreateReservationModal
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        newReservation={newReservation}
        setNewReservation={setNewReservation}
        rooms={rooms}
        onCreateReservation={handleCreateReservation}
      />
    </div>
  );
};

export default Reservation;