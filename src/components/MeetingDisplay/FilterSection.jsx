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
    <div className="grid grid-cols-6 gap-2">
      <select 
        value={filterType}
        onChange={(e) => onFilterChange('filterType', e.target.value)}
        className="px-2 py-1.5 border border-primary-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-primary-900"
      >
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>

      <select 
        value={selectedRoom}
        onChange={(e) => onFilterChange('selectedRoom', e.target.value)}
        className="px-2 py-1.5 border border-primary-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-primary-900"
      >
        <option value="">Semua Ruangan</option>
        {rooms.map(room => (
          <option key={room.id} value={room.id}>{room.name}</option>
        ))}
      </select>

      <select 
        value={selectedStatus}
        onChange={(e) => onFilterChange('selectedStatus', e.target.value)}
        className="px-2 py-1.5 border border-primary-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-primary-900"
      >
        <option value="">Semua Status</option>
        <option value="ongoing">Ongoing</option>
        <option value="upcoming">Upcoming</option>
        <option value="finished">Finished</option>
      </select>

      <button
        onClick={onReset}
        className="px-2 py-1.5 bg-primary-200 hover:bg-primary-300 rounded-md text-sm font-medium transition-colors text-primary-900"
      >
        Reset Filter
      </button>
    </div>

    {(selectedRoom || selectedStatus) && (
      <div className="mt-2 flex gap-2 flex-wrap">
        {selectedRoom && (
          <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs border border-primary-300">
            Room: {rooms.find(r => r.id === parseInt(selectedRoom))?.name}
          </span>
        )}
        {selectedStatus && (
          <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs border border-primary-300">
            Status: {selectedStatus}
          </span>
        )}
      </div>
    )}
  </>
);

export default FilterSection;