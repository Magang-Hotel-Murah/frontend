import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetReservationById = (id) => {
  return useQuery({
    queryKey: ["reservation", id],
    queryFn: async () => {
      const response = await ApiService.getReservationsById(id);
      return response?.data || response;
    },
    enabled: !!id,
  });
};