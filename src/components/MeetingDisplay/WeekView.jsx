import React, { useState, useRef, useEffect } from 'react';
import { dateUtils } from '../../utils/dateUtils';
import { meetingLayout } from '../../utils/meetingLayoutUtils';

const WeekView = ({ weekDays, meetings, timeSlots }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const columnRefs = useRef([]);
  const [columnHeights, setColumnHeights] = useState([]);

  // Hitung tinggi setiap kolom setelah render
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

  return (
    <>
      {/* === WEEK GRID === */}
      <div className="flex h-full bg-gradient-to-br from-primary-50 via-orange-50/30 to-primary-100/30">
        {/* Sidebar jam */}
        <div className="w-20 flex-shrink-0 border-r border-primary-200/40 flex flex-col bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="h-16 border-b border-primary-200/40 flex-shrink-0"></div>
          <div className="flex-1 flex flex-col">
            {timeSlots.map(slot => (
              <div
                key={slot}
                className="flex-1 border-b border-primary-200/40 pr-3 pt-2 text-right min-h-0"
              >
                <span className="text-sm font-semibold text-primary-700">{slot}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom hari */}
        <div className="flex-1 flex overflow-x-auto">
          {weekDays.map((day, dayIndex) => {
            const dayMeetings = getMeetingsForDay(day.fullDate);
            const processedMeetings = meetingLayout.calculateMeetingColumns(dayMeetings);

            // ambil tinggi kolom aktual
            const columnHeight = columnHeights[dayIndex] || 0;
            const totalMinutes = timeSlots.length * 60;
            const pixelPerMinute = columnHeight > 0 ? columnHeight / totalMinutes : 0;

            return (
              <div
                key={dayIndex}
                className="flex-1 border-r border-primary-200/40 min-w-32 flex flex-col bg-white/90 backdrop-blur-sm"
              >
                {/* Header hari */}
                <div
                  className={`h-16 border-b border-primary-200/40 text-center py-2 flex-shrink-0 transition-all duration-300 ${
                    day.isToday
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600 shadow-sm'
                      : 'bg-white/80'
                  }`}
                >
                  <div
                    className={`text-xs font-bold uppercase tracking-wider ${
                      day.isToday ? 'text-white' : 'text-primary-700'
                    }`}
                  >
                    {day.day}
                  </div>
                  <div
                    className={`text-2xl font-bold mt-1 ${
                      day.isToday ? 'text-white' : 'text-primary-900'
                    }`}
                  >
                    {day.date}
                  </div>
                </div>

                {/* Isi kalender */}
                <div
                  ref={(el) => (columnRefs.current[dayIndex] = el)}
                  className="relative flex-1"
                >
                  {/* Grid jam */}
                  <div className="absolute inset-0 flex flex-col">
                    {timeSlots.map((slot, idx) => (
                      <div
                        key={slot}
                        className={`flex-1 border-b border-primary-200/40 min-h-0 ${
                          idx % 2 === 0 ? 'bg-primary-50/30' : 'bg-white/50'
                        }`}
                      ></div>
                    ))}
                  </div>

                  {/* Blok meeting */}
                  {processedMeetings.map(meeting => {
                    const { top, height } = meetingLayout.calculateMeetingPosition(meeting);
                    const columnWidth = 100 / meeting.totalColumns;
                    const leftPosition = meeting.column * columnWidth;

                    return (
                      <div
                        key={meeting.id}
                        onClick={() => handleMeetingClick(meeting)}
                        className="absolute rounded-xl px-2 py-2 text-xs overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:z-10 hover:scale-105 border-l-3"
                        style={{
                          top: `${top * pixelPerMinute}px`,
                          height: `${height * pixelPerMinute}px`,
                          left: `${leftPosition}%`,
                          width: `${columnWidth - 1}%`,
                          backgroundColor: meeting.color + '90',
                          borderLeftColor: meeting.color,
                          borderLeftWidth: '3px',
                          minHeight: '40px',
                        }}
                        title={`${meeting.title}\n${meeting.room}\n${meeting.organizer}`}
                      >
                        <div className="font-semibold text-primary-900 text-sm">
                          {meeting.title}
                        </div>
                        {height * pixelPerMinute > 50 && (
                          <div className="text-xs text-primary-700 truncate mt-1 flex items-center gap-1">
                            <span>📍</span> {meeting.room}
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

      {/* === MODAL DETAIL === */}
      {showModal && selectedMeeting && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-primary-900 border-b border-primary-200 pb-2">
              Detail Meeting
            </h3>
            <div className="space-y-3 text-sm">
              <div>📝 <strong>{selectedMeeting.title}</strong></div>
              <div>📅 {dateUtils.formatDate(selectedMeeting.startTime)}</div>
              <div>🕒 {selectedMeeting.time}</div>
              <div>📍 {selectedMeeting.room || 'Tidak diketahui'}</div>
              <div>👤 {selectedMeeting.organizer || 'Tidak diketahui'}</div>
            </div>
            <button
              className="mt-5 w-full bg-primary-600 text-white font-semibold py-2 rounded-lg hover:bg-primary-700 transition"
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
