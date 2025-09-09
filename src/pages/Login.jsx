import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, LogIn, LineChart, Link } from "lucide-react";
import logo from "../assets/hotelmurah.png";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(""); // Changed to string for general error
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(""); // Clear previous errors

    // Validate empty fields
    if (!email.trim() && !password.trim()) {
      setErrors("Isi email & password terlebih dahulu");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setIsLoading(false);
      return;
    }

    if (!email.trim()) {
      setErrors("Email harus diisi");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setErrors("Password harus diisi");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors("Format email tidak valid");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setIsLoading(false);
      return;
    }

    try {
      const success = await onLogin(email, password);
      if (!success) {
        setErrors("Email atau password salah");
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      } else {
        setErrors("");
        console.log("Login berhasil, redirect ke /home");
        navigate("/home");
      }
    } catch (error) {
      setErrors("Terjadi kesalahan saat login");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      console.error("Login error:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4">
            <img src={logo} alt="hotelmurah" />
          </div>
          <h2 className="text-3xl font-bold" style={{ color: "var(--primary-500)" }}>
            hotelmurah.com
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in untuk masuk ke halaman admin
          </p>
        </div>

        <div className={`bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100 transition-all duration-300 ${
          isShaking ? 'animate-shake border-red-300 shadow-red-100' : ''
        }`}>
          {/* Error Message Display */}
          {errors && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 text-center font-medium">
                {errors}
              </p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // Clear errors when user starts typing
                    if (errors) setErrors("");
                  }}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors && isShaking
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    // Clear errors when user starts typing
                    if (errors) setErrors("");
                  }}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors && isShaking
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="font-medium text-primary-500 hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200 ${
                  isLoading
                    ? "bg-primary-500 cursor-not-allowed"
                    : "bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#37518C] transform hover:scale-105"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign in
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Belum Mempunyai Akun?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-medium hover:text-primary-500 text-primary-600 hover:underline"
            >
              Daftar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;