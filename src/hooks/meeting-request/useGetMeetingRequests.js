import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetMeetingRequests = (params = {}) => {
    return useQuery({
        queryKey: ["meetingRequests", params],
        queryFn: async () => {
            const response = await ApiService.getMeetingRequest(params);
            console.log("Raw API Response:", response);
            console.log("Response Data:", response?.data);
            
            // Backend mengembalikan struktur: { data: [...], message, period, etc }
            // Jadi kita ambil seluruh response.data, bukan response.data.data
            return response;
        },
        staleTime: 5 * 60 * 1000,
    });
};