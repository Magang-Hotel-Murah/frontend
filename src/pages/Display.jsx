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

// Responsive Display Component dengan Mobile Support

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
  let defaultWeekStart = (() => {
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    return monday;
  })();

  if (startDateParam) {
    const parsedStart = new Date(startDateParam);

    if (initialFilterType === 'month') {
      defaultYear = parsedStart.getFullYear();
      defaultMonth = parsedStart.getMonth();
    } else if (initialFilterType === 'year') {
      defaultYear = parsedStart.getFullYear();
      defaultMonth = 0;
    } else if (initialFilterType === 'week') {
      const day = parsedStart.getDay();
      const monday = new Date(parsedStart);
      monday.setDate(parsedStart.getDate() - (day === 0 ? 6 : day - 1));
      defaultWeekStart = monday;
      defaultYear = monday.getFullYear();
      defaultMonth = monday.getMonth();
    }
  }

  const [filterType, setFilterType] = useState(initialFilterType);
  const [selectedRoom, setSelectedRoom] = useState(initialRoom);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [currentWeekStart, setCurrentWeekStart] = useState(defaultWeekStart);

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

  const timeSlots = Array.from({ length: 24 }, (_, i) => `${(i + 0).toString().padStart(2, '0')}:00`);

  const { data: meetingsData, isLoading: meetingsLoading, error: meetingsError } = useDisplayMeetings(companyCode, {
    filterType,
    selectedRoom,
    selectedStatus,
    currentWeekStart,
    selectedYear,
    selectedMonth
  });

  const { data: todayTomorrowData, isLoading: todayTomorrowLoading } = useTodayTomorrowMeetings(companyCode);

  const meetings = meetingsData?.meetings || [];
  const companyName = meetingsData?.companyName || '';
  const rooms = meetingsData?.rooms || [];
  const todayMeetings = todayTomorrowData?.todayMeetings || [];
  const tomorrowMeetings = todayTomorrowData?.tomorrowMeetings || [];

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
        const dayOfWeek = now.getDay();
        const monday = new Date(now);
        monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
        setCurrentWeekStart(monday);
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
      const day = now.getDay(); 
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      setCurrentWeekStart(new Date(now.setDate(diff)));
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
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    setCurrentWeekStart(monday);
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
      const weekStart = currentWeekStart;
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return `${weekStart.getDate()} - ${weekEnd.getDate()} ${dateUtils.getMonthName(weekStart)} ${weekStart.getFullYear()}`;
    } else if (filterType === 'month') {
      const displayDate = new Date(selectedYear, selectedMonth, 1);
      return `${dateUtils.getMonthName(displayDate)} ${selectedYear}`;
    } else {
      return `${selectedYear}`;
    }
  };

  const weekDays = dateUtils.getWeekDays(currentWeekStart, false);

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
                const day = date.getDay();
                const monday = new Date(date);
                monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1));
                setCurrentWeekStart(monday);
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