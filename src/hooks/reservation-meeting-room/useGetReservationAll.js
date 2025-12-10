import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetReservationAll = (params) => {
  return useQuery({
    queryKey: ["reservations", params],

    queryFn: async () => {
      const response = await ApiService.getReservationsAll(params);
      return response?.data?.data || response?.data || {};
    },
    staleTime: 5 * 60 * 1000,
  });
};
