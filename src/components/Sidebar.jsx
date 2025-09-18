import React from "react";
import { Home, Users, Settings, BarChart3, BookIcon, Book } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = ({
  isOpen,
  onClose,
  activeMenu,
  setActiveMenu,
  isCollapsed,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch(location.pathname){
      case "/home":
        setActiveMenu("home");
      break;
      case "/transaction":
        setActiveMenu("transactions");
      break
      case "/booking":
        setActiveMenu("bookings");
      break
      case "/user":
        setActiveMenu("users");
      break;
      case "/setting":
        setActiveMenu("settings");
      break
    }
  }, [location.pathname, setActiveMenu]);



  const handleMenuClick = (itemId) => {
    setActiveMenu(itemId);

    switch (itemId) {
      case "home":
        navigate("/home");
      break;
      case "transactions":
        navigate("/transaction");
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
      default:
        console.log("Unknown menu item:", itemId);
    }
  };

  const menuItems = [
    { id: "home", name: "Dashboard", icon: Home },
    { id: "transactions", name: "Transaksi", icon: BarChart3 },
    { id: "bookings", name:"Booking", icon: BookIcon},
    { id: "users", name: "Pengguna", icon: Users },
    { id: "settings", name: "Pengaturan", icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-primary-800 bg-opacity-50 lh:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen pt-20 transition-all duration-300 bg-primary-500 border-r border-gray-100 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${
          isCollapsed ? "lg:w-16" : "lg:w-64"
        }`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-primary-500 mt-2">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`flex items-center w-full p-2 text-gray-100 rounded-lg hover:bg-primary-800 group ${
                      activeMenu === item.id
                        ? "bg-primary-700 text-gray-100"
                        : ""
                    }`}
                    title={isCollapsed ? item.name : ""}
                  >
                    <Icon
                      className={`w-5 h-5 transition duration-75 ${
                        activeMenu === item.id
                          ? "text-primary-100"
                          : "text-gray-100 group-hover:text-gray-100"
                      } ${isCollapsed ? "mx-auto" : ""}`}
                    />
                    {!isCollapsed && (
                      <span className="ml-3">{item.name}</span>
                    )}
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
