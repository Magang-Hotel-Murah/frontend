import React, { useState } from "react";
import { X, Save } from "lucide-react";
import { LoadingAlert, SuccessAlert, ErrorAlert, AlertStyles } from "@alert";
import { Button, Input, Card } from "@ui";
import { useUser } from "@hooks";

const Update = ({ user, onClose, onSuccess }) => {
  const { update_user } = useUser();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    deleted_at: user.deleted_at,
  });

  const [showLoadingAlert, setShowLoadingAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setShowLoadingAlert(true);
    try {
      const response = await update_user(user.id, formData);

      onSuccess(response);

      setShowLoadingAlert(false);
      setShowSuccessAlert(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Gagal mengupdate user");
      setShowErrorAlert(true);
    } finally {
      setShowLoadingAlert(false);
    }
  };

  return (
    <>
      <AlertStyles />

      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div
          className="absolute inset-0 backdrop-blur-xl transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative rounded-lg w-full max-w-2xl shadow-lg overflow-y-auto">
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Ubah Data Pengguna
              </h3>
              <Button onClick={onClose} size="small" variant="ghost">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nama</p>
                <Input type="text" name="name" value={formData.name} readOnly />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
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
                  <option value="company_admin">HR</option>
                  <option value="finance_officer">Finance</option>
                  <option value="employee">Karyawan</option>
                  <option value="support_staff">Staff Pendukung</option>
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
            </div>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <Button size="small" variant="ghost" onClick={onClose}>
                  Batal
                </Button>
                <Button size="small" variant="primary" onClick={handleSubmit}>
                  <Save className="w-4 h-4" /> Simpan
                </Button>
              </div>
          </Card>
        </div>
      </div>

      <LoadingAlert
        show={showLoadingAlert}
        title="Menyimpan..."
        message="Mohon tunggu, perubahan sedang diproses."
      />

      <SuccessAlert
        show={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
        title="Berhasil"
        message="User berhasil diperbarui!"
      />

      <ErrorAlert
        show={showErrorAlert}
        onClose={() => setShowErrorAlert(false)}
        title="Gagal"
        message={errorMessage}
      />
    </>
  );
};

export default Update;
