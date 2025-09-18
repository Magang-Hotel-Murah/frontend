import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const View = ({ user, onClose }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user?.id) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUserData(res.data))
        .catch((err) => {
          console.error("Gagal memuat user:", err);
        });
    }
  }, [user]);

  if (!userData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
        <div className="relative bg-white rounded-lg w-full max-w-md shadow-lg p-6">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
      <div className="relative bg-white rounded-lg w-full max-w-md shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detail User</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Nama</p>
            <p className="text-base font-medium text-gray-900">
              {userData.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-medium text-gray-900">
              {userData.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-base font-medium text-gray-900">
              {userData.role}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                userData.deleted_at
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {userData.deleted_at ? "Non-Aktif" : "Aktif"}
            </span>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
