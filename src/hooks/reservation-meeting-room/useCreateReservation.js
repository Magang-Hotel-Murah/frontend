import ApiService from "../../services/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => ApiService.createReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["reservations"]);
    },
  });
};