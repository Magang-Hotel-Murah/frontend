import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, Plus, Edit, Trash2, Check, X, Filter } from 'lucide-react';

// Mock API functions - replace with your actual API calls
const api = {
  // Meeting Rooms API
  getRooms: async () => {
    // Replace with: await fetch('/api/meeting-rooms')
    return [
      { id: 1, name: 'Conference Room A', description: 'Large room with projector, seats 20 people' },
      { id: 2, name: 'Meeting Room B', description: 'Medium room with whiteboard, seats 10 people' },
      { id: 3, name: 'Boardroom', description: 'Executive boardroom with video conferencing, seats 12 people' }
    ];
  },
  
  // Reservations API
  getReservations: async () => {
    // Replace with: await fetch('/api/meeting-room-reservations')
    return [
      {
        id: 1,
        meeting_room_id: 1,
        start_time: '2025-09-20T09:00:00Z',
        end_time: '2025-09-20T11:00:00Z',
        status: 'approved',
        user: { id: 1, name: 'John Doe', division: { name: 'IT Department' } },
        room: { id: 1, name: 'Conference Room A' }
      },
      {
        id: 2,
        meeting_room_id: 2,
        start_time: '2025-09-20T14:00:00Z',
        end_time: '2025-09-20T16:00:00Z',
        status: 'pending',
        user: { id: 2, name: 'Jane Smith', division: { name: 'Marketing' } },
        room: { id: 2, name: 'Meeting Room B' }
      }
    ];
  },
  
  createReservation: async (data) => {
    // Replace with: await fetch('/api/meeting-room-reservations', { method: 'POST', body: JSON.stringify(data) })
    return { id: Date.now(), ...data, status: 'pending' };
  },
  
  updateReservationStatus: async (id, status) => {
    // Replace with: await fetch(`/api/meeting-room-reservations/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) })
    return { id, status };
  },
  
  deleteReservation: async (id) => {
    // Replace with: await fetch(`/api/meeting-room-reservations/${id}`, { method: 'DELETE' })
    return true;
  }
};

const Booking = () => {
  const [activeTab, setActiveTab] = useState('reservations');
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Form state for new reservation
  const [newReservation, setNewReservation] = useState({
    meeting_room_id: '',
    start_time: '',
    end_time: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [reservationsData, roomsData] = await Promise.all([
        api.getReservations(),
        api.getRooms()
      ]);
      setReservations(reservationsData);
      setRooms(roomsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReservation = async () => {
    if (!newReservation.meeting_room_id || !newReservation.start_time || !newReservation.end_time) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      const created = await api.createReservation(newReservation);
      setReservations([...reservations, created]);
      setShowCreateModal(false);
      setNewReservation({ meeting_room_id: '', start_time: '', end_time: '' });
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.updateReservationStatus(id, status);
      setReservations(reservations.map(r => 
        r.id === id ? { ...r, status } : r
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteReservation = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        await api.deleteReservation(id);
        setReservations(reservations.filter(r => r.id !== id));
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('id-ID'),
      time: date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const filteredReservations = filterStatus === 'all' 
    ? reservations 
    : reservations.filter(r => r.status === filterStatus);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Meeting Room Reservation</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Reservation
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('reservations')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'reservations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-5 w-5 inline mr-2" />
                Reservations
              </button>
              <button
                onClick={() => setActiveTab('rooms')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'rooms'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MapPin className="h-5 w-5 inline mr-2" />
                Meeting Rooms
              </button>
            </nav>
          </div>

          {/* Reservations Tab */}
          {activeTab === 'reservations' && (
            <div className="p-6">
              {/* Filter */}
              <div className="flex items-center mb-6">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Reservations List */}
              <div className="space-y-4">
                {filteredReservations.map((reservation) => {
                  const startTime = formatDateTime(reservation.start_time);
                  const endTime = formatDateTime(reservation.end_time);
                  
                  return (
                    <div key={reservation.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 mr-3">
                              {reservation.room?.name}
                            </h3>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(reservation.status)}`}>
                              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-gray-400" />
                              <div>
                                <span className="font-medium">{reservation.user?.name}</span>
                                <br />
                                <span className="text-gray-500">{reservation.user?.division?.name}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{startTime.date}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{startTime.time} - {endTime.time}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center space-x-2 ml-4">
                          {reservation.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(reservation.id, 'approved')}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(reservation.id, 'rejected')}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                              >
                                <X className="h-3 w-3 mr-1" />
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteReservation(reservation.id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {filteredReservations.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No reservations found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {filterStatus === 'all' 
                        ? 'Get started by creating a new reservation.'
                        : `No ${filterStatus} reservations found.`
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Rooms Tab */}
          {activeTab === 'rooms' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <div key={room.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <MapPin className="h-8 w-8 text-blue-600" />
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="h-5 w-5" />
                      </button>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{room.name}</h3>
                    <p className="text-sm text-gray-600">{room.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Reservation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Reservation</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Room</label>
                  <select
                    value={newReservation.meeting_room_id}
                    onChange={(e) => setNewReservation({...newReservation, meeting_room_id: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a room</option>
                    {rooms.map(room => (
                      <option key={room.id} value={room.id}>{room.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="datetime-local"
                    value={newReservation.start_time}
                    onChange={(e) => setNewReservation({...newReservation, start_time: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="datetime-local"
                    value={newReservation.end_time}
                    onChange={(e) => setNewReservation({...newReservation, end_time: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateReservation}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;