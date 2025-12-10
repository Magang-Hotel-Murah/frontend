
import { useMemo } from 'react';
import { useDisplayMeetings } from '@hooks';
import { dateUtils } from '@utils';

export const useDerivedReservation = (companyCode) => {
  // Ambil data untuk bulan ini agar mencakup semua reservasi yang relevan
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const filterParams = {
    filterType: 'month',
    selectedYear: currentYear,
    selectedMonth: currentMonth,
    selectedRoom: null,
    selectedStatus: null,
  };

  const { data, isLoading, isError, error } = useDisplayMeetings(companyCode, filterParams);

  const derivedData = useMemo(() => {
    if (!data?.meetings) {
      return {
        active: [],
        today: [],
        upcoming: [],
        tomorrow: []
      };
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    
    const tomorrowStart = new Date(todayEnd);
    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);

    // Filter hanya yang approved
    const approvedMeetings = data.meetings.filter(
      meeting => meeting.status === 'approved'
    );

    return {
      // Reservasi yang sedang berlangsung saat ini
      active: approvedMeetings.filter(meeting => {
        return meeting.startTime <= now && meeting.endTime >= now;
      }),

      // Semua reservasi hari ini (termasuk yang sudah lewat dan upcoming)
      today: data.meetings.filter(meeting => {
        return meeting.startTime >= todayStart && meeting.startTime < todayEnd;
      }),

      // Reservasi besok
      tomorrow: data.meetings.filter(meeting => {
        return meeting.startTime >= tomorrowStart && meeting.startTime < tomorrowEnd;
      }),

      // Reservasi yang akan datang (mulai dari sekarang ke depan)
      upcoming: approvedMeetings.filter(meeting => {
        return meeting.startTime > now;
      }).slice(0, 10) // Batasi 10 upcoming meeting terdekat
    };
  }, [data?.meetings]);

  return {
    activeReservations: derivedData.active,
    todayReservations: derivedData.today,
    tomorrowReservations: derivedData.tomorrow,
    upcomingReservations: derivedData.upcoming,
    allMeetings: data?.meetings || [],
    companyName: data?.companyName,
    rooms: data?.rooms || [],
    isLoading,
    isError,
    error
  };
};