import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import {
  Menu,
  X,
  Bell,
  User,
  LogOut,
  ChevronLeft,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@hooks/auth";

import {
  ConfirmationAlert,
  InfoAlert,
  ToastAlert,
  ActionAlert,
  AlertStyles,
} from "@alert";

const Navbar = ({ user, toggleCollapse, isCollapsed }) => {
  const navigate = useNavigate();
  const { mutateAsync: logout } = useLogout();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotificationInfo, setShowNotificationInfo] = useState(false);
  const [showProfileActions, setShowProfileActions] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ type: "info", message: "" });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);

    setTimeout(async () => {
      try {
        await logout();
        setShowLogoutConfirm(false);
        setIsLoggingOut(false);
        showToastNotification("success", "Logout berhasil! Sampai jumpa lagi.");

        setTimeout(() => {
          window.location.href = "/login"; // paksa reload halaman login
        }, 700);
      } catch (error) {
        setIsLoggingOut(false);
        showToastNotification("error", "Gagal logout. Silakan coba lagi.");
      }
    }, 1500);
  };

  const handleNotificationClick = () => {
    setShowNotificationInfo(true);
  };

  const handleProfileClick = () => {
    setShowProfileActions(true);
  };

  const showToastNotification = (type, message) => {
    setToastConfig({ type, message });
    setShowToast(true);
  };

  const navigateToSettings = () => {
    setShowProfileActions(false);
    navigate("/setting");
    showToastNotification("info", "Mengarahkan ke halaman pengaturan...");
  };

  const navigateToProfile = () => {
    setShowProfileActions(false);
    showToastNotification("info", "Halaman profil akan segera tersedia");
  };

  const markAllNotificationsRead = () => {
    setShowNotificationInfo(false);
    showToastNotification(
      "success",
      "Semua notifikasi telah ditandai sebagai dibaca"
    );
  };

  return (
    <>
      <AlertStyles />

      <nav className="bg-white border-b border-primary-500 fixed w-full z-50 top-0">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={toggleCollapse}
                className="hidden lg:block p-2 text-gray-500 rounded-lg hover:bg-primary-50 mr-2 transition-colors"
                title={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
              >
                {isCollapsed ? (
                  <Menu className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>
              <a href="#" className="flex ml-2 md:mr-24">
                <img src={Logo} alt="meetwise" className="h-8 w-auto mr-2" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-500">
                  MeetWise
                </span>
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleNotificationClick}
                className="p-2 text-gray-500 hover:bg-primary-50 rounded-lg relative transition-colors"
                title="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-3 hover:bg-primary-50 rounded-lg p-2 transition-colors"
                  title="Menu Profil"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-500">
                      {user?.name || "PT. Hotel Murah Travelindo"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user?.role || "Admin"}
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleLogoutClick}
                  className="p-2 text-gray-500 hover:bg-red-500 hover:bg-opacity-80 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ConfirmationAlert
        show={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogoutConfirm}
        title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar dari akun ini? Anda harus login kembali untuk mengakses dashboard."
        confirmText="Ya, Logout"
        cancelText="Batal"
        confirmColor="red"
        isLoading={isLoggingOut}
      />

      <InfoAlert
        show={showNotificationInfo}
        onClose={() => setShowNotificationInfo(false)}
        title="Notifikasi"
        message="Anda memiliki 3 notifikasi baru tentang transaksi dan aktivitas sistem."
        buttonText="Tandai Semua Dibaca"
      />

      <ActionAlert
        show={showProfileActions}
        onClose={() => setShowProfileActions(false)}
        title="Menu Profil"
        message={`Selamat datang, ${
          user?.name || "Admin"
        }! Pilih aksi yang ingin Anda lakukan:`}
        icon={<User className="h-8 w-8 text-blue-600" />}
        iconBgColor="bg-blue-100"
        size="md"
        actions={[
          {
            label: "Lihat Profil",
            icon: <User className="h-4 w-4" />,
            onClick: navigateToProfile,
            className: "bg-blue-500 text-white hover:bg-blue-600",
          },
          {
            label: "Pengaturan",
            icon: <Settings className="h-4 w-4" />,
            onClick: navigateToSettings,
            className: "bg-gray-500 text-white hover:bg-gray-600",
          },
          {
            label: "Logout",
            icon: <LogOut className="h-4 w-4" />,
            onClick: () => {
              setShowProfileActions(false);
              setShowLogoutConfirm(true);
            },
            className: "bg-red-500 text-white hover:bg-red-600",
          },
          {
            label: "Batal",
            onClick: () => setShowProfileActions(false),
            className: "bg-gray-300 text-gray-700 hover:bg-gray-400",
          },
        ]}
      />

      <ActionAlert
        show={showNotificationInfo}
        onClose={() => setShowNotificationInfo(false)}
        title="Pusat Notifikasi"
        message="Anda memiliki beberapa notifikasi penting yang perlu ditinjau."
        icon={<Bell className="h-8 w-8 text-yellow-600" />}
        iconBgColor="bg-yellow-100"
        size="lg"
        actions={[
          {
            label: "3 Transaksi Baru",
            icon: <div className="h-2 w-2 bg-green-500 rounded-full" />,
            onClick: () => {
              setShowNotificationInfo(false);
              navigate("/transaction");
              showToastNotification(
                "info",
                "Mengarahkan ke halaman transaksi..."
              );
            },
            className:
              "bg-green-500 text-white hover:bg-green-600 text-left justify-start",
          },
          {
            label: "2 User Baru Terdaftar",
            icon: <div className="h-2 w-2 bg-blue-500 rounded-full" />,
            onClick: () => {
              setShowNotificationInfo(false);
              navigate("/user");
              showToastNotification("info", "Mengarahkan ke halaman user...");
            },
            className:
              "bg-blue-500 text-white hover:bg-blue-600 text-left justify-start",
          },
          {
            label: "1 Pesan Sistem",
            icon: <div className="h-2 w-2 bg-red-500 rounded-full" />,
            onClick: () => {
              setShowNotificationInfo(false);
              showToastNotification("info", "Update sistem telah tersedia");
            },
            className:
              "bg-red-500 text-white hover:bg-red-600 text-left justify-start",
          },
          {
            label: "Tandai Semua Dibaca",
            onClick: markAllNotificationsRead,
            className: "bg-gray-500 text-white hover:bg-gray-600",
          },
          {
            label: "Tutup",
            onClick: () => setShowNotificationInfo(false),
            className: "bg-gray-300 text-gray-700 hover:bg-gray-400",
          },
        ]}
      />

      <ToastAlert
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastConfig.message}
        type={toastConfig.type}
        position="top-right"
        duration={3000}
      />
    </>
  );
};

export default Navbar;
