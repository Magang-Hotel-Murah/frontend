import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => ApiService.updateUserProfile(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
    },
  });
};
