import React, { useState, useRef, useEffect } from 'react';
import { dateUtils } from '../../utils/dateUtils';
import { meetingLayout } from '../../utils/meetingLayoutUtils';

const WeekView = ({ weekDays, meetings, timeSlots }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const columnRefs = useRef([]);
  const [columnHeights, setColumnHeights] = useState([]);

  useEffect(() => {
    if (columnRefs.current.length > 0) {
      const heights = columnRefs.current.map(ref => ref?.clientHeight || 0);
      setColumnHeights(heights);
    }
  }, [timeSlots, weekDays]);

  const getMeetingsForDay = (dayDate) => {
    return meetings.filter(meeting => dateUtils.isSameDay(meeting.fullDate, dayDate));
  };

  const handleMeetingClick = (meeting) => {
    setSelectedMeeting(meeting);
    setShowModal(true);
  };

  const startHour = timeSlots.length > 0 ? parseInt(timeSlots[0].split(':')[0]) : 0;
  const endHour = timeSlots.length > 0 ? parseInt(timeSlots[timeSlots.length - 1].split(':')[0]) + 1 : 24;
  const totalMinutesInView = (endHour - startHour) * 60;

  return (
    <>
      <div 
        className="p-2 sm:p-3 flex h-full overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom right, rgb(248, 250, 252), rgba(var(--color-primary-rgb, 59, 130, 246), 0.05))'
        }}
      >
        <div className="w-12 sm:w-16 lg:w-20 flex-shrink-0 border-r border-slate-200 flex flex-col bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="h-12 sm:h-14 lg:h-16 border-b border-slate-200 flex-shrink-0"></div>
          <div className="flex-1 flex flex-col overflow-hidden">
            {timeSlots.map(slot => (
              <div
                key={slot}
                className="flex-1 border-b border-slate-200 pr-1 sm:pr-2 lg:pr-3 pt-2 text-right min-h-0"
              >
                <span className="text-[10px] sm:text-xs lg:text-sm font-semibold text-slate-700">
                  {slot}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex overflow-x-auto">
          {weekDays.map((day, dayIndex) => {
            const dayMeetings = getMeetingsForDay(day.fullDate);
            const processedMeetings = meetingLayout.calculateMeetingColumns(dayMeetings);

            const columnHeight = columnHeights[dayIndex] || 0;
            const pixelPerMinute = columnHeight > 0 ? columnHeight / totalMinutesInView : 0;

            return (
              <div
                key={dayIndex}
                className="flex-1 border-r border-slate-200 min-w-[80px] sm:min-w-[100px] lg:min-w-[120px] flex flex-col bg-white/95 backdrop-blur-sm"
              >
                {/* Header Hari - Menggunakan Theme Color untuk Today */}
                <div
                  className="h-12 sm:h-14 lg:h-16 border-b border-slate-200 text-center py-1 sm:py-2 flex-shrink-0 transition-all duration-300"
                  style={day.isToday ? {
                    background: 'linear-gradient(to bottom right, var(--color-primary, #ff751a), var(--color-primary-dark, #2563EB))',
                    boxShadow: '0 1px 3px 0 rgba(var(--color-primary-rgb, 59, 130, 246), 0.1)'
                  } : {}}
                >
                  <div
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                      day.isToday ? 'text-white' : 'text-slate-700'
                    }`}
                  >
                    {day.day}
                  </div>
                  <div
                    className={`text-lg sm:text-xl lg:text-2xl font-bold mt-0.5 sm:mt-1 ${
                      day.isToday ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {day.date}
                  </div>
                </div>

                <div
                  ref={(el) => (columnRefs.current[dayIndex] = el)}
                  className="relative flex-1 overflow-hidden"
                >
                  <div className="absolute inset-0 flex flex-col">
                    {timeSlots.map((slot, idx) => (
                      <div
                        key={slot}
                        className={`flex-1 border-b border-slate-200 min-h-0 ${
                          idx % 2 === 0 ? 'bg-slate-50/30' : 'bg-white'
                        }`}
                      ></div>
                    ))}
                  </div>

                  {processedMeetings.map(meeting => {
                    const startDate = new Date(meeting.startTime);
                    const endDate = new Date(meeting.endTime);
                    
                    const meetingStartHour = startDate.getHours();
                    const meetingStartMinute = startDate.getMinutes();
                    const meetingEndHour = endDate.getHours();
                    const meetingEndMinute = endDate.getMinutes();
                    
                    const startOffsetMinutes = (meetingStartHour - startHour) * 60 + meetingStartMinute;
                    const endOffsetMinutes = (meetingEndHour - startHour) * 60 + meetingEndMinute;
                    
                    const durationMinutes = endOffsetMinutes - startOffsetMinutes;
                    
                    const topPixels = startOffsetMinutes * pixelPerMinute;
                    const heightPixels = durationMinutes * pixelPerMinute;

                    const columnWidth = 100 / meeting.totalColumns;
                    const leftPosition = meeting.column * columnWidth;

                    return (
                      <div
                        key={meeting.id}
                        onClick={() => handleMeetingClick(meeting)}
                        className="absolute rounded-lg sm:rounded-xl px-1 sm:px-2 py-1 sm:py-2 text-xs overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:z-10 hover:scale-105 border-l-2 sm:border-l-3"
                        style={{
                          top: `${topPixels}px`,
                          height: `${heightPixels}px`,
                          left: `${leftPosition}%`,
                          width: `${columnWidth - 1}%`,
                          backgroundColor: meeting.color + '90',
                          borderLeftColor: meeting.color,
                          borderLeftWidth: '3px',
                          minHeight: '30px',
                        }}
                        title={`${meeting.title}\n${meeting.room}\n${meeting.organizer}`}
                      >
                        <div className="font-semibold text-slate-900 text-[10px] sm:text-xs line-clamp-2">
                          {meeting.title}
                        </div>
                        {heightPixels > 40 && (
                          <div className="text-[9px] sm:text-xs text-slate-700 truncate mt-0.5 sm:mt-1 flex items-center gap-0.5 sm:gap-1">
                            <span className="hidden sm:inline">📍</span> 
                            <span className="truncate">{meeting.room}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal - Menggunakan Theme Color untuk Button */}
      {showModal && selectedMeeting && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg p-4 sm:p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-slate-900 border-b border-slate-200 pb-2">
              Detail Meeting
            </h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div>📋 <strong>{selectedMeeting.title}</strong></div>
              <div>📅 {dateUtils.formatDate(selectedMeeting.startTime)}</div>
              <div>🕐 {selectedMeeting.time}</div>
              <div>📍 {selectedMeeting.room || 'Tidak diketahui'}</div>
              <div>👤 {selectedMeeting.organizer || 'Tidak diketahui'}</div>
            </div>
            <button
              className="mt-4 sm:mt-5 w-full text-white font-semibold py-2 rounded-lg transition-all hover:opacity-90 text-sm sm:text-base"
              style={{ 
                backgroundColor: 'var(--color-primary, #ff751a)',
              }}
              onClick={() => setShowModal(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WeekView;