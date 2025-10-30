import ApiService from "../../services/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }) => ApiService.updateRoom(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]);
    },
  });
};
