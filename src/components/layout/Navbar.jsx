import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { Menu, Bell, User, LogOut, ChevronLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@hooks/auth";
import { useGetUserProfile } from "@hooks/user-profile";

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
  const { data: userProfile, isLoading: isLoadingProfile } =
    useGetUserProfile();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfileActions, setShowProfileActions] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ type: "info", message: "" });
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <AlertStyles />

      <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full z-50 top-0">
        <div className="px-4 py-3 lg:px-5 lg:pl-3">
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
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                  title="Menu Profil"
                >
                  <div className="relative w-9 h-9 bg-primary-100 rounded-full overflow-hidden flex items-center justify-center">
                    {isLoadingProfile ? (
                      <div className="w-full h-full animate-pulse bg-primary-50" />
                    ) : userProfile?.photo && !imageError ? (
                      <img
                        src={userProfile.photo}
                        alt={userProfile.name || user?.name || "User"}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    ) : (
                      <User className="w-4 h-4 text-gray-500" />
                    )}
                  </div>

                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-700">
                      {userProfile?.name || user?.name}
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleLogoutClick}
                  className="p-2.5 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
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
