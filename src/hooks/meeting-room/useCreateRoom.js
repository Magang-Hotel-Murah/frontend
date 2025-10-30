import ApiService from "../../services/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useCreateRoom = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (roomData) => ApiService.createRoom(roomData),
        onSuccess: () => {
            queryClient.invalidateQueries(["rooms"]);
        },
    });
};