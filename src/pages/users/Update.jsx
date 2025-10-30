import React, { useState } from "react";
import { X, Save } from "lucide-react";
import { LoadingAlert, SuccessAlert, ErrorAlert, AlertStyles } from "@alert";
import { Button, Input, Card } from "@ui";
import { useUpdateUser } from "@hooks/user/useUpdateUser";
import { BaseModal } from "../../components/common";

const Update = ({ user, onClose, onSuccess }) => {
  const update_user = useUpdateUser();
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
      const response = await update_user.mutateAsync({ id: user.id, data: formData });

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

      <BaseModal
        isOpen={!!user}
        onClose={onClose}
        title="Ubah Data Pengguna"
        footer={
          <>
            <Button variant="ghost" size="small" onClick={onClose}>
              Batal
            </Button>
            <Button size="small" variant="primary" onClick={handleSubmit}>
              <Save className="w-4 h-4" /> Simpan
            </Button>
          </>
        }
      >
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Nama</p>
            <Input type="text" name="name" value={formData.name} readOnly />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <Input type="email" name="email" value={formData.email} readOnly />
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
      </BaseModal>

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
