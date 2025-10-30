import ApiService from "../../services/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await ApiService.deleteRoom(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]);
    },
  });
};