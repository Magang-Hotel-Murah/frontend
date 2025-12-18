import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, LogIn } from "lucide-react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@hooks/auth";

import {
  SuccessAlert,
  ErrorAlert,
  LoadingAlert,
  ToastAlert,
  AlertStyles,
} from "@alert";

const Login = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("info");
  const [toastMessage, setToastMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() && !password.trim())
      return showToastNotification("error", "Email dan password harus diisi");
    if (!email.trim())
      return showToastNotification("error", "Email harus diisi");
    if (!password.trim())
      return showToastNotification("error", "Password harus diisi");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return showToastNotification("error", "Format email tidak valid");

    setShowLoadingAlert(true);

    login(
      { email, password, remember: rememberMe },
      {
        onSuccess: (response) => {
          setShowLoadingAlert(false);
          setShowSuccessAlert(true);
          setUserRole(response?.user?.role || response?.data?.user?.role);
          
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }
          
          showToastNotification(
            "success",
            "Login berhasil! Mengarahkan ke dashboard..."
          );

          setTimeout(() => {
            const role = response?.user?.role || response?.data?.user?.role;
            if (role === "employee") {
              navigate("/booking");
            } else {
              navigate("/home");
            }
          }, 1500);
        },
        onError: (error) => {
          console.error("Login error:", error);
          setShowLoadingAlert(false);

          const msg =
            error.message ||
            "Email atau password salah. Silakan periksa kembali.";
          setErrorMessage(msg);
          setShowErrorAlert(true);
        },
      }
    );
  };

  const showToastNotification = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
  };

  const handleErrorAlertClose = () => {
    setShowErrorAlert(false);
    setErrorMessage("");
  };

  const handleSuccessAlertClose = () => {
    setShowSuccessAlert(false);
    if (userRole === "employee") {
      navigate("/booking");
    } else {
      navigate("/home");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      <AlertStyles />

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4">
              <img src={logo} alt="hotelmurah" />
            </div>
            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--primary-500)" }}
            >
              MeetWise
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in untuk masuk ke halaman admin
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
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
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors border-gray-300 hover:border-gray-400"
                    placeholder="Masukkan alamat email"
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
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors border-gray-300 hover:border-gray-400"
                    placeholder="Masukkan password"
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
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-medium text-primary-500 hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isPending || !email || !password}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200 ${
                    isPending || !email || !password
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-primary-700 transform hover:scale-105"
                  }`}
                >
                  {isPending ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Masuk...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LogIn className="h-4 w-4 mr-2" />
                      Masuk
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Belum mempunyai akun?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-medium hover:text-primary-500 text-primary-600 hover:underline"
              >
                Daftar di sini
              </button>
            </p>
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

      <LoadingAlert
        show={showLoadingAlert}
        title="Memverifikasi..."
        message="Mohon tunggu, kami sedang memverifikasi akun Anda."
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

export default Login;