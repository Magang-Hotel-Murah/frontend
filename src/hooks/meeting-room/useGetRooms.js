import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await ApiService.getRooms();
      return response?.data?.data || response?.data || response || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};