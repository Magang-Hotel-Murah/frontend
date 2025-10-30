import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetRoomById = (id) => {
  return useQuery({
    queryKey: ["room", id],
    queryFn: async () => { 
      const response = await ApiService.getRoomById(id);
      return response?.data || response;
    },
    enabled: !!id,
  });
};
