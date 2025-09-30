import React, { act } from "react";

const TabNavigation = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  className = "",
  variant = "default"
}) => {
  const getTabStyles = (tabKey, isActive) => {
    const baseStyles = "px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer";
    
    switch (variant) {
      case "pills":
        return `${baseStyles} rounded-lg ${
          isActive 
            ? "bg-primary-600 text-white shadow-sm" 
            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
        }`;
      
      case "underline":
        return `${baseStyles} border-b-2 ${
          isActive 
            ? "border-primary-600 text-primary-600" 
            : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
        }`;
      
      default:
        return `${baseStyles} ${
          isActive 
            ? "bg-white text-primary-600 border-t border-l border-r border-gray-200 rounded-t-lg" 
            : "text-gray-600 hover:text-gray-800"
        }`;
    }
  };

  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <div className="flex space-x-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`${getTabStyles(tab.key, activeTab === tab.key)} flex items-center`}
              >
              {Icon && (
                <span className="mr-2">
                  <Icon size={16} />
                </span>
              )}
              {tab.label}
              {tab.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
