import { useState } from "react";
import ApiService from "../services/ApiService";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    return token && userData ? JSON.parse(userData) : null;
  });

  // --- LOGIN ---
  const login = async (email, password) => {
    try {
      const response = await ApiService.login(email, password);

      if (response?.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        return { success: true, message: "Login berhasil" };
      }

      return { success: false, message: response?.message || "Login gagal" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Terjadi kesalahan saat login" };
    }
  };

  // --- REGISTER ---
  const register = async (name, email, password, confirmPassword, company_name) => {
    try {
      const response = await ApiService.register(
        name,
        email,
        password,
        confirmPassword,
        company_name
      );

      return {
        success: response?.success,
        message: response?.message || "Registrasi berhasil",
      };
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, message: "Terjadi kesalahan saat registrasi" };
    }
  };

  // --- LOGOUT ---
  const logout = async () => {
    try {
      await ApiService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  // --- FORGOT PASSWORD ---
  const forgotPassword = async (email) => {
    try {
      const response = await ApiService.forgotPassword(email);
      return {
        success: response?.success,
        message: response?.message || "Email untuk reset password telah dikirim",
      };
    } catch (error) {
      console.error("Forgot password error:", error);
      return { success: false, message: "Gagal mengirim email reset password" };
    }
  };

  // --- RESET PASSWORD ---
  const resetPassword = async (email, otp, password, passwordConfirm) => {
    try {
      const response = await ApiService.resetPassword(
        email,
        otp,
        password,
        passwordConfirm
      );

      return {
        success: response?.success,
        message: response?.message || "Password berhasil direset",
      };
    } catch (error) {
      console.error("Reset password error:", error);
      return { success: false, message: "Gagal mereset password" };
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
  };
};
