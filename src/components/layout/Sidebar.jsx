import React from "react";
import { Home, Users, Settings, BarChart3, BookIcon, Book } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({
  isOpen,
  onClose,
  activeMenu,
  setActiveMenu,
  isCollapsed,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setActiveMenu("home");
        break;
      case "/booking":
        setActiveMenu("bookings");
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
      case "bookings":
        navigate("/booking");
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
      { id: "home", name: "Dashboard", icon: Home },
      { id: "bookings", name: "Booking", icon: BookIcon },
      { id: "users", name: "Pengguna", icon: Users },
      { id: "settings", name: "Pengaturan", icon: Settings },
    ],
    company_admin: [
      { id: "home", name: "Dashboard", icon: Home },
      { id: "bookings", name: "Booking", icon: BookIcon },
      { id: "users", name: "Pengguna", icon: Users },
    ],
    employee: [
      { id: "home", name: "Dashboard", icon: Home },
      { id: "bookings", name: "Booking", icon: BookIcon },
    ],
    finance_officer: [
      { id: "home", name: "Dashboard", icon: Home },
      { id: "reports", name: "Laporan Keuangan", icon: BarChart3 },
    ],
    support_staff: [
      { id: "home", name: "Dashboard", icon: Home },
      { id: "support", name: "Tiket Bantuan", icon: Book },
    ],
  };

  const role = user?.role;

  const menuItems = menuItemsByRole[role] || [];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-white bg-opacity-50 lh:hidden"
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
