import React, { useState } from 'react';
import { dateUtils } from '../../utils/dateUtils';

const MonthView = ({ selectedDate, meetings, goToWeekPeriod }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDayMeetings, setSelectedDayMeetings] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  const calendarDays = dateUtils.getCalendarDays(selectedDate);

  const getMeetingsForDay = (dayDate) => {
    return meetings.filter(meeting => dateUtils.isSameDay(meeting.fullDate, dayDate));
  };

  const handleDayClick = (dayDate) => {
    const dayMeetings = getMeetingsForDay(dayDate);
    setSelectedDay(dayDate);
    setSelectedDayMeetings(dayMeetings);
    setShowModal(true);
  };

  return (
    <>
      {/* Grid Bulan - Responsive */}
      <div 
        className="overflow-y-auto h-full p-2 sm:p-3"
        style={{
          background: 'linear-gradient(to bottom right, rgb(248, 250, 252), rgba(var(--color-primary-rgb, 59, 130, 246), 0.05))'
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg p-2 sm:p-4 overflow-hidden border border-slate-200">
          {/* Header Hari - Responsive text */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm mb-2 sm:mb-3">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day, idx) => (
              <div
                key={day}
                className={`font-bold uppercase tracking-wide py-1 sm:py-2 rounded-md sm:rounded-lg ${
                  idx === 0 || idx === 6
                    ? 'text-red-600 bg-red-50'
                    : 'text-slate-700 bg-slate-50'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grid Tanggal - Responsive heights */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm">
            {calendarDays.map((day, idx) => {
              const dayMeetings = day ? getMeetingsForDay(day) : [];

              return (
                <div
                  key={idx}
                  onClick={() => day && handleDayClick(day)}
                  className="h-16 sm:h-24 lg:h-28 border rounded-lg sm:rounded-xl p-1 sm:p-2 relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                  style={
                    dateUtils.isToday(day)
                      ? {
                          borderColor: 'var(--color-primary)',
                          background: 'linear-gradient(to bottom right, var(--color-primary-light), var(--color-primary-medium))',
                          boxShadow: '0 1px 2px 0 rgba(var(--color-primary-rgb, 59, 130, 246), 0.1)'
                        }
                      : day
                      ? {
                          borderColor: 'rgb(226, 232, 240)',
                          backgroundColor: 'white'
                        }
                      : {
                          borderColor: 'transparent',
                          backgroundColor: 'rgb(248, 250, 252, 0.5)',
                          cursor: 'default'
                        }
                  }
                  onMouseEnter={(e) => {
                    if (day && !dateUtils.isToday(day)) {
                      e.currentTarget.style.borderColor = 'var(--color-primary-light)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (day && !dateUtils.isToday(day)) {
                      e.currentTarget.style.borderColor = 'rgb(226, 232, 240)';
                    }
                  }}
                >
                  {day && (
                    <>
                      <div
                        className="text-xs sm:text-sm font-bold text-right"
                        style={{
                          color: dateUtils.isToday(day) ? 'var(--color-primary-dark, #2563EB)' : 'rgb(30, 41, 59)'
                        }}
                      >
                        {day.getDate()}
                      </div>
                      <div className="space-y-0.5 sm:space-y-1 overflow-y-auto max-h-[40px] sm:max-h-[60px] lg:max-h-[75px]">
                        {dayMeetings.slice(0, window.innerWidth < 640 ? 1 : 3).map((meeting) => (
                          <div
                            key={meeting.id}
                            className="text-[8px] sm:text-[10px] text-left px-1 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg font-semibold truncate shadow-sm hover:shadow-md transition-shadow border-l-2"
                            style={{
                              backgroundColor: meeting.color + '20',
                              borderLeftColor: meeting.color,
                              color: '#334155',
                            }}
                          >
                            {meeting.title}
                          </div>
                        ))}
                        {dayMeetings.length > (window.innerWidth < 640 ? 1 : 3) && (
                          <div className="text-[8px] sm:text-[10px] text-slate-500 text-center">
                            +{dayMeetings.length - (window.innerWidth < 640 ? 1 : 3)}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal Detail Hari - Responsive */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg p-3 sm:p-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-slate-900 border-b border-slate-200 pb-2">
              {selectedDay
                ? `Meeting pada ${dateUtils.formatDate(selectedDay)}`
                : 'Meeting Hari Ini'}
            </h3>

            {selectedDayMeetings.length > 0 ? (
              <div className="space-y-2 sm:space-y-3 pr-2">
                {selectedDayMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="border-l-4 pl-2 sm:pl-3 py-2 rounded-md bg-slate-50 hover:bg-slate-100/70 transition-all"
                    style={{ borderColor: meeting.color }}
                  >
                    <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {meeting.title}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-700 mt-1">
                      📅 {dateUtils.formatDate(meeting.startTime)} <br />
                      🕐 {dateUtils.formatTime(meeting.startTime)} - {dateUtils.formatTime(meeting.endTime)}
                    </div>
                    <div className="mt-1">
                      <div className="text-[10px] sm:text-xs text-slate-700">📍 {meeting.room}</div>
                      <div className="text-[10px] sm:text-xs text-slate-700">👤 {meeting.organizer}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-600">
                Tidak ada meeting pada tanggal ini.
              </p>
            )}

            <button
              className="mt-4 w-full text-white font-semibold py-2 rounded-lg transition-all hover:opacity-90 text-sm sm:text-base"
              style={{ backgroundColor: 'var(--color-primary, #10B981)' }}
              onClick={() => {
                if (selectedDay && goToWeekPeriod) {
                  goToWeekPeriod(selectedDay);
                  setShowModal(false);
                }
              }}
            >
              Lihat Meeting Minggu Ini
            </button>

            <button
              className="mt-2 sm:mt-3 w-full text-white font-semibold py-2 rounded-lg transition-all hover:opacity-90 text-sm sm:text-base"
              style={{ backgroundColor: 'var(--color-primary, #ff751a)' }}
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

export default MonthView;