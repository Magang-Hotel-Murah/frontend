import { useQuery } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await ApiService.getUsers();
      const data = res?.data || res;
      if (!Array.isArray(data)) {
        console.warn("⚠️ Response users bukan array, mengembalikan []");
        return [];
      }
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
