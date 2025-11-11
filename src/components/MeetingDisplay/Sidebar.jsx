import React from 'react';
import MiniCalendar from './MiniCalendar';
import MeetingSummary from './MeetingSummary';
import { dateUtils } from '../../utils/dateUtils';

const Sidebar = ({ 
  companyName = '', 
  selectedDate, 
  onMonthChange, 
  todayMeetings = [], 
  tomorrowMeetings = []
}) => {
  return (
    <div className="w-56 md:w-64 lg:w-72 flex-shrink-0 border-r border-primary-200 p-3 md:p-4 overflow-hidden bg-gradient-to-b from-white to-primary-50/30">
      <div className="flex items-center gap-3 group cursor-pointer mb-4">
        <img alt="meetwise" height="50" width="50" src="/src/assets/logo.png" />
        <h1 className="text-2xl font-bold text-primary-900">{companyName}</h1>
      </div>

      {/* Mini Calendar */}
      <MiniCalendar 
        selectedDate={selectedDate} 
        onMonthChange={onMonthChange} 
      />

      {/* Today's meetings summary */}
      <div className="border-t border-primary-200 pt-2">
        <MeetingSummary 
          meetings={todayMeetings}
          title="HARI INI"
          bgColor="bg-primary-200"
          date={dateUtils.formatDate(new Date()).split(',')[0]}
        />

        {tomorrowMeetings && tomorrowMeetings.length > 0 && (
          <div className="border-t border-primary-200 pt-2 mt-2">
            <MeetingSummary 
              meetings={tomorrowMeetings}
              title="BESOK"
              bgColor="bg-primary-100"
              date={dateUtils.formatDate(new Date(new Date().setDate(new Date().getDate() + 1))).split(',')[0]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;