import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { LoadingSpinner, ErrorDisplay } from '../components/MeetingDisplay/LoadingError';
import Sidebar from '../components/MeetingDisplay/Sidebar';
import Header from '../components/MeetingDisplay/Header';
import WeekView from '../components/MeetingDisplay/WeekView';
import MonthView from '../components/MeetingDisplay/MonthView';
import YearView from '../components/MeetingDisplay/YearView';
import { dateUtils } from '../utils/dateUtils';
import { useDisplayMeetings, useTodayTomorrowMeetings, useSyncFilterToUrl } from '../hooks/useDisplayData';

const getSundayOfWeek = (date) => {
  const dayOfWeek = date.getDay(); 
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - dayOfWeek); 
  return sunday;
};

const getDynamicTimeSlots = (meetings) => {
  if (!meetings || meetings.length === 0) {
    return Array.from({ length: 10 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);
  }

  const hours = new Set();
  
  meetings.forEach(meeting => {
    const startDate = new Date(meeting.startTime);
    const endDate = new Date(meeting.endTime);
    
    hours.add(startDate.getHours());
    
    const endHour = endDate.getHours();
    if (endDate.getMinutes() > 0) {
      hours.add(endHour + 1);
    } else {
      hours.add(endHour);
    }
  });

  const sortedHours = Array.from(hours).sort((a, b) => a - b);
  
  if (sortedHours.length === 0) {
    return Array.from({ length: 10 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);
  }

  // Tambahkan buffer 1 jam sebelum dan sesudah
  const minHour = Math.max(0, sortedHours[0] - 1);
  const maxHour = Math.min(23, sortedHours[sortedHours.length - 1] + 1);

  const timeSlots = [];
  for (let i = minHour; i <= maxHour; i++) {
    timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
  }

  return timeSlots;
};

const Display = () => {
  const { companyCode } = useParams();
  const [searchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const initialFilterType = searchParams.get('filter') || 'week';
  const initialRoom = searchParams.get('room_id') || '';
  const initialStatus = searchParams.get('status') || '';
  const startDateParam = searchParams.get('start_date');

  const today = new Date();

  let defaultYear = today.getFullYear();
  let defaultMonth = today.getMonth();
  let defaultWeekStart = getSundayOfWeek(today);

  if (startDateParam) {
    const parsedStart = new Date(startDateParam);

    if (initialFilterType === 'month') {
      defaultYear = parsedStart.getFullYear();
      defaultMonth = parsedStart.getMonth();
    } else if (initialFilterType === 'year') {
      defaultYear = parsedStart.getFullYear();
      defaultMonth = 0;
    } else if (initialFilterType === 'week') {
      defaultWeekStart = getSundayOfWeek(parsedStart);
      defaultYear = defaultWeekStart.getFullYear();
      defaultMonth = defaultWeekStart.getMonth();
    }
  }

  const [filterType, setFilterType] = useState(initialFilterType);
  const [selectedRoom, setSelectedRoom] = useState(initialRoom);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [currentWeekStart, setCurrentWeekStart] = useState(defaultWeekStart);
  
  console.log('currentWeekStart', currentWeekStart, 'selectedYear', selectedYear, 'selectedMonth', selectedMonth);
  
  const selectedDate = useMemo(() => {
    const today = new Date();
    if (filterType === 'month') return new Date(selectedYear, selectedMonth, 1);
    if (filterType === 'year') return new Date(selectedYear, 0, 1);
    return new Date(selectedYear, selectedMonth, today.getDate());
  }, [selectedYear, selectedMonth, filterType]);

  useSyncFilterToUrl({
    filterType,
    selectedRoom,
    selectedStatus,
    currentWeekStart,
    selectedYear,
    selectedMonth
  });

  const { data: meetingsData, isLoading: meetingsLoading, error: meetingsError } = useDisplayMeetings(companyCode, {
    filterType,
    selectedRoom,
    selectedStatus,
    currentWeekStart,
    selectedYear,
    selectedMonth
  });

  const { data: todayTomorrowData, isLoading: todayTomorrowLoading } = useTodayTomorrowMeetings(companyCode);

  const meetings = useMemo(() => meetingsData?.meetings || [], [meetingsData?.meetings]);
  const companyName = meetingsData?.companyName || '';
  const rooms = meetingsData?.rooms || [];
  const todayMeetings = todayTomorrowData?.todayMeetings || [];
  const tomorrowMeetings = todayTomorrowData?.tomorrowMeetings || [];

  // Generate dynamic time slots berdasarkan meeting yang ada
  const timeSlots = useMemo(() => {
    return getDynamicTimeSlots(meetings);
  }, [meetings]);

  const loading = meetingsLoading || todayTomorrowLoading;
  const error = meetingsError?.message;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleNavigate = (direction) => {
    if (filterType === 'week') {
      const newDate = new Date(currentWeekStart);
      newDate.setDate(newDate.getDate() + direction * 7);
      setCurrentWeekStart(newDate);
    } else if (filterType === 'month') {
      const newMonth = selectedMonth + direction;
      const newYear = selectedYear + Math.floor(newMonth / 12);
      const adjustedMonth = ((newMonth % 12) + 12) % 12;
      setSelectedYear(newYear);
      setSelectedMonth(adjustedMonth);
    } else if (filterType === 'year') {
      setSelectedYear(selectedYear + direction);
    }
  };

  const handleFilterChange = (key, value) => {
    if (key === 'filterType') {
      setFilterType(value);

      const now = new Date();
      if (value === 'week') {
        setCurrentWeekStart(getSundayOfWeek(now)); 
        setSelectedYear(now.getFullYear());
        setSelectedMonth(now.getMonth());
      } 
      else if (value === 'month') {
        setSelectedYear(now.getFullYear());
        setSelectedMonth(now.getMonth());
      } 
      else if (value === 'year') {
        setSelectedYear(now.getFullYear());
        setSelectedMonth(0);
      }
    } 
    else if (key === 'selectedRoom') {
      setSelectedRoom(value);
    } 
    else if (key === 'selectedStatus') {
      setSelectedStatus(value);
    }
  };

  const goToCurrentPeriod = () => {
    const now = new Date();
    if (filterType === 'week') {
      setCurrentWeekStart(getSundayOfWeek(now)); 
    } else if (filterType === 'month') {
      setSelectedMonth(now.getMonth());
      setSelectedYear(now.getFullYear());
    } else if (filterType === 'year') {
      setSelectedYear(now.getFullYear());
    }
  };

  const goToMonth = (monthIndex, year) => {
    setSelectedMonth(monthIndex);
    setSelectedYear(year);
    setFilterType('month');
  };

  const handleResetFilters = () => {
    setSelectedRoom('');
    setSelectedStatus('');
    setFilterType('week');
    const now = new Date();
    setCurrentWeekStart(getSundayOfWeek(now));
    setSelectedYear(now.getFullYear());
    setSelectedMonth(now.getMonth());
  };

  const handleMonthChange = (delta) => {
    const newMonth = selectedMonth + delta;
    const newYear = selectedYear + Math.floor(newMonth / 12);
    const adjustedMonth = ((newMonth % 12) + 12) % 12;
    setSelectedYear(newYear);
    setSelectedMonth(adjustedMonth);
  };

  const getDisplayTitle = () => {
    if (filterType === 'week') {
      const weekStart = new Date(currentWeekStart);
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      const startDate = weekStart.getDate();
      const endDate = weekEnd.getDate();
      const startMonth = dateUtils.getMonthName(weekStart);
      const endMonth = dateUtils.getMonthName(weekEnd);
      const year = weekStart.getFullYear();
      
      if (startMonth !== endMonth) {
        return `${startDate} ${startMonth} - ${endDate} ${endMonth} ${year}`;
      }
      
      return `${startDate} - ${endDate} ${startMonth} ${year}`;
    } else if (filterType === 'month') {
      const displayDate = new Date(selectedYear, selectedMonth, 1);
      return `${dateUtils.getMonthName(displayDate)} ${selectedYear}`;
    } else {
      return `${selectedYear}`;
    }
  };

  const weekDays = dateUtils.getWeekDays(currentWeekStart, false); // false = mulai dari Minggu

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 lg:z-0
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar 
          companyName={companyName}
          selectedDate={selectedDate}
          onMonthChange={handleMonthChange}
          todayMeetings={todayMeetings}
          tomorrowMeetings={tomorrowMeetings}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          displayTitle={getDisplayTitle()}
          filterType={filterType}
          onNavigate={handleNavigate}
          onGoToCurrentPeriod={goToCurrentPeriod}
          selectedRoom={selectedRoom}
          selectedStatus={selectedStatus}
          rooms={rooms}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="flex-1 overflow-hidden">
          {filterType === 'week' && (
            <WeekView 
              weekDays={weekDays} 
              meetings={meetings} 
              timeSlots={timeSlots} 
              currentTime={currentTime}
            />
          )}
          {filterType === 'month' &&
            <MonthView 
              selectedDate={selectedDate} 
              meetings={meetings} 
              goToWeekPeriod={(date) => {
                setFilterType('week');
                setCurrentWeekStart(getSundayOfWeek(date));
              }}
            />}
          {filterType === 'year' && (
            <YearView
              selectedDate={selectedDate}
              meetings={meetings}
              onGoToMonth={goToMonth}
            />
          )}        
        </div>
      </div>
    </div>
  );
};

export default Display;