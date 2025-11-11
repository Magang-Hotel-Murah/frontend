import React from 'react';
import { dateUtils } from '../../utils/dateUtils';

const MiniCalendar = ({ selectedDate, onMonthChange }) => {
  const calendarDays = dateUtils.getCalendarDays(selectedDate);
  
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary-900">
          {dateUtils.getMonthName(selectedDate)}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => onMonthChange(-1)}
            className="p-1 hover:bg-primary-100 rounded text-primary-700 hover:text-primary-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => onMonthChange(1)}
            className="p-1 hover:bg-primary-100 rounded text-primary-700 hover:text-primary-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
          <div key={day} className="text-center text-xs text-primary-700 font-medium py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div key={index} className="aspect-square">
            {day && (
              <button
                className={`w-full h-full flex items-center justify-center text-sm rounded-full hover:bg-primary-100 transition-colors ${
                  dateUtils.isToday(day) 
                    ? 'bg-primary-600 text-white hover:bg-primary-700' 
                    : 'text-primary-800'
                }`}
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