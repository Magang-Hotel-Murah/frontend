import React from 'react';

const MeetingSummary = ({ meetings, title, bgColor, date }) => (
  <>
    <div className={`${bgColor} py-1 px-2 flex items-center justify-between mb-3`}>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <span className="text-sm text-gray-500">{date}</span>
    </div>
    
    <div className="space-y-3 max-h-60 overflow-y-auto">
      {meetings.length > 0 ? (
        meetings.map(meeting => (
          <div key={meeting.id} className="flex gap-3">
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-800">{meeting.title}</div>
              <div className="text-xs text-gray-500">📍 {meeting.room}</div>
              <div className="text-xs text-gray-500">👤 {meeting.organizer}</div>
              <div className="text-xs text-gray-500">🕐 {meeting.time}</div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400 text-center py-4">Tidak ada meeting</p>
      )}
    </div>
  </>
);

export default MeetingSummary;