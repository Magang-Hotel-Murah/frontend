import React, { use, useState } from "react";
import { Lock, Mail, KeyRound } from "lucide-react";
// import logo from "../assets/hotelmurah.png";
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/forgot-password",
        {
          email,
        }
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
        setMessage("Password berhadil direset, silahkan login kembali.");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal reset password");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-primary-600 mb-6">
          {step === 1 ? "Lupa Password" : "Reset Password"}
        </h2>

        {message && (
          <p className="mb-4 text-green-600 text-sm text-center">{message}</p>
        )}
        {errors && (
          <p className="mb-4 text-red-600 text-sm text-center">{errors}</p>
        )}

        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
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
              <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Masukkan OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 border-gray-300"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 border-gray-300"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Konfirmasi Password baru"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 border-gray-300"
                required
              />
            </div>
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
