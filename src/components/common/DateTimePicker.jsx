import React, { useState, useRef, useEffect } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight, X } from "lucide-react";

const DateTimePicker = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  errors,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(
    startTime ? new Date(startTime) : null
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    endTime ? new Date(endTime) : null
  );
  const [startHour, setStartHour] = useState(
    startTime ? new Date(startTime).getHours() : 8
  );
  const [startMinute, setStartMinute] = useState(
    startTime ? new Date(startTime).getMinutes() : 0
  );
  const [endHour, setEndHour] = useState(
    endTime ? new Date(endTime).getHours() : 9
  );
  const [endMinute, setEndMinute] = useState(
    endTime ? new Date(endTime).getMinutes() : 0
  );
  const [selectingEnd, setSelectingEnd] = useState(false);

  const pickerRef = useRef(null);

  useEffect(() => {
    if (startTime) {
      const start = new Date(startTime);
      setSelectedStartDate(start);
      setStartHour(start.getHours());
      setStartMinute(start.getMinutes());
    } else {
      setSelectedStartDate(null);
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime) {
      const end = new Date(endTime);
      setSelectedEndDate(end);
      setEndHour(end.getHours());
      setEndMinute(end.getMinutes());
    } else {
      setSelectedEndDate(null);
    }
  }, [endTime]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const isDateDisabled = (date) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < now;
  };

  const isTimeDisabled = (date, hour, minute, isEnd = false) => {
    if (!date) return false;

    const now = new Date();
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hour, minute, 0, 0);

    const isToday = selectedDateTime.toDateString() === now.toDateString();
    if (isToday && selectedDateTime < now) {
      return true;
    }

    if (isEnd && selectedStartDate && selectedEndDate) {
      const startDateTime = new Date(selectedStartDate);
      startDateTime.setHours(startHour, startMinute, 0, 0);

      // Jika tanggal sama, waktu end harus lebih besar dari start
      if (selectedEndDate.toDateString() === selectedStartDate.toDateString()) {
        return selectedDateTime <= startDateTime;
      }
    }

    return false;
  };

  const handleDateClick = (day) => {
    const selected = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (isDateDisabled(selected)) return;

    if (!selectingEnd) {
      setSelectedStartDate(selected);
      setSelectingEnd(true);

      // Auto set end date sama dengan start date
      if (!selectedEndDate) {
        setSelectedEndDate(selected);
      }
    } else {
      // End date tidak boleh sebelum start date
      if (selectedStartDate && selected < selectedStartDate) {
        return;
      }
      setSelectedEndDate(selected);
    }
  };

  const handleApply = () => {
    if (selectedStartDate && selectedEndDate) {
      const start = new Date(selectedStartDate);
      start.setHours(startHour, startMinute, 0, 0);

      const end = new Date(selectedEndDate);
      end.setHours(endHour, endMinute, 0, 0);

      if (end <= start) {
        alert("Waktu selesai harus setelah waktu mulai");
        return;
      }

      const formatLocalDateTime = (date) => {
        const pad = (n) => String(n).padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
          date.getDate()
        )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
      };

      onStartTimeChange(formatLocalDateTime(start));
      onEndTimeChange(formatLocalDateTime(end));
      
      setIsOpen(false);
      setSelectingEnd(false);
    }
  };

  const handleClear = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setStartHour(8);
    setStartMinute(0);
    setEndHour(9);
    setEndMinute(0);
    setSelectingEnd(false);
    onStartTimeChange("");
    onEndTimeChange("");
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek, year, month } =
      getDaysInMonth(currentMonth);
    const days = [];
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    days.push(
      <div key="header" className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((name) => (
          <div
            key={name}
            className="text-center text-xs font-semibold text-gray-600 py-2"
          >
            {name}
          </div>
        ))}
      </div>
    );

    const calendarDays = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const disabled = isDateDisabled(date);
      const isStart =
        selectedStartDate &&
        date.toDateString() === selectedStartDate.toDateString();
      const isEnd =
        selectedEndDate &&
        date.toDateString() === selectedEndDate.toDateString();
      const isInRange =
        selectedStartDate &&
        selectedEndDate &&
        date > selectedStartDate &&
        date < selectedEndDate;

      calendarDays.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateClick(day)}
          disabled={disabled}
          className={`
            p-2 text-sm rounded-lg transition-all
            ${
              disabled
                ? "text-gray-300 cursor-not-allowed"
                : "hover:bg-primary-50"
            }
            ${
              isStart || isEnd
                ? "bg-primary-600 text-white font-semibold hover:bg-primary-700"
                : ""
            }
            ${isInRange ? "bg-primary-100 text-primary-600" : ""}
            ${
              !disabled && !isStart && !isEnd && !isInRange
                ? "text-gray-700"
                : ""
            }
          `}
        >
          {day}
        </button>
      );
    }

    days.push(
      <div key="days" className="grid grid-cols-7 gap-1">
        {calendarDays}
      </div>
    );

    return days;
  };

  const formatDisplayDate = () => {
    if (!selectedStartDate) return "Pilih tanggal dan waktu";

    const startStr = selectedStartDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const startTimeStr = `${String(startHour).padStart(2, "0")}:${String(
      startMinute
    ).padStart(2, "0")}`;

    if (!selectedEndDate) return `${startStr}, ${startTimeStr}`;

    const endStr = selectedEndDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const endTimeStr = `${String(endHour).padStart(2, "0")}:${String(
      endMinute
    ).padStart(2, "0")}`;

    // Jika tanggal sama, tampilkan sekali saja
    if (startStr === endStr) {
      return `${startStr}, ${startTimeStr} - ${endTimeStr}`;
    }

    // Jika beda tanggal, tampilkan lengkap
    return `${startStr} ${startTimeStr} - ${endStr} ${endTimeStr}`;
  };

  const handleHourChange = (value, isEnd = false) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.max(0, Math.min(23, numValue));
    
    if (isEnd) {
      setEndHour(clampedValue);
    } else {
      setStartHour(clampedValue);
    }
  };

  const handleMinuteChange = (value, isEnd = false) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.max(0, Math.min(59, numValue));
    
    if (isEnd) {
      setEndMinute(clampedValue);
    } else {
      setStartMinute(clampedValue);
    }
  };

  const generateHourOptions = (isEnd = false) => {
    const options = [];
    const date = isEnd ? selectedEndDate : selectedStartDate;

    for (let i = 0; i <= 23; i++) {
      if (!date) {
        options.push(i);
        continue;
      }

      if (!isTimeDisabled(date, i, 0, isEnd)) {
        options.push(i);
      }
    }

    return options;
  };

  const generateMinuteOptions = (hour, isEnd = false) => {
    const options = [];
    const date = isEnd ? selectedEndDate : selectedStartDate;

    for (let i = 0; i < 60; i += 15) {
      if (!date) {
        options.push(i);
        continue;
      }

      if (!isTimeDisabled(date, hour, i, isEnd)) {
        options.push(i);
      }
    }

    return options;
  };

  return (
    <div className="relative" ref={pickerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tanggal & Waktu <span className="text-red-500">*</span>
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-3 border rounded-lg text-left flex items-center justify-between
          focus:outline-none focus:ring-2 focus:ring-primary-500 transition
          ${errors ? "border-red-500" : "border-gray-300 hover:border-gray-400"}
        `}
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span
            className={selectedStartDate ? "text-gray-900" : "text-gray-400"}
          >
            {formatDisplayDate()}
          </span>
        </div>
        {selectedStartDate && (
          <span
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </span>
        )}
      </button>

      {errors && <p className="mt-1 text-sm text-red-500">{errors}</p>}

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 w-full md:w-[600px]">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1
                  )
                )
              }
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <button
              type="button"
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1
                  )
                )
              }
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4 px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg flex items-center justify-between">
            <span>ℹ️ Pilih tanggal mulai dan selesai (bisa 1 hari atau lebih)</span>
          </div>

          <div className="mb-4 flex gap-2 text-sm">
            <div
              className={`px-3 py-1 rounded-full ${
                !selectingEnd
                  ? "bg-primary-100 text-primary-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {selectedStartDate ? "✓ Tanggal Mulai" : "1. Pilih Tanggal Mulai"}
            </div>
            <div
              className={`px-3 py-1 rounded-full ${
                selectingEnd
                  ? "bg-primary-100 text-primary-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {selectedEndDate ? "✓ Tanggal Selesai" : "2. Pilih Tanggal Selesai"}
            </div>
          </div>

          <div className="mb-6">{renderCalendar()}</div>

          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Jam Mulai (00:00-23:59)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={String(startHour).padStart(2, "0")}
                    onChange={(e) => handleHourChange(e.target.value, false)}
                    onBlur={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      handleHourChange(Math.max(0, Math.min(23, val)), false);
                    }}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={!selectedStartDate}
                  />
                  <select
                    value={startHour}
                    onChange={(e) => setStartHour(Number(e.target.value))}
                    className="absolute right-0 top-0 h-full w-8 opacity-0 cursor-pointer"
                    disabled={!selectedStartDate}
                  >
                    {generateHourOptions(false).map((h) => (
                      <option key={h} value={h}>
                        {String(h).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <span className="flex items-center">:</span>
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={String(startMinute).padStart(2, "0")}
                    onChange={(e) => handleMinuteChange(e.target.value, false)}
                    onBlur={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      handleMinuteChange(Math.max(0, Math.min(59, val)), false);
                    }}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={!selectedStartDate}
                  />
                  <select
                    value={startMinute}
                    onChange={(e) => setStartMinute(Number(e.target.value))}
                    className="absolute right-0 top-0 h-full w-8 opacity-0 cursor-pointer"
                    disabled={!selectedStartDate}
                  >
                    {generateMinuteOptions(startHour, false).map((m) => (
                      <option key={m} value={m}>
                        {String(m).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Jam Selesai (00:00-23:59)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={String(endHour).padStart(2, "0")}
                    onChange={(e) => handleHourChange(e.target.value, true)}
                    onBlur={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      handleHourChange(Math.max(0, Math.min(23, val)), true);
                    }}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={!selectedEndDate}
                  />
                  <select
                    value={endHour}
                    onChange={(e) => setEndHour(Number(e.target.value))}
                    className="absolute right-0 top-0 h-full w-8 opacity-0 cursor-pointer"
                    disabled={!selectedEndDate}
                  >
                    {generateHourOptions(true).map((h) => (
                      <option key={h} value={h}>
                        {String(h).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <span className="flex items-center">:</span>
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={String(endMinute).padStart(2, "0")}
                    onChange={(e) => handleMinuteChange(e.target.value, true)}
                    onBlur={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      handleMinuteChange(Math.max(0, Math.min(59, val)), true);
                    }}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={!selectedEndDate}
                  />
                  <select
                    value={endMinute}
                    onChange={(e) => setEndMinute(Number(e.target.value))}
                    className="absolute right-0 top-0 h-full w-8 opacity-0 cursor-pointer"
                    disabled={!selectedEndDate}
                  >
                    {generateMinuteOptions(endHour, true).map((m) => (
                      <option key={m} value={m}>
                        {String(m).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setSelectingEnd(false);
              }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!selectedStartDate || !selectedEndDate}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              Terapkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;