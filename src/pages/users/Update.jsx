import React, { useState } from "react";
import { X, Save } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingAlert, ToastAlert, AlertStyles } from "@alert";

const Update = ({ user, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    deleted_at: user.deleted_at,
  });

  const [showLoadingAlert, setShowLoadingAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("info");
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setShowLoadingAlert(true); // tampilkan loading dulu
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSuccess(response.data);
      setShowLoadingAlert(false); // matikan loading
      showToastNotification("success", "User berhasil diperbarui!");
      onClose();
    } catch (error) {
      console.error(error);
      setShowLoadingAlert(false); // matikan loading
      showToastNotification("error", "Gagal mengupdate user");
    }
  };

  const showToastNotification = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <>
      <AlertStyles />
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
        <div className="relative bg-white rounded-lg w-full max-w-md shadow-lg">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Update User</h3>
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
              <input
                type="text"
                name="name"
                value={formData.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                readOnly
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                readOnly
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  formData.deleted_at
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {formData.deleted_at ? "Non-Aktif" : "Aktif"}
              </span>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-primary-600 text-gray-100 rounded-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>

      <SuccessAlert
        show={showSuccessAlert}
        onClose={handleSuccessAlertClose}
        title="Login Berhasil!"
        message="Selamat datang kembali! Anda akan diarahkan ke dashboard."
        buttonText="Lanjut ke Dashboard"
      />

      <ErrorAlert
        show={showErrorAlert}
        onClose={handleErrorAlertClose}
        title="Login Gagal"
        message={errorMessage}
        buttonText="Coba Lagi"
      />
      {/* Loading Alert */}
      <LoadingAlert
        show={showLoadingAlert}
        title="Menyimpan..."
        message="Mohon tunggu, perubahan sedang diproses."
      />

      <ToastAlert
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        type={toastType}
        position="top-right"
        duration={4000}
      />
    </>
  );
};

export default Update;
