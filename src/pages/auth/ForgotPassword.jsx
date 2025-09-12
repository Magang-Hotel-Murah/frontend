import React, { useState } from "react";
import { Lock, Mail, KeyRound, Eye, EyeOff, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setError] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/forgot-password",
        { email }
      );
      if (response.data.success) {
        setMessage(response.data.message);
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengirim OTP");
    }
    setIsLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/reset-password",
        {
          email,
          otp,
          password,
          password_confirmation: passwordConfirm,
        }
      );
      if (response.data.success) {
        setMessage("Password berhasil direset, silakan login kembali.");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal reset password");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-primary-600 mb-2">
          {step === 1 ? "Lupa Password" : "Reset Password"}
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          {step === 1
            ? "Masukkan email Anda untuk menerima kode OTP."
            : "Masukkan kode OTP dan buat password baru Anda."}
        </p>

        {message && (
          <div className="mb-4 p-3 text-sm rounded-lg bg-green-50 text-green-700 border border-green-200">
            {message}
          </div>
        )}
        {errors && (
          <div className="mb-4 p-3 text-sm rounded-lg bg-red-50 text-red-700 border border-red-200">
            {errors}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Mail className="absolute left-3 top-11 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Masukkan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 border-gray-300"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition"
            >
              {isLoading ? "Mengirim OTP..." : "Kirim OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kode OTP
              </label>
              <KeyRound className="absolute left-3 top-11 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Masukkan OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 border-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Baru
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword1 ? "text" : "password"}
                  placeholder="Masukkan password baru"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 border-gray-300"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword1(!showPassword1)}
                >
                  {showPassword1 ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Konfirmasi password baru"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 border-gray-300"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 text-sm font-medium rounded-lg text-white transition ${
                isLoading
                  ? "bg-primary-400 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Resetting...
                </div>
              ) : (
                <div className="flex items-center">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Reset Password
                </div>
              )}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-primary-600 hover:underline"
          >
            Kembali ke halaman login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
