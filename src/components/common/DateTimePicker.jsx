import React, { useState, useRef, useEffect } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight, X, Zap } from "lucide-react";

const DateTimePicker = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  errors,
  availableSlots = [],
  slotsLoading = false,
  onDateSelected,
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

    // PILIH TANGGAL MULAI
    if (!selectingEnd) {
      setSelectedStartDate(selected);

      // ❗ JANGAN set end date di sini
      setSelectedEndDate(null);

      if (onDateSelected) {
        const pad = (n) => String(n).padStart(2, "0");
        onDateSelected(
          `${selected.getFullYear()}-${pad(selected.getMonth() + 1)}-${pad(
            selected.getDate()
          )}`
        );
      }

      return;
    }

    // PILIH TANGGAL SELESAI (HARUS lewat tombol dulu)
    if (selectingEnd && selectedStartDate) {
      if (selected < selectedStartDate) return;
      setSelectedEndDate(selected);
    }
  };


  const handleSlotClick = (slot) => {
    if (!selectedStartDate) return;

    const [startH, startM] = slot.start_time.split(':').map(Number);
    const [endH, endM] = slot.end_time.split(':').map(Number);

    setStartHour(startH);
    setStartMinute(startM);
    setEndHour(endH);
    setEndMinute(endM);

    if (!selectedEndDate || selectedEndDate < selectedStartDate) {
      setSelectedEndDate(selectedStartDate);
    }
  };

  const isSlotSelected = (slot) => {
    const [slotStartH, slotStartM] = slot.start_time.split(':').map(Number);
    const [slotEndH, slotEndM] = slot.end_time.split(':').map(Number);
    
    return startHour === slotStartH && 
           startMinute === slotStartM && 
           endHour === slotEndH && 
           endMinute === slotEndM;
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
                : "hover:bg-blue-50"
            }
            ${
              isStart
                ? "bg-blue-500 text-white font-semibold hover:bg-blue-600 ring-2 ring-blue-300"
                : ""
            }
            ${
              isEnd && !isStart
                ? "bg-orange-500 text-white font-semibold hover:bg-orange-600 ring-2 ring-orange-300"
                : ""
            }
            ${isInRange ? "bg-green-100 text-green-700" : ""}
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

    if (startStr === endStr) {
      return `${startStr}, ${startTimeStr} - ${endTimeStr}`;
    }

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

  const shouldShowSlots = selectedStartDate && availableSlots.length > 0;
  const shouldShowLoading = selectedStartDate && slotsLoading;

  const shouldShowNoSlots =
  selectedStartDate &&
  !slotsLoading &&
  Array.isArray(availableSlots) &&
  availableSlots.length === 0;

  return (
    <div className="relative" ref={pickerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tanggal & Waktu <span className="text-red-500">*</span>
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-3 border rounded-lg text-left flex items-center justify-between cursor-pointer
          focus-within:ring-2 focus-within:ring-primary-500 transition
          ${errors ? "border-red-500" : "border-gray-300 hover:border-gray-400"}
        `}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex items-center gap-2 pointer-events-none">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span
            className={selectedStartDate ? "text-gray-900" : "text-gray-400"}
          >
            {formatDisplayDate()}
          </span>
        </div>
        {selectedStartDate && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="text-gray-400 hover:text-gray-600 pointer-events-auto"
            aria-label="Clear date"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

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
              aria-label="Previous month"
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
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4 px-3 py-2 bg-gradient-to-r from-blue-50 to-orange-50 text-gray-700 text-sm rounded-lg border border-blue-200">
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded"></span>
                <span className="text-xs">Tanggal Mulai</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded"></span>
                <span className="text-xs">Tanggal Selesai</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-100 border border-green-300 rounded"></span>
                <span className="text-xs">Rentang</span>
              </span>
            </div>
          </div>

          <div className="mb-4 flex gap-2 text-sm items-center flex-wrap">
            <button
              type="button"
              onClick={() => setSelectingEnd(false)}
              className={`px-3 py-1.5 rounded-full transition-all ${
                !selectingEnd
                  ? "bg-blue-500 text-white shadow-md ring-2 ring-blue-200"
                  : selectedStartDate
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {selectedStartDate ? "✓ Tanggal Mulai" : "Tanggal Mulai"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (selectedStartDate) {
                  setSelectingEnd(true);
                }
              }}
              disabled={!selectedStartDate}
              className={`px-3 py-1.5 rounded-full transition-all ${
                selectingEnd && selectedStartDate
                  ? "bg-orange-500 text-white shadow-md ring-2 ring-orange-200"
                  : selectedEndDate
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : selectedStartDate
                  ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {selectedEndDate ? "✓ Tanggal Selesai" : "Tanggal Selesai"}
            </button>
          </div>

          <div className="mb-6">{renderCalendar()}</div>

          {/* Available Slots Section */}
          {shouldShowSlots && (
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-green-600" />
                <h4 className="text-sm font-semibold text-gray-800">
                  {availableSlots.length} Slot Tersedia
                </h4>
                <span className="text-xs text-gray-500">- Klik untuk pilih otomatis</span>
              </div>
              <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto p-1">
                {availableSlots.map((slot, idx) => {
                  const selected = isSlotSelected(slot);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSlotClick(slot)}
                      className={`
                        relative px-2 py-2 rounded-md text-xs font-medium transition-all
                        ${selected 
                          ? 'bg-green-500 text-white ring-2 ring-green-300 shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:ring-1 hover:ring-green-200'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-semibold">{slot.start_time}</span>
                        <span className="text-[10px] opacity-75">-</span>
                        <span className="font-semibold">{slot.end_time}</span>
                      </div>
                      {selected && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {shouldShowLoading && (
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 py-4">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Memuat slot tersedia...
              </div>
            </div>
          )}

          {/* Slot Penuh / Tidak Tersedia */}
          {shouldShowNoSlots && (
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex-shrink-0">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Semua slot sudah penuh
                  </p>
                  <p className="text-xs text-red-600">
                    Silakan pilih tanggal lain atau ruangan berbeda
                  </p>
                </div>
              </div>
            </div>
          )}


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