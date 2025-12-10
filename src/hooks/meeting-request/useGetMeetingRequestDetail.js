import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetMeetingRequestDetail = () => {
    return useQuery({
        queryKey: ["meetingRequest", id],
        queryFn: async () => {
            const response = await ApiService.getMeetingRequestDetail(id);
            return response?.data || response;
        },
        enabled: !!id,
    });
};