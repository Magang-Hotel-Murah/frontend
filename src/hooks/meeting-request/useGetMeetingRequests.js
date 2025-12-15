import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetMeetingRequests = (params = {}) => {
    return useQuery({
        queryKey: ["meetingRequests", params],
        queryFn: async () => {
            const response = await ApiService.getMeetingRequest(params);
            return response;
        },
        staleTime: 5 * 60 * 1000,
    });
};