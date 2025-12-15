import React from 'react';
import { Search, X, AlertCircle, Calendar, Users, CheckCircle2, MapPin } from 'lucide-react';
import {DateTimePicker} from '@common';

const SearchRoomForm = ({
  searchParams,
  searchResults,
  isSearching,
  error,
  message,
  availableFacilities,
  handleInputChange,
  toggleFacility,
  handleSearch,
  handleReset,
  handleBookRoom,
  isSearchDisabled
}) => {
  const formatTime = (time) => {
    return time.substring(0, 5);
  };

  return (
    <div className="space-y-6">
      {/* Form Pencarian */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Cari Ruangan
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Tanggal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={searchParams.date}
              onChange={handleInputChange}
              onFocus={(e) => e.target.showPicker()}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Jumlah Participant */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Participant <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="participants_count"
              value={searchParams.participants_count}
              onChange={handleInputChange}
              min="1"
              placeholder="Masukkan jumlah participant"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Waktu Mulai */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Waktu Mulai <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="start_time"
              value={searchParams.start_time}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Waktu Selesai */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Waktu Selesai <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="end_time"
              value={searchParams.end_time}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Fasilitas (Opsional) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fasilitas (Opsional)
          </label>
          <div className="flex flex-wrap gap-2">
            {availableFacilities.map((facility) => (
              <button
                key={facility}
                type="button"
                onClick={() => toggleFacility(facility)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  searchParams.facilities.includes(facility)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {facility}
              </button>
            ))}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            disabled={isSearchDisabled || isSearching}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            {isSearching ? 'Mencari...' : 'Cari Ruangan'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Hasil Pencarian */}
      {message && searchResults.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-sm text-green-700">{message}</p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">
            Hasil Pencarian ({searchResults.length} ruangan ditemukan)
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {searchResults.map((room) => (
              <div
                key={room.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-sm transition-all"
              >
                {/* Room Image */}
                {room.images && room.images.length > 0 && (
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={room.images[0]} 
                      alt={room.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-base">{room.name}</h4>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                        room.type === 'main' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {room.type === 'main' ? 'Ruang Utama' : 'Ruang Cabang'}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  {room.location && (
                    <div className="flex items-start gap-1 text-xs text-gray-600 mb-2">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{room.location}</span>
                    </div>
                  )}

                  {/* Capacity */}
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                    <Users className="w-3.5 h-3.5" />
                    <span>Kapasitas: {room.capacity} orang</span>
                  </div>

                  {/* Facilities */}
                  <div className="mb-3 flex gap-2 items-start">
                    <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Fasilitas:</p>
                    <div className="flex flex-wrap gap-1">
                      {room.facilities.map((facility, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Free Slots */}
                  {room.free_slots?.length > 0 && (
                    <div className="mb-3 flex gap-2 items-start">
                      <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Waktu Tersedia:</p>
                      <div className="flex flex-wrap gap-1">
                        {room.free_slots.map((slot, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded"
                          >
                            {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Booking Button */}
                  <button 
                    onClick={() => handleBookRoom(room.id)}
                    className="w-full bg-blue-500 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    Booking Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.length === 0 && searchParams.date && !isSearching && !error && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Search className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">
            Tidak ada ruangan yang tersedia dengan kriteria yang Anda pilih
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchRoomForm;