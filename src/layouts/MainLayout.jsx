import React, { useState, useEffect, use } from "react";
import { Navbar, Sidebar, Footer } from "@layout";
import { useToggle } from "@hooks";
import { useLocation } from "react-router-dom";
import { set } from "react-hook-form";
import { object } from "yup";

const MainLayout = ({ children, user, onLogout }) => {
  const [sidebarOpen, toggleSidebar, openSidebar, closeSidebar] =
    useToggle(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const routeToMenuMap = {
    "/home": "home",
    "/booking": "bookings",
    "/room" : "room",
    "/invite-user": "invite-user",
    "/user": "users",
    "/setting": "settings",
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const foundMenu =
      Object.keys(routeToMenuMap).find((route) =>
        currentPath.startsWith(route)
      ) || "home";
    setActiveMenu(routeToMenuMap[foundMenu]);
  }, [location]);

  useEffect(() => {
    if (activeMenu) {
      localStorage.setItem("activeMenu", activeMenu);
    }
  }, [activeMenu]);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1280);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapse = () => {
    if (window.innerWidth >= 1024) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        user={user}
        onLogout={onLogout}
        toggleCollapse={toggleCollapse}
        isCollapsed={isCollapsed}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isCollapsed={isCollapsed}
      />

      <div
        className={`p-3 mt-20 transition-all duration-300 ${
          isCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        <div className="p-3 border-2 border-dashed border-gray-200 rounded-lg min-h-screen bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
