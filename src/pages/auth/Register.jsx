import React, { use, useState } from "react";
import { Eye, EyeOff, Lock, Mail, LogIn, UserIcon } from "lucide-react";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useRegister } from "@hooks/auth";
import {
  SuccessAlert,
  ErrorAlert,
  LoadingAlert,
  ToastAlert,
  AlertStyles,
} from "@alert";

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const { mutateAsync: registerUser, isPending } = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [company_name, setCompanyName] = useState("");

  const [showEmailVerificationAlert, setShowEmailVerificationAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("info");
  const [toastMessage, setToastMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim())
      return showToastNotification("error", "Nama tidak boleh kosong");
    if (!email.trim())
      return showToastNotification("error", "Email tidak boleh kosong");
    if (!password.trim())
      return showToastNotification("error", "Password tidak boleh kosong");
    if (password.length < 6)
      return showToastNotification("error", "Password minimal 6 karakter");
    if (password !== confirmPassword)
      return showToastNotification("error", "Konfirmasi password tidak sama");

    setShowLoadingAlert(true);

    try {
      const res = await registerUser({
        name,
        email,
        password,
        confirmPassword,
        company_name,
      });
      setShowLoadingAlert(false);

      if (res?.success) {
        showToastNotification("success", "Registrasi berhasil!");
        setShowSuccessAlert(true);
      }
    } catch (err) {
      console.error("Register error:", err);
      setShowLoadingAlert(false);
      setErrorMessage(
        err.message || "Gagal mendaftarkan akun. Email mungkin sudah terdaftar."
      );
      setShowErrorAlert(true);
    }
  };

  const showToastNotification = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
  };

  const handleSuccessAlertClose = () => {
    setShowSuccessAlert(false);
    navigate("/login");
  };

  const handleErrorAlertClose = () => {
    setShowErrorAlert(false);
    setErrorMessage("");
  };

  return (
    <>
      <AlertStyles />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4">
              <img src={Logo} alt="meetwise" height={90} width={90} />
            </div>
            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--primary-500)" }}
            >
              MeetWise
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
                    placeholder="Masukkan nama lengkap"
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
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors border-gray-300 hover:border-gray-400"
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
                    className="block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors border-gray-300 hover:border-gray-400"
                    placeholder="Masukkan password (min. 6 karakter)"
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors border-gray-300 hover:border-gray-400"
                    placeholder="Masukkan password (min. 6 karakter)"
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

              <div>
                <label
                  htmlFor="company_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Perusahaan
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="company_name"
                    name="company_name"
                    type="text"
                    value={company_name}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors border-gray-300 hover:border-gray-400"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isPending}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200 ${
                    isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary-500 hover:bg-[#2e406f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#37518C] transform hover:scale-105"
                  }`}
                >
                  {isPending ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Mendaftar...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LogIn className="h-4 w-4 mr-2" />
                      Daftar Akun
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Sudah mempunyai akun?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-medium hover:text-primary-500 text-primary-600 underline"
              >
                Masuk di sini
              </button>
            </p>
          </div>
        </div>
      </div>

      <SuccessAlert
        show={showSuccessAlert}
        onClose={handleSuccessAlertClose}
        title="Registrasi Berhasil!"
        message="Akun Anda berhasil dibuat. Kami telah mengirim link verifikasi ke Email anda. 
        Silakan cek inbox atau folder spam Anda dan klik link tersebut 
        untuk mengaktifkan akun Anda.."
        buttonText="Mengerti"
      />

      <ErrorAlert
        show={showErrorAlert}
        onClose={handleErrorAlertClose}
        title="Registrasi Gagal"
        message={errorMessage}
        buttonText="Coba Lagi"
      />

      <LoadingAlert
        show={showLoadingAlert}
        title="Mendaftarkan Akun..."
        message="Mohon tunggu, kami sedang memproses registrasi Anda."
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

export default Register;
