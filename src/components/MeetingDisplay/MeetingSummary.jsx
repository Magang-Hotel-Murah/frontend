import React from 'react';

const MeetingSummary = ({ meetings, title, date, isTomorrow = false }) => (
  <>
    <div 
      className="py-1 sm:py-1.5 px-2 sm:px-3 flex items-center justify-between mb-2 sm:mb-3 rounded-md border-l-4"
      style={
        isTomorrow
          ? {
              backgroundColor: 'rgb(241, 245, 249)',
              borderLeftColor: 'rgb(148, 163, 184)'
            }
          : {
              background: 'linear-gradient(to right, var(--color-primary-light, rgba(59, 130, 246, 0.1)), var(--color-primary-medium, rgba(59, 130, 246, 0.2)))',
              borderLeftColor: 'var(--color-primary, #ff751a)'
            }
      }
    >
      <h3 className="font-semibold text-slate-800 text-xs sm:text-sm">{title}</h3>
      <span className="text-[10px] sm:text-xs text-slate-600">{date}</span>
    </div>
    
    {/* Meeting list - Responsive sizing */}
    <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
      {meetings.length > 0 ? (
        meetings.map(meeting => (
          <div key={meeting.id} className="flex gap-2 sm:gap-3">
            <div className="flex-1">
              <div className="font-medium text-xs sm:text-sm text-slate-800 line-clamp-2">
                {meeting.title}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1">
                📍 {meeting.room}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-600">
                👤 {meeting.organizer}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-600">
                🕐 {meeting.time}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-xs sm:text-sm text-slate-400 text-center py-3 sm:py-4">
          Tidak ada meeting
        </p>
      )}
    </div>
  </>
);

export default MeetingSummary;