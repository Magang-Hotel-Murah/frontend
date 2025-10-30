import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await ApiService.logout();
      } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        queryClient.removeQueries(["user"]);
      }
    },
  });
};
