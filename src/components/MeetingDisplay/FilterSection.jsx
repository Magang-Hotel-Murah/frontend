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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
      <select 
        value={filterType}
        onChange={(e) => onFilterChange('filterType', e.target.value)}
        className="px-2 py-1.5 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 bg-white text-slate-900 transition-all"
        style={{ 
          borderColor: 'rgb(203, 213, 225)',
          '--tw-ring-color': 'var(--color-primary, #ff751a)'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-primary)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgb(203, 213, 225)';
        }}
      >
        <option value="week">Minggu</option>
        <option value="month">Bulan</option>
        <option value="year">Tahun</option>
      </select>

      <select 
        value={selectedRoom}
        onChange={(e) => onFilterChange('selectedRoom', e.target.value)}
        className="px-2 py-1.5 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 bg-white text-slate-900 col-span-1 transition-all"
        style={{ 
          borderColor: 'rgb(203, 213, 225)',
          '--tw-ring-color': 'var(--color-primary, #ff751a)'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-primary)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgb(203, 213, 225)';
        }}
      >
        <option value="">Semua Ruangan</option>
        {rooms.map(room => (
          <option key={room.id} value={room.id}>{room.name}</option>
        ))}
      </select>

      <select 
        value={selectedStatus}
        onChange={(e) => onFilterChange('selectedStatus', e.target.value)}
        className="px-2 py-1.5 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 bg-white text-slate-900 col-span-1 transition-all"
        style={{ 
          borderColor: 'rgb(203, 213, 225)',
          '--tw-ring-color': 'var(--color-primary, #ff751a)'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-primary)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgb(203, 213, 225)';
        }}
      >
        <option value="">Semua Status</option>
        <option value="ongoing">Sedang Berlangsung</option>
        <option value="upcoming">Akan Datang</option>
        <option value="finished">Selesai</option>
      </select>

      <button
        onClick={onReset}
        className="px-2 py-1.5 bg-white border-2 rounded-md text-xs sm:text-sm font-medium transition-all col-span-2 sm:col-span-3 lg:col-span-1 hover:opacity-80"
        style={{ 
          borderColor: 'rgb(203, 213, 225)',
          color: 'rgb(51, 65, 85)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgb(148, 163, 184)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgb(203, 213, 225)';
        }}
      >
        Reset Filter
      </button>
    </div>

    {(selectedRoom || selectedStatus) && (
      <div className="mt-2 flex gap-2 flex-wrap">
        {selectedRoom && (
          <span 
            className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs border"
            style={{ 
              backgroundColor: 'var(--color-primary-light, rgba(59, 130, 246, 0.1))',
              color: 'var(--color-primary-dark, #2563EB)',
              borderColor: 'var(--color-primary-medium, rgba(59, 130, 246, 0.2))'
            }}
          >
            Ruangan: {rooms.find(r => r.id === parseInt(selectedRoom))?.name}
          </span>
        )}
        {selectedStatus && (
          <span 
            className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs border"
            style={{ 
              backgroundColor: 'var(--color-primary-light, rgba(59, 130, 246, 0.1))',
              color: 'var(--color-primary-dark, #2563EB)',
              borderColor: 'var(--color-primary-medium, rgba(59, 130, 246, 0.2))'
            }}
          >
            Status: {selectedStatus === 'ongoing' ? 'Sedang Berlangsung' : selectedStatus === 'upcoming' ? 'Akan Datang' : 'Selesai'}
          </span>
        )}
      </div>
    )}
  </>
);

export default FilterSection;