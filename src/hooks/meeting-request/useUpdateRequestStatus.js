import ApiService from "../../services/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateRequestStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }) =>
            ApiService.updateRequestStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries(["meetingRequest"]);
        },
    });
};