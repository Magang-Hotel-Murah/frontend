import React from 'react';

const FilterSection = ({ 
  filterType, 
  selectedRoom, 
  selectedStatus, 
  rooms, 
  onFilterChange, 
  onReset 
}) => (
  <>
    {/* Filter Controls - Responsive Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
      <select 
        value={filterType}
        onChange={(e) => onFilterChange('filterType', e.target.value)}
        className="px-2 py-1.5 border border-slate-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
      >
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>

      <select 
        value={selectedRoom}
        onChange={(e) => onFilterChange('selectedRoom', e.target.value)}
        className="px-2 py-1.5 border border-slate-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 col-span-1"
      >
        <option value="">All Rooms</option>
        {rooms.map(room => (
          <option key={room.id} value={room.id}>{room.name}</option>
        ))}
      </select>

      <select 
        value={selectedStatus}
        onChange={(e) => onFilterChange('selectedStatus', e.target.value)}
        className="px-2 py-1.5 border border-slate-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 col-span-1"
      >
        <option value="">All Status</option>
        <option value="ongoing">Ongoing</option>
        <option value="upcoming">Upcoming</option>
        <option value="finished">Finished</option>
      </select>

      <button
        onClick={onReset}
        className="px-2 py-1.5 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 rounded-md text-xs sm:text-sm font-medium transition-colors text-slate-700 col-span-2 sm:col-span-3 lg:col-span-1"
      >
        Reset Filter
      </button>
    </div>

    {/* Active Filters Tags */}
    {(selectedRoom || selectedStatus) && (
      <div className="mt-2 flex gap-2 flex-wrap">
        {selectedRoom && (
          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs border border-blue-200">
            Room: {rooms.find(r => r.id === parseInt(selectedRoom))?.name}
          </span>
        )}
        {selectedStatus && (
          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] sm:text-xs border border-blue-200">
            Status: {selectedStatus}
          </span>
        )}
      </div>
    )}
  </>
);

export default FilterSection;