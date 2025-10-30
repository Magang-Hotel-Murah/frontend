import ApiService from "../../services/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
        const response = await ApiService.deleteReservation(id)
        return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reservations"]);
    },
  });
};