import React from 'react';
import FilterSection from './FilterSection';

const Header = ({ 
  displayTitle, 
  filterType, 
  onNavigate, 
  selectedRoom, 
  selectedStatus, 
  rooms, 
  onFilterChange, 
  onReset 
}) => {
  return (
    <div className="border-b border-primary-200 p-4 flex-shrink-0 bg-gradient-to-r from-white to-primary-50/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-primary-900">
            {displayTitle}
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => onNavigate(-1)}
              className="p-2 hover:bg-primary-100 rounded text-primary-700 hover:text-primary-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="px-4 py-2 bg-primary-100 rounded text-sm font-medium text-primary-900 hover:bg-primary-200 transition-colors">
              {filterType === 'week' ? 'This Week' : filterType === 'month' ? 'This Month' : 'This Year'}
            </button>
            <button 
              onClick={() => onNavigate(1)}
              className="p-2 hover:bg-primary-100 rounded text-primary-700 hover:text-primary-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <FilterSection 
        filterType={filterType}
        selectedRoom={selectedRoom}
        selectedStatus={selectedStatus}
        rooms={rooms}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />
    </div>
  );
};

export default Header;