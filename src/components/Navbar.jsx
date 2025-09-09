import React from "react";
import Logo from "../assets/hotelmurah.png";
import { Menu, X, Bell, User, LogOut, ChevronLeft } from "lucide-react";

const Navbar = ({ user, onLogout, toggleCollapse, isCollapsed }) => {
  return (
    <nav className="bg-primary-500 border-b border-gray-200 fixed w-full z-50 top-0">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleCollapse}
              className="hidden lg:block p-2 text-gray-100 rounded-lg hover:bg-primary-700 mr-2"
              title={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
              >
                {isCollapsed ? (
                  <Menu className="w-5 h-5"/>
                ) : (
                  <ChevronLeft className="w-5 h-5"/>
                )}
              </button>
            <a href="#" className="flex ml-2 md:mr-24">
              <img src={Logo} alt="hotelmurah" className="h-8 w-auto mr-2" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-100">
                {isCollapsed ? "hotelmurah.com" : "hotelmurah.com"}
              </span>
            </a>
          </div>

          <div className="flex items-center space-x-4">

            <button className="p-2 text-gray-100 hover:bg-primary-700 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-800 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-100">
                  {user?.name || "PT. Hotel Murah Travelindo"}
                </p>
                <p className="text-xs text-gray-300">{user?.role || "Admin"}</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-100 hover:bg-primary-700 rounded-lg"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
