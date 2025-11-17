import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import {
  Bell,
  User,
  LogOut,
  Settings,
  Home,
  BookIcon,
  GitPullRequest,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogout } from "@hooks/auth";

import {
  ConfirmationAlert,
  ToastAlert,
  ActionAlert,
  AlertStyles,
} from "@alert";

const NavbarEmployee = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync: logout } = useLogout();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotificationInfo, setShowNotificationInfo] = useState(false);
  const [showProfileActions, setShowProfileActions] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ type: "info", message: "" });
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState("booking");

  const menuItems = [
    { id: "bookings", name: "Booking", icon: BookIcon, path: "/booking" },
    { id: "request", name: "Permintaan", icon: GitPullRequest, path: "/request" },
    { id: "settings", name: "Pengaturan", icon: Settings, path: "/setting" },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => currentPath.startsWith(item.path));
    if (activeItem) {
      setActiveTab(activeItem.id);
    }
  }, [location.pathname]);

  const handleTabClick = (item) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

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
          window.location.href = "/login";
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
        <div className="px-3 py-3 lg:px-5">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <a href="#" className="flex items-center">
                <img src={Logo} alt="meetwise" className="h-8 w-auto mr-2" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-500">
                  MeetWise
                </span>
              </a>
            </div>

            {/* Navigation Tabs - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-primary-100 text-gray-700"
                        : "text-gray-500 hover:bg-primary-50"
                    }`}
                    title={item.name}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Section - User Actions */}
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
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-500">
                      {user?.name || "Karyawan"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user?.role || "Employee"}
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

          {/* Mobile Navigation Tabs */}
          <div className="md:hidden mt-3 flex justify-around border-t border-gray-100 pt-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-primary-100 text-gray-700"
                      : "text-gray-500"
                  }`}
                  title={item.name}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Alerts */}
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

      <ActionAlert
        show={showProfileActions}
        onClose={() => setShowProfileActions(false)}
        title="Menu Profil"
        message={`Selamat datang, ${
          user?.name || "Karyawan"
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
            label: "2 Permintaan Booking Baru",
            icon: <div className="h-2 w-2 bg-green-500 rounded-full" />,
            onClick: () => {
              setShowNotificationInfo(false);
              navigate("/request");
              showToastNotification(
                "info",
                "Mengarahkan ke halaman permintaan..."
              );
            },
            className:
              "bg-green-500 text-white hover:bg-green-600 text-left justify-start",
          },
          {
            label: "1 Booking Disetujui",
            icon: <div className="h-2 w-2 bg-blue-500 rounded-full" />,
            onClick: () => {
              setShowNotificationInfo(false);
              navigate("/booking");
              showToastNotification("info", "Mengarahkan ke halaman booking...");
            },
            className:
              "bg-blue-500 text-white hover:bg-blue-600 text-left justify-start",
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

export default NavbarEmployee;