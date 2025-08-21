import React, { useState } from 'react';
import { Navbar, Sidebar } from '@components';

const MainLayout = ({ children, activeMenu, setActiveMenu, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        sidebarOpen={sidebarOpen} 
        user={user}
        onLogout={onLogout}
      />
      <Sidebar 
        isOpen={sidebarOpen} 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
      />
      
      <div className="p-4 lg:ml-64 mt-14">
        <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg min-h-screen bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;