import React from 'react';
import { Home, Users, Settings, BarChart3 } from 'lucide-react';

const Sidebar = ({ isOpen, activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 'home', name: 'Dashboard', icon: Home },
    { id: 'transactions', name: 'Transaksi', icon: BarChart3 },
    { id: 'users', name: 'Pengguna', icon: Users },
    { id: 'settings', name: 'Pengaturan', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setActiveMenu('home')}
        />
      )}
      
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveMenu(item.id)}
                    className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                      activeMenu === item.id ? 'bg-blue-100 text-blue-700' : ''
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition duration-75 ${
                      activeMenu === item.id ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-900'
                    }`} />
                    <span className="ml-3">{item.name}</span>
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