import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await ApiService.getRooms();

      if (!Array.isArray(res)) {
        console.warn("Response bukan array. Mengembalikan []");
        return [];
      }

      return res;
    },
  });
};