import { useQuery } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await ApiService.getUserProfile();
      return response?.data?.data || response?.data || response || [];
    },
    staleTime: 5 * 60 * 1000,
  }); 
};
