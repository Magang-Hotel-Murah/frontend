import { useMemo } from 'react';
import { useGetReservationAll } from '@hooks/reservation-meeting-room';

export const useDerivedReservation = () => {
  const { data: allReservations, isLoading } = useGetReservationAll();
  
  const derivedData = useMemo(() => {
    if (!allReservations) {
      return {
        active: [],
        today: [],
        upcoming: []
      };
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    return {
      active: allReservations.filter(reservation => {
        const startTime = new Date(reservation.start_time);
        const endTime = new Date(reservation.end_time);
        return startTime <= now && endTime >= now && reservation.status === 'approved';
      }),

      today: allReservations.filter(reservation => {
        const startTime = new Date(reservation.start_time);
        return startTime >= todayStart && startTime < todayEnd;
      }),

      upcoming: allReservations.filter(reservation => {
        const startTime = new Date(reservation.start_time);
        return startTime > now && reservation.status === 'approved';
      })
    };
  }, [allReservations]);

  return {
    activeReservations: derivedData.active,
    todayReservations: derivedData.today,
    upcomingReservations: derivedData.upcoming,
    isLoading
  };
};