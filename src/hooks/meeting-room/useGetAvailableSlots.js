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

            console.log(response);

            let slots = [];
            let isFull = false;

            if (response.data?.rooms && Array.isArray(response.data.rooms)) {
                const room = response.data.rooms.find(r => r.id === room_id);

                if (room && Array.isArray(room.free_slots)) {
                    slots = room.free_slots;
                    isFull = room.free_slots.length === 0;
                }
            }
            else if (Array.isArray(response.data?.slots)) {
                slots = response.data.slots;
            }
            else if (Array.isArray(response.data)) {
                slots = response.data;
            }

            return {
                success: !isFull,
                data: slots,
                isFull,
                message: isFull
                    ? "Semua slot sudah penuh untuk tanggal ini"
                    : "Slot tersedia",
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