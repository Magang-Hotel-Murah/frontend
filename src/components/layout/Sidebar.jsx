import React from "react";
import {
  Home,
  Users,
  Settings,
  BarChart3,
  Book,
  UserPlus,
  Presentation,
  Cast,
  GitPullRequest,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@hooks/auth";

const Sidebar = ({
  isOpen,
  onClose,
  activeMenu,
  setActiveMenu,
  isCollapsed,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user = null, isLoading } = useUser();

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setActiveMenu("home");
        break;
      case "/organization":
        setActiveMenu("organizations");
        break;
      case "/requests":
        setActiveMenu("requests");
        break;
      case "/room":
        setActiveMenu("room");
        break;
      case "/booking":
        setActiveMenu("bookings");
        break;
      case "/invite-user":
        setActiveMenu("invite-user");
        break;
      case "/user":
        setActiveMenu("users");
        break;
      case "/setting":
        setActiveMenu("settings");
        break;
    }
  }, [location.pathname, setActiveMenu]);

  const handleMenuClick = (itemId) => {
    setActiveMenu(itemId);

    switch (itemId) {
      case "home":
        navigate("/home");
        break;
      case "organizations":
        navigate("/organization");
        break;
      case "requests":
        navigate("/requests");
        break;
      case "room":
        navigate("/room");
        break;
      case "bookings":
        navigate("/booking");
        break;
      case "invite-user":
        navigate("/invite-user");
        break;
      case "users":
        navigate("/user");
        break;
      case "settings":
        navigate("/setting");
        break;
      case "reports":
        navigate("/finance/report");
        break;
      case "support":
        navigate("/support");
        break;
      default:
        console.log("Unknown menu item:", itemId);
    }
  };

  const menuItemsByRole = {
    super_admin: [
      { id: "home", name: "Home", icon: Home },
      { id: "bookings", name: "Booking", icon: Book },
      { id: "users", name: "Pengguna", icon: Users },
      { id: "settings", name: "Pengaturan", icon: Settings },
    ],
    company_admin: [
      { id: "home", name: "Home", icon: Home },
      { id: "organizations", name: "Organisasi", icon: Cast },
      { id: "room", name: "Ruangan", icon: Presentation },
      { id: "bookings", name: "Reservasi", icon: Book },
      { id: "invite-user", name: "Undang Karyawan", icon: UserPlus },
      { id: "users", name: "Pengguna", icon: Users },
      { id: "settings", name: "Pengaturan", icon: Settings}
    ],
    finance_officer: [
      { id: "home", name: "Home", icon: Home },
      { id: "requests", name: "Permintaan", icon: GitPullRequest},
      { id: "room", name: "Ruangan", icon: Presentation },
      { id: "bookings", name: "Reservasi", icon: Book },
      { id: "settings", name: "Pengaturan", icon: Settings},
    ],
    support_staff: [
      { id: "home", name: "Home", icon: Home },
      { id: "support", name: "Tiket Bantuan", icon: Book },
      { id: "settings", name: "Pengaturan", icon: Settings },
    ],
  };

  if (isLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  if (user.role === "employee") {
    return null;
  }

  const menuItems = menuItemsByRole[user.role] || [];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-transparant lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen pt-20 transition-all duration-300 bg-white border-r border-gray-100 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${isCollapsed ? "lg:w-16" : "lg:w-64"}`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white mt-2">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`flex items-center w-full p-2 text-gray-600 rounded-lg hover:bg-primary-50 group ${
                      activeMenu === item.id
                        ? "bg-primary-100 text-gray-100"
                        : ""
                    }`}
                    title={isCollapsed ? item.name : ""}
                  >
                    <Icon
                      className={`w-5 h-5 transition duration-75 ${
                        activeMenu === item.id
                          ? "text-gray-600"
                          : "text-gray-600 group-hover:text-gray-700"
                      } ${isCollapsed ? "mx-auto" : ""}`}
                    />
                    {!isCollapsed && <span className="ml-3">{item.name}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
