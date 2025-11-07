import { useQuery } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useListUsers = (filters) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => ApiService.listUser(filters),
  });
};