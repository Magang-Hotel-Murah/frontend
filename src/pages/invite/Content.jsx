import React, { useState } from "react";
import { Mail, Plus, X, Send, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@ui";
import { useInvite } from "@hooks";

const Content = () => {
  const [emails, setEmails] = useState([""]);
  const [selectedRole, setSelectedRole] = useState("select_role");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [roleError, setRoleError] = useState("");
  
  const { invite_user, loading, error } = useInvite();

  const roles = [
    {
      value: "select_role",
      label: "Pilih Role",
      description: "Silahkan Pilih Role",
    },
    {
      value: "employee",
      label: "Employee",
      description:
        "Karyawan dengan akses membooking ruangan meeting.",
    },
    {
      value: "finance_officer",
      label: "Finance Officer",
      description:
        "Akses khusus untuk mengelola keuangan dan transaksi perusahaan.",
    },
    {
      value: "support_staff",
      label: "Support Staff",
      description:
        "Staff pendukung dengan akses terbatas untuk tugas administratif.",
    },
  ];

  const addEmailField = () => {
    setEmails([...emails, ""]);
  };

  const removeEmailField = (index) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const updateEmail = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setRoleError("");

    const validEmails = emails.filter((email) => email.trim() !== "");

    if (selectedRole === "select_role") {
      setRoleError("Silakan pilih role terlebih dahulu.");
      return;
    }

    if (validEmails.length === 0) {
      setMessage({ type: "error", text: "Masukkan minimal satu email." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = validEmails.filter(
      (email) => !emailRegex.test(email)
    );

    if (invalidEmails.length > 0) {
      setMessage({ type: "error", text: "Beberapa email tidak valid." });
      return;
    }

    try {
      const employeesData = [
        {
          role: selectedRole,
          emails: validEmails,
        },
      ];

      const response = await invite_user(employeesData);

      setMessage({
        type: "success",
        text: response.message || "Undangan berhasil dikirim!",
      });
      setEmails([""]);
      setSelectedRole("select_role");
    } catch (err) {
      setMessage({
        type: "error",
        text: error || "Terjadi kesalahan. Silakan coba lagi.",
      });
    }
  };

  const handleReset = () => {
    setEmails([""]);
    setSelectedRole("select_role");
    setMessage({ type: "", text: "" });
    setRoleError("");
  };

  const currentRole = roles.find((r) => r.value === selectedRole);

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <div className="bg-white overflow-x-auto rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-opacity-20 p-3 rounded-lg">
                <Mail className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                {/* <h1 className="text-xl font-medium text-gray-500 uppercase tracking-wider">
                  Kirim undangan ke email karyawan perusahaan anda
                </h1> */}
                <p className="text-gray-500 text-small uppercase tracking-wider">
                  Kirim undangan ke email karyawan perusahaan anda
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <p
                  className={`text-sm ${
                    message.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pilih Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  setRoleError("");
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition ${
                  roleError ? "border-red-400" : "border-gray-300"
                }`}
              >
                {roles.map((role) => (
                  <option
                    key={role.value}
                    value={role.value}
                    disabled={role.value === "select_role"}
                  >
                    {role.label}
                  </option>
                ))}
              </select>
              {roleError && (
                <p className="text-red-600 text-sm mt-1">{roleError}</p>
              )}
            </div>

            {selectedRole !== "select_role" && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                  Role: {currentRole?.label}
                </h3>
                <p className="text-xs text-blue-700">
                  {currentRole?.description}
                </p>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              {emails.map((email, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => updateEmail(index, e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    />
                  </div>

                  {emails.length > 1 && (
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => removeEmailField(index)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="primary"
              size="small"
              type="button"
              onClick={addEmailField}
              className="mb-6 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Email</span>
            </Button>

            <div className="flex items-center justify-end space-x-4">
              <Button
                variant="ghost"
                size="medium"
                type="button"
                onClick={handleReset}
                disabled={loading}
              >
                Reset
              </Button>

              <Button
                variant="primary"
                size="medium"
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Kirim Undangan</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              💡 Undangan akan dikirim ke email yang dimasukkan. Link aktivasi
              berlaku selama 24 jam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default Content;