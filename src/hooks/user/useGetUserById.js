import { useQuery } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await ApiService.getUser(id);
      return res?.data || res;
    },
    enabled: !!id,
  });
};
