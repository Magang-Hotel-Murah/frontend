import ApiService from "../../services/ApiService";
import { useState } from "react";

export const useGetAvailableSlots = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatDate = (date) => {
        if (!date) return null;
        return new Date(date).toISOString().split("T")[0];
    };

    const fetchAvailableSlots = async ({ room_id, date, participants_count }) => {
        setLoading(true);
        setError(null);

        try {

            const response = await ApiService.getAvailableSlots({
                room_id,
                date: formatDate(date),
                participants_count,
            });

            let slots = [];

            if (response.data?.rooms && Array.isArray(response.data.rooms)) {
                const room = response.data.rooms.find(r => r.id === room_id);

                if (room && Array.isArray(room.free_slots)) {
                    slots = room.free_slots;
                } else {
                    console.warn(`No free_slots found for room ${room_id}`);
                }
            }
            else if (Array.isArray(response.data?.slots)) {
                slots = response.data.slots;
            }
            else if (Array.isArray(response.data)) {
                slots = response.data;
            }

            return {
                success: true,
                data: slots,
                message: response.data?.message || "Slot berhasil diambil",
            };
        } catch (err) {
            console.error("Error fetching available slots:", err);
            setError(err.message);
            return {
                success: false,
                data: [],
                message: err.message,
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        fetchAvailableSlots,
        loading,
        error,
        setError,
    };
};