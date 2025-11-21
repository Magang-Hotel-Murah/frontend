import React from 'react';
import MiniCalendar from './MiniCalendar';
import MeetingSummary from './MeetingSummary';
import { dateUtils } from '../../utils/dateUtils';

const Sidebar = ({ 
  companyName = '', 
  selectedDate, 
  onMonthChange, 
  todayMeetings = [], 
  tomorrowMeetings = [],
  onClose
}) => {
  return (
    <div className="w-64 sm:w-72 lg:w-80 h-full flex-shrink-0 border-r border-slate-200 p-3 sm:p-4 overflow-y-auto bg-gradient-to-b from-white to-slate-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
          <img 
            alt="meetwise" 
            className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" 
            src="/src/assets/logo.png" 
          />
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 truncate">
            {companyName}
          </h1>
        </div>
        
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg transition-all hover:opacity-80"
          style={{ 
            color: 'var(--color-primary, #ff751a)'
          }}
          aria-label="Close sidebar"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <MiniCalendar 
        selectedDate={selectedDate} 
        onMonthChange={onMonthChange} 
      />

      <div className="border-t border-slate-200 pt-3 sm:pt-4 space-y-4">
        <MeetingSummary 
          meetings={todayMeetings}
          title="HARI INI"
          date={dateUtils.formatDate(new Date()).split(',')[0]}
          isTomorrow={false}
        />

        {tomorrowMeetings && tomorrowMeetings.length > 0 && (
          <div className="pt-2">
            <MeetingSummary 
              meetings={tomorrowMeetings}
              title="BESOK"
              date={dateUtils.formatDate(new Date(new Date().setDate(new Date().getDate() + 1))).split(',')[0]}
              isTomorrow={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;