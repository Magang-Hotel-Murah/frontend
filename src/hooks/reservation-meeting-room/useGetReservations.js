import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetReservations = (page = 1) => {
  return useQuery({
    queryKey: ["reservations", page],

    queryFn: async () => {
      const response = await ApiService.getReservations(page);
      console.log("RESPONSE API:", response);
      return response?.data || {};
    },
    staleTime: 5 * 60 * 1000,
  });
};
