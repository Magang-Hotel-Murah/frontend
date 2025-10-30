import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Spinner, Input, Button } from "@ui";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useActivateAccount } from "@hooks/auth";

const ActivateAccount = () => {
  const navigate = useNavigate("");
  const {
    mutateAsync: activateAccount,
    isPending: loading,
    error,
  } = useActivateAccount();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    passwordConfirm: "",
  });
  const [token, setToken] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage("Nama harus diisi");
      setStatus("error");
      return false;
    }
    if (formData.password.length < 8) {
      setMessage("Password minimal 8 karakter");
      setStatus("error");
      return false;
    }
    if (formData.password !== formData.passwordConfirm) {
      setMessage("Password tidak cocok");
      setStatus("error");
      return false;
    }
    if (!token) {
      setMessage("Token tidak valid");
      setStatus("error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await activateAccount({
        token,
        name: formData.name,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
      });

      console.log("Activation response:", response);

      setStatus("success");
      setMessage(
        "Akun berhasil diaktifkan! Anda akan diarahkan ke halaman login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Terjadi kesalahan saat mengaktifkan akun");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Aktivasi Akun
            </h1>
            <p className="text-gray-600">
              Lengkapi data Anda untuk mengaktifkan akun
            </p>
          </div>

          {status && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                status === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {status === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm ${
                  status === "success" ? "text-green-800" : "text-red-800"
                }`}
              >
                {message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <Input
                type="text"
                name="name"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={handleChange}
                disabled={loading || status === "success"}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="Minimal 8 karakter"
                value={formData.password}
                onChange={handleChange}
                disabled={loading || status === "success"}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <Input
                type="password"
                name="passwordConfirm"
                placeholder="Ulangi password"
                value={formData.passwordConfirm}
                onChange={handleChange}
                disabled={loading || status === "success"}
                required
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="large"
              className="w-full"
              disabled={loading || status === "success"}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner size="small" />
                  Mengaktifkan...
                </span>
              ) : (
                "Aktivasi Akun"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{" "}
              <a
                href="/login"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Login di sini
              </a>
            </p>
          </div>
        </Card>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Token akan kedaluwarsa dalam 24 jam</p>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;
