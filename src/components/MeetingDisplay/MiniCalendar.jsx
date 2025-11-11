import React from 'react';
import { dateUtils } from '../../utils/dateUtils';

const MiniCalendar = ({ selectedDate, onMonthChange }) => {
  const calendarDays = dateUtils.getCalendarDays(selectedDate);
  
  return (
    <div className="mb-2 sm:mb-3">
      {/* Header - Responsive sizing */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900">
          {dateUtils.getMonthName(selectedDate)}
        </h2>
        <div className="flex gap-1 sm:gap-2">
          <button 
            onClick={() => onMonthChange(-1)}
            className="p-1 sm:p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => onMonthChange(1)}
            className="p-1 sm:p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Next month"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Day headers - Responsive text */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2">
        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
          <div key={day} className="text-center text-[10px] sm:text-xs text-slate-700 font-medium py-0.5 sm:py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid - Responsive sizing */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {calendarDays.map((day, index) => (
          <div key={index} className="aspect-square">
            {day && (
              <button
                className={`w-full h-full flex items-center justify-center text-[10px] sm:text-xs lg:text-sm rounded-full hover:bg-slate-100 transition-colors ${
                  dateUtils.isToday(day) 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-slate-800'
                }`}
                aria-label={`Select ${day.getDate()}`}
              >
                {day.getDate()}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;