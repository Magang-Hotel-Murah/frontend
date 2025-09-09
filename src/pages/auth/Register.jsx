import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  LogIn,
  UserIcon,
  Link,
  CheckCircle,
  X,
} from "lucide-react";
import logo from "../../assets/hotelmurah.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomAlert = ({ show, onClose, title, message, type = "success" }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100 animate-pulse-scale">
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg bg-primary-100 mb-4">
            <CheckCircle className="h-8 w-8 text-gray-600" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

          <p className="text-sm text-gray-600 mb-6">{message}</p>

          <button
            onClick={onClose}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
          >
            OK, Menuju Login
          </button>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-400 hover:bg-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Register = ({ onRegister }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
      });
      if (response.data.success) {
        setShowAlert("true");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Gagal Mendaftarkan Akun");
      } else {
        setError("Terjadi kesalahan pada server");
      }
    }

    setIsLoading(false);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16  rounded-full flex items-center justify-center mb-4">
              <img src={logo} alt="hotelmurah" />
            </div>
            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--primary-500)" }}
            >
              hotelmurah.com
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Registrasi untuk bisa login ke Admin Dashboard Transaksi
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors border-gray-300 hover:border-gray-400"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.email
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.password
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || !name || !email || !password}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200 ${
                    isLoading
                      ? "bg-primary-500 cursor-not-allowed"
                      : "bg-primary-500 hover:bg-[#2e406f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#37518C] transform hover:scale-105"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Registering...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LogIn className="h-4 w-4 mr-2" />
                      Register
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Sudah Mempunyai Akun?{" "}
              <button
                onClick={() => navigate("/")}
                className="font-medium hover:text-primary-500 text-primary-600 underline"
              >
                Masuk
              </button>
            </p>
          </div>
        </div>
      </div>

      <CustomAlert
        show={showAlert}
        onClose={handleAlertClose}
        title="Registrasi Berhasil!"
        message="Silahkan cek email anda untuk verigikasi akun sebelum melanjukan login."
      />

      <style jsx>{`
        @keyframes pulse-scale {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }

          .animate-pulse-scale {
            animation: pulse-scale 0.3s ease-out;
          }
        }
      `}</style>
    </>
  );
};

export default Register;
