import React from "react";
import { X } from "lucide-react";

const ViewUser = ({ user, onClose }) => {
  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "user":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusColor = (deleted_at) => {
    if (deleted_at === null) {
      return "bg-green-100 text-green-800";
    } else {
      return "bg-gray-300 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">Detail User</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <p className="text-gray-900">{user.name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-gray-900">{user.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                user.role
              )}`}
            >
              {user.role}
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                user.deleted_at
              )}`}
            >
              {user.deleted_at === null ? "Active" : "Non-active"}
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Dibuat
            </label>
            <p className="text-gray-900">
              {new Date(user.created_at).toLocaleDateString("id-ID")}
            </p>
          </div>
          
          {user.deleted_at && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Dinonaktifkan
              </label>
              <p className="text-gray-900">
                {new Date(user.deleted_at).toLocaleDateString("id-ID")}
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;