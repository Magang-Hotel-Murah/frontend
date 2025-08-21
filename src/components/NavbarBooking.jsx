import React from 'react';
import { Hotel, Plane, Train, CreditCard } from 'lucide-react';

const NavbarBooking = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'hotel', label: 'Hotel', icon: Hotel },
    { key: 'flight', label: 'Tiket Pesawat', icon: Plane },
    { key: 'train', label: 'Tiket Kereta', icon: Train },
    { key: 'ppob', label: 'PPOB', icon: CreditCard }
  ];

  return (
    <div className=" bg-white shadow-sm border-b border-gray-100">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                relative flex items-center gap-2 px-6 py-4 font-medium text-sm
                transition-all duration-300 ease-in-out whitespace-nowrap
                hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50
                ${
                  activeTab === tab.key
                    ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50'
                    : 'text-gray-600 hover:text-blue-500'
                }
              `}
            >
              <Icon 
                size={18} 
                className={`
                  transition-all duration-300
                  ${activeTab === tab.key ? 'text-blue-600 scale-110' : 'text-gray-500'}
                `} 
              />
              <span className="font-semibold">{tab.label}</span>
              
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-full transition-all duration-300" />
              )}
              
              <div className={`
                absolute inset-0 rounded-lg transition-all duration-300
                ${activeTab === tab.key ? 'bg-blue-500/5' : 'hover:bg-blue-500/5'}
              `} />
            </button>
          );
        })}
      </div>
      
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
};

export default NavbarBooking;