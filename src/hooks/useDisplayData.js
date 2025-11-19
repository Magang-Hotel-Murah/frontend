import { useQuery } from '@tanstack/react-query';
import ApiService from "../services/ApiService";
import { dateUtils } from '../utils/dateUtils';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const getRoomColor = (roomId) => {
    const colors = [
        // Blues
        '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA',
        // Greens
        '#DCFCE7', '#BBF7D0', '#86EFAC', '#4ADE80',
        // Purples
        '#F3E8FF', '#E9D5FF', '#D8B4FE', '#C084FC',
        // Reds/Pinks
        '#FEE2E2', '#FECACA', '#FCA5A5', '#F87171',
        // Oranges
        '#FFEDD5', '#FED7AA', '#FDBA74', '#FB923C',
        // Yellows
        '#FEF3C7', '#FEF08A', '#FDE047', '#FACC15',
        // Teals
        '#CCFBF1', '#99F6E4', '#5EEAD4', '#2DD4BF',
        // Indigos
        '#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8',
    ];

    return Number.isFinite(roomId) ? colors[roomId % colors.length] : '#E5E7EB';
};

const formatMeetings = (reservations = []) => {
    return reservations
        .map((reservation) => {
            const startTime = new Date(reservation.start_time);
            const endTime = new Date(reservation.end_time);

            return {
                id: reservation.id,
                day: dateUtils.getDayName(startTime),
                date: startTime.getDate(),
                time: `${dateUtils.formatTime(startTime)} - ${dateUtils.formatTime(endTime)}`,
                title: reservation.title,
                room: reservation.room?.name || 'N/A',
                roomId: reservation.room?.id || null,
                organizer: reservation.user?.name || 'N/A',
                division: reservation.user?.profile?.division?.name || '',
                position: reservation.user?.profile?.position?.name || '',
                startTime,
                endTime,
                fullDate: startTime,
                status: reservation.status,
                color: getRoomColor(reservation.room?.id),
            };
        })
        .sort((a, b) => a.startTime - b.startTime);
};

const buildQueryString = (filterParams) => {
    const params = new URLSearchParams();
    const { filterType, selectedRoom, selectedStatus, currentWeekStart, selectedYear, selectedMonth } = filterParams;

    if (filterType) params.append("filter", filterType);

    let startStr, endStr;

    if (filterType === "week" && currentWeekStart) {
        const start = new Date(currentWeekStart);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        startStr = dateUtils.toLocalDateString(start);
        endStr = dateUtils.toLocalDateString(end);
    } else if (filterType === "month" && selectedYear !== undefined && selectedMonth !== undefined) {
        const end = new Date(selectedYear, selectedMonth + 1, 0);
        startStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-01`;
        endStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;
    } else if (filterType === "year" && selectedYear !== undefined) {
        startStr = `${selectedYear}-01-01`;
        endStr = `${selectedYear}-12-31`;
    }

    if (startStr && endStr) {
        params.append("start_date", startStr);
        params.append("end_date", endStr);
    }

    if (selectedRoom) params.append("room_id", selectedRoom);
    if (selectedStatus) params.append("status", selectedStatus);

    return `?${params.toString()}`;
};

export const useDisplayMeetings = (companyCode, filterParams) => {
    const queryString = buildQueryString(filterParams);

    const isEnabled = Boolean(companyCode && {
        week: filterParams.currentWeekStart,
        month: filterParams.selectedYear !== undefined && filterParams.selectedMonth !== undefined,
        year: filterParams.selectedYear !== undefined,
    }[filterParams.filterType]);

    return useQuery({
        queryKey: ['displayMeetings', companyCode, queryString],
        queryFn: async () => {
            const response = await ApiService.displayReservation(companyCode, queryString);

            const data = response.data;

            if (!data || !data.reservations) {
                throw new Error("Kode perusahaan tidak ditemukan atau tidak memiliki data reservasi.");
            }

            const companyName = response.data.reservations[0]?.company?.name || 'Company';
            const meetings = formatMeetings(response.data.reservations);
            const rooms = response.data.all_rooms;

            return { meetings, companyName, rooms };
        },
        enabled: isEnabled,
        staleTime: 5 * 60 * 1000,
        refetchInterval: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};

export const useTodayTomorrowMeetings = (companyCode) => {
    return useQuery({
        queryKey: ['todayTomorrowMeetings', companyCode],
        queryFn: async () => {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const params = new URLSearchParams();
            params.append("start_date", dateUtils.toLocalDateString(today));
            params.append("end_date", dateUtils.toLocalDateString(tomorrow));

            const response = await ApiService.displayReservation(companyCode, `?${params.toString()}`);

            if (!response.data?.reservations) {
                return { todayMeetings: [], tomorrowMeetings: [] };
            }

            const formattedMeetings = formatMeetings(response.data.reservations);

            const todayMeetings = formattedMeetings.filter(m => dateUtils.isToday(m.startTime));
            const tomorrowMeetings = formattedMeetings.filter(m => dateUtils.isTomorrow(m.startTime));

            return { todayMeetings, tomorrowMeetings };
        },
        enabled: !!companyCode,
        staleTime: 5 * 60 * 1000,
        refetchInterval: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};

export const useSyncFilterToUrl = (filterParams) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams();

        if (filterParams.filterType) params.set('filter', filterParams.filterType);
        if (filterParams.selectedRoom) params.set('room_id', filterParams.selectedRoom);
        if (filterParams.selectedStatus) params.set('status', filterParams.selectedStatus);

        let startStr, endStr;

        if (filterParams.filterType === 'week' && filterParams.currentWeekStart) {
            const start = new Date(filterParams.currentWeekStart);
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            startStr = dateUtils.toLocalDateString(start);
            endStr = dateUtils.toLocalDateString(end);
        } else if (filterParams.filterType === 'month' && filterParams.selectedYear !== undefined && filterParams.selectedMonth !== undefined) {
            const lastDay = new Date(filterParams.selectedYear, filterParams.selectedMonth + 1, 0).getDate();
            startStr = `${filterParams.selectedYear}-${String(filterParams.selectedMonth + 1).padStart(2, '0')}-01`;
            endStr = `${filterParams.selectedYear}-${String(filterParams.selectedMonth + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
        } else if (filterParams.filterType === 'year' && filterParams.selectedYear !== undefined) {
            startStr = `${filterParams.selectedYear}-01-01`;
            endStr = `${filterParams.selectedYear}-12-31`;
        }

        if (startStr && endStr) {
            params.set('start_date', startStr);
            params.set('end_date', endStr);
        }

        const newSearch = params.toString();
        const currentSearch = location.search.substring(1);

        if (newSearch !== currentSearch) {
            navigate(`${location.pathname}?${newSearch}`, { replace: true });
        }
    }, [
        filterParams.filterType,
        filterParams.selectedRoom,
        filterParams.selectedStatus,
        filterParams.currentWeekStart,
        filterParams.selectedYear,
        filterParams.selectedMonth,
        navigate,
        location.pathname,
        location.search
    ]);
};