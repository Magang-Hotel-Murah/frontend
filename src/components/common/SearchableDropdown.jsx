import React, { useState, useRef, useEffect } from "react";
import { Users, X, Plus, Search, ChevronDown, Building2, Briefcase } from "lucide-react";

const SearchableDropdown = ({ users, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.division.toLowerCase().includes(search) ||
      user.position.toLowerCase().includes(search)
    );
  });

  const selectedUser = users.find((u) => u.id === parseInt(value));

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <span className={selectedUser ? "text-gray-900" : "text-gray-400"}>
          {selectedUser ? (
            <div>
              <div className="font-medium">{selectedUser.name}</div>
              <div className="text-xs text-gray-500">
                {selectedUser.division} • {selectedUser.position}
              </div>
            </div>
          ) : (
            placeholder || "Select User"
          )}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-hidden">
          <div className="p-3 border-b sticky top-0 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama, divisi, posisi..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                autoFocus
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-64">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => {
                    onChange(user.id);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-primary-50 transition-colors ${
                    value === user.id ? "bg-primary-50" : ""
                  }`}
                >
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs items-center gap-1 flex">
                        <Building2 className="w-2 h-2"/>
                        {user.division}
                      </span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs items-center gap-1 flex">
                        <Briefcase className="w-2 h-2"/>
                        {user.position}
                      </span>
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                No users found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;