import ApiService from "../../services/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDivision = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => ApiService.createDivision(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["divisions"]);
    },
  });
};
