import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetDivisions = () => {
  return useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      const res = await ApiService.getDivisions();

      if (!Array.isArray(res)) {
        console.warn("Response bukan array. Mengembalikan []");
        return [];
      }

      return res;
    },
  });
};