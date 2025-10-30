import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetReservations = (params = {}) => {
  return useQuery({
    queryKey: ["reservations", params],
    queryFn: async () => {
      const response = await ApiService.getReservations(params);
      return response?.data?.data || response?.data || response || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};
