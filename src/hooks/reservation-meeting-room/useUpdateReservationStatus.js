import ApiService from "../../services/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      ApiService.updateReservationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["reservations"]);
    },
  });
};
