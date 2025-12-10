import ApiService from "../../services/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMeetingRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const response = await ApiService.deleteMeetingRequest(id);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["meetingRequest"]);
        },
    });
};