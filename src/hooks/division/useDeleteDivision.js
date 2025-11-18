import ApiService from "../../services/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDivision = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await ApiService.deleteDivision(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["division"]);
    },
  });
};