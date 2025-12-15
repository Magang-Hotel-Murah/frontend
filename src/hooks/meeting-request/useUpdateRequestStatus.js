import ApiService from "../../services/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateRequestStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status, rejection_reason }) =>
            ApiService.updateRequestStatus(id, status, rejection_reason),

        onSuccess: () => {
            queryClient.invalidateQueries(["meetingRequest"]);
        },
    });
};