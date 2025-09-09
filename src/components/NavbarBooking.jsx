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
                hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50
                ${
                  activeTab === tab.key
                    ? 'text-primary-600 bg-gradient-to-r bg-primary-50'
                    : 'text-gray-600 hover:text-primary-500'
                }
              `}
            >
              <Icon 
                size={18} 
                className={`
                  transition-all duration-300
                  ${activeTab === tab.key ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-800'}
                `} 
              />
              <span className="font-semibold">{tab.label}</span>
              
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r bg-primary-500 rounded-t-full transition-all duration-300" />
              )}
              
              <div className={`
                absolute inset-0 rounded-lg transition-all duration-300
                ${activeTab === tab.key ? 'bg-primary-500/5' : 'hover:bg-primary-500/5'}
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