import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetDivisions = () => {
  return useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      const response = await ApiService.getDivisions();
      return response?.data || response || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};