import React, { useState } from 'react';
import { dateUtils } from '../../utils/dateUtils';

const MonthView = ({ selectedDate, meetings }) => {
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
      {/* === GRID BULAN === */}
      <div className="overflow-y-auto h-full bg-gradient-to-br from-primary-50 via-orange-50/30 to-primary-100/30 p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 overflow-hidden border border-primary-200/40">
          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-3">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day, idx) => (
              <div
                key={day}
                className={`font-bold uppercase tracking-wide py-2 rounded-lg ${
                  idx === 0 || idx === 6
                    ? 'text-red-600 bg-red-50/80'
                    : 'text-primary-700 bg-primary-50/80'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {calendarDays.map((day, idx) => {
              const dayMeetings = day ? getMeetingsForDay(day) : [];

              return (
                <div
                  key={idx}
                  onClick={() => day && handleDayClick(day)}
                  className={`h-28 border rounded-xl p-2 relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                    dateUtils.isToday(day)
                      ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-orange-100 shadow-sm'
                      : day
                      ? 'border-primary-200/40 bg-white/80 hover:border-primary-400'
                      : 'border-transparent bg-primary-50/30 cursor-default'
                  }`}
                >
                  {day && (
                    <>
                      <div
                        className={`text-sm font-bold text-right ${
                          dateUtils.isToday(day)
                            ? 'text-primary-600'
                            : 'text-primary-800'
                        }`}
                      >
                        {day.getDate()}
                      </div>
                      <div className="mt-1 space-y-1 overflow-y-auto max-h-[75px]">
                        {dayMeetings.map((meeting) => (
                          <div
                            key={meeting.id}
                            className="text-[10px] text-left px-2 py-1 rounded-lg font-semibold truncate shadow-sm hover:shadow-md transition-shadow border-l-2"
                            style={{
                              backgroundColor: meeting.color + '20',
                              borderLeftColor: meeting.color,
                              color: '#802b00',
                            }}
                          >
                            {meeting.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* === MODAL DETAIL HARI === */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-primary-900 border-b border-primary-200 pb-2">
              {selectedDay
                ? `Meeting pada ${dateUtils.formatDate(selectedDay)}`
                : 'Meeting Hari Ini'}
            </h3>

            {selectedDayMeetings.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {selectedDayMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="border-l-4 pl-3 py-2 rounded-md bg-primary-50 hover:bg-primary-100/50 transition-all"
                    style={{ borderColor: meeting.color }}
                  >
                    <div className="font-semibold text-primary-900 text-sm">
                      {meeting.title}
                    </div>
                    <div className="text-xs text-primary-700">
                      📅 {dateUtils.formatDate(meeting.startTime)} <br />
                      🕒 {dateUtils.formatTime(meeting.startTime)} - {dateUtils.formatTime(meeting.endTime)}
                    </div>
                    <div>
                      <div className="text-xs text-primary-700">📍 {meeting.room}</div>
                      <div className="text-xs text-primary-700">👤 {meeting.organizer}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-primary-600">
                Tidak ada meeting pada tanggal ini.
              </p>
            )}

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

export default MonthView;