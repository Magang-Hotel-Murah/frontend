import React, { useState } from 'react';
import { dateUtils } from '../../utils/dateUtils';

const YearView = ({ selectedDate, meetings }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMonthMeetings, setSelectedMonthMeetings] = useState([]);
  const [selectedMonthName, setSelectedMonthName] = useState('');

  const handleMonthClick = (monthDate, monthMeetings) => {
    setSelectedMonthMeetings(monthMeetings);
    setSelectedMonthName(dateUtils.getMonthName(monthDate));
    setShowModal(true);
  };

  return (
    <>
      {/* === GRID TAHUN === */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto h-full bg-gradient-to-br from-primary-50 via-orange-50/30 to-primary-100/30">
        {Array.from({ length: 12 }).map((_, i) => {
          const monthDate = new Date(selectedDate.getFullYear(), i, 1);
          const monthMeetings = meetings.filter(
            m =>
              m.startTime.getMonth() === i &&
              m.startTime.getFullYear() === selectedDate.getFullYear()
          );

          return (
            <div
              key={i}
              onClick={() => handleMonthClick(monthDate, monthMeetings)}
              className="group relative border border-primary-200/40 rounded-xl p-4 hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-orange-500/10 rounded-bl-full"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-base text-primary-900 group-hover:text-primary-600 transition-colors">
                    {dateUtils.getMonthName(monthDate)}
                  </h4>
                  <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm">
                    {monthMeetings.length}
                  </span>
                </div>

                <div className="space-y-1.5">
                {monthMeetings.slice(0, 4).map(meeting => (
                    <div
                    key={meeting.id}
                    className="text-xs truncate px-2.5 py-1.5 rounded-lg bg-primary-50/80 text-primary-900 hover:shadow-sm hover:bg-primary-100/80 transition-all duration-200 font-medium border-l-3"
                    style={{
                        borderLeftColor: meeting.color,
                        borderLeftWidth: '3px',
                    }}
                    >
                    {meeting.title}
                    </div>
                ))}

                {monthMeetings.length > 4 && (
                    <button
                    type="button"
                    className="text-xs text-primary-600 text-right font-semibold pt-1 underline hover:text-primary-800"
                    onClick={() => {
                        // aksi klik bisa buka modal atau expand list
                        console.log('Tampilkan semua meeting');
                    }}
                    >
                    +{monthMeetings.length - 4} lainnya
                    </button>
                )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* === MODAL DETAIL MEETING === */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6 relative animate-fadeIn"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-primary-900 border-b border-primary-200 pb-2">
              Daftar Meeting Bulan {selectedMonthName}
            </h3>

            {selectedMonthMeetings.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {selectedMonthMeetings.map(meeting => (
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
              <p className="text-sm text-primary-600">Tidak ada meeting bulan ini.</p>
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

export default YearView;