import React from 'react';
import FilterSection from './FilterSection';

const Header = ({ 
  displayTitle, 
  filterType, 
  onNavigate, 
  onGoToCurrentPeriod,
  selectedRoom, 
  selectedStatus, 
  rooms, 
  onFilterChange, 
  onReset,
  onMenuClick
}) => {
  return (
    <div className="border-b border-slate-200 p-3 sm:p-4 flex-shrink-0 bg-gradient-to-r from-white to-slate-50">
      {/* Top Row - Title and Navigation */}
      <div className="relative flex items-center justify-between mb-3 gap-2">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg transition-all hover:opacity-80 flex-shrink-0"
          style={{ 
            backgroundColor: 'var(--color-primary-light, rgba(59, 130, 246, 0.1))',
            color: 'var(--color-primary, #ff751a)'
          }}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Title - Centered with proper spacing */}
        <h2 className="
          absolute left-1/2 -translate-x-1/2 
          text-center text-base sm:text-lg lg:text-xl font-semibold 
          text-slate-900 truncate px-2 lg:px-4
        ">
          {displayTitle}
        </h2>


        {/* Navigation Controls */}
        <div className="flex gap-1 sm:gap-2 flex-shrink-0">
          <button 
            onClick={() => onNavigate(-1)}
            className="p-1.5 sm:p-2 rounded transition-all hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--color-primary-light, rgba(59, 130, 246, 0.1))',
              color: 'var(--color-primary, #ff751a)'
            }}
            aria-label="Previous"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={onGoToCurrentPeriod}
            className="hidden sm:block px-3 lg:px-4 py-1.5 lg:py-2 rounded text-xs lg:text-sm font-medium text-white transition-all hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: 'var(--color-primary, #ff751a)' }}
          >
            {filterType === 'week' ? 'This Week' : filterType === 'month' ? 'This Month' : 'This Year'}
          </button>

          
          <button 
            onClick={() => onNavigate(1)}
            className="p-1.5 sm:p-2 rounded transition-all hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--color-primary-light, rgba(59, 130, 246, 0.1))',
              color: 'var(--color-primary, #ff751a)'
            }}
            aria-label="Next"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
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