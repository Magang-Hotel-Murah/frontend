import React, { useState, useRef, useEffect } from "react";
import { X, Search, ChevronDown, DoorOpen, Users, MapPin, Maximize2 } from "lucide-react";

const ImageModal = ({ imageUrl, roomName, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
      >
        <X className="w-6 h-6 text-gray-800" />
      </button>
      
      <div className="max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageUrl}
          alt={roomName}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
        <p className="text-white text-center mt-4 text-lg font-medium">{roomName}</p>
      </div>
    </div>
  );
};

const SearchableRoomDropdown = ({ rooms, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImageModal, setSelectedImageModal] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const filteredRooms = rooms.filter((room) => {
    const search = searchTerm.toLowerCase();
    return (
      room.name.toLowerCase().includes(search) ||
      room.location?.toLowerCase().includes(search) ||
      room.capacity?.toString().includes(search)
    );
  });

  const selectedRoom = rooms.find((r) => r.id === parseInt(value));

  const handleImageClick = (e, room) => {
    e.stopPropagation();
    setSelectedImageModal(room);
  };

  return (
    <>
      <div className="relative flex-1" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          <span className={selectedRoom ? "text-gray-900" : "text-gray-400"}>
            {selectedRoom ? (
              <div className="flex items-center gap-3">
                {selectedRoom.images && (
                  <img
                    src={selectedRoom.images}
                    alt={selectedRoom.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                )}
                <div>
                  <div className="font-medium">{selectedRoom.name}</div>
                  <div className="text-xs text-gray-500">
                    {selectedRoom.location && `${selectedRoom.location} • `}
                    Kapasitas: {selectedRoom.capacity} orang
                  </div>
                </div>
              </div>
            ) : (
              placeholder || "Pilih Ruangan"
            )}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-hidden">
            <div className="p-3 border-b sticky top-0 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari ruangan, lokasi..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  autoFocus
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-80">
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`relative group ${
                      value === room.id ? "bg-primary-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onChange(room.id);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                      className="w-full px-4 py-3 text-left transition-colors flex gap-3 items-start"
                    >
                      {room.images && (
                        <div className="relative flex-shrink-0">
                          <img
                            src={room.images}
                            alt={room.name}
                            className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={(e) => handleImageClick(e, room)}
                            className="absolute inset-0 bg-opacity-0 hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center group-hover:bg-opacity-20"
                          >
                            <Maximize2 className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 mb-1">
                          {room.name}
                        </div>
                        
                        <div className="space-y-1">
                          {room.location && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              <span>{room.location}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Users className="w-3 h-3" />
                            <span>Kapasitas: {room.capacity} orang</span>
                          </div>

                          {room.facilities && room.facilities.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {room.facilities.slice(0, 3).map((facility, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                                >
                                  {facility}
                                </span>
                              ))}
                              {room.facilities.length > 3 && (
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                  +{room.facilities.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                  <DoorOpen className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Tidak ada ruangan ditemukan</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedImageModal && (
        <ImageModal
          imageUrl={selectedImageModal.images}
          roomName={selectedImageModal.name}
          onClose={() => setSelectedImageModal(null)}
        />
      )}
    </>
  );
};

export default SearchableRoomDropdown;