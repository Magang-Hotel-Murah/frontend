import React, { useState } from 'react';
import { dateUtils } from '../../utils/dateUtils';

const YearView = ({ selectedDate, meetings, onGoToMonth }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMonthMeetings, setSelectedMonthMeetings] = useState([]);
  const [selectedMonthName, setSelectedMonthName] = useState('');
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);

  const handleMonthClick = (monthDate, monthMeetings, monthIndex) => {
    setSelectedMonthMeetings(monthMeetings);
    setSelectedMonthName(dateUtils.getMonthName(monthDate));
    setSelectedMonthIndex(monthIndex);
    setShowModal(true);
  };

  return (
    <>
      {/* Grid Tahun */}
      <div className="p-2 sm:p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 overflow-y-auto h-full bg-gradient-to-br from-slate-50 to-blue-50/20">
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
              onClick={() => handleMonthClick(monthDate, monthMeetings, i)}
              className="group relative border border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              {/* Card month content */}
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-bl-full"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    {dateUtils.getMonthName(monthDate)}
                  </h4>
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
                    {monthMeetings.length}
                  </span>
                </div>
                <div className="space-y-1 sm:space-y-1.5">
                  {monthMeetings.slice(0, window.innerWidth < 640 ? 2 : 4).map(meeting => (
                    <div
                      key={meeting.id}
                      className="text-[10px] sm:text-xs truncate px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-slate-50 text-slate-900 hover:shadow-sm hover:bg-slate-100 transition-all duration-200 font-medium border-l-2 sm:border-l-3"
                      style={{ borderLeftColor: meeting.color, borderLeftWidth: '3px' }}
                    >
                      {meeting.title}
                    </div>
                  ))}
                  {monthMeetings.length > (window.innerWidth < 640 ? 2 : 4) && (
                    <button
                      type="button"
                      className="text-[10px] sm:text-xs text-blue-600 text-right font-semibold pt-1 underline hover:text-blue-800 w-full"
                      onClick={() => console.log('Tampilkan semua meeting')}
                    >
                      +{monthMeetings.length - (window.innerWidth < 640 ? 2 : 4)} lainnya
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg p-3 sm:p-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-slate-900 border-b border-slate-200 pb-2">
              Daftar Meeting Bulan {selectedMonthName}
            </h3>

            {selectedMonthMeetings.length > 0 ? (
              <div className="space-y-2 sm:space-y-3 pr-2">
                {selectedMonthMeetings.map(meeting => (
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
              <p className="text-xs sm:text-sm text-slate-600">Tidak ada meeting bulan ini.</p>
            )}

            {/* Tombol pergi ke bulan */}
            {onGoToMonth && selectedMonthIndex !== null && (
              <button
                className="mt-4 sm:mt-5 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                onClick={() => {
                  onGoToMonth(selectedMonthIndex, selectedDate.getFullYear());
                  setShowModal(false);
                }}
              >
                Lihat Meeting Bulan {selectedMonthName}
              </button>
            )}

            <button
              className="mt-2 sm:mt-3 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
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
