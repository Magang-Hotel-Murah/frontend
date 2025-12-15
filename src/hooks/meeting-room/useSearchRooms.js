import ApiService from "../../services/ApiService";
import { useState } from 'react';

export const useSearchRooms = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);

    const searchRooms = async (searchParams) => {
        setIsSearching(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                date: searchParams.date,
                start_time: searchParams.startTime,
                end_time: searchParams.endTime,
                participants_count: searchParams.participants_count
            });

            if (searchParams.facilities?.length > 0) {
                searchParams.facilities.forEach(facility => {
                    params.append('facilities[]', facility);
                });
            }

            const response = await ApiService.searchMeetingRooms(params.toString());
            const data = response.data;

            return {
                success: true,
                data: data.rooms || [],
                message: data.message || response.message || 'Pencarian berhasil'
            };
        } catch (err) {
            setError(err.message);
            return {
                success: false,
                data: [],
                message: err.message
            };
        } finally {
            setIsSearching(false);
        }
    };

    return {
        searchRooms,
        isSearching,
        error,
        setError
    };
};