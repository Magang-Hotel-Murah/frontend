import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await ApiService.updateUser(id, data);
      return res;
    },
    onSuccess: (_, { id, data }) => {
      queryClient.setQueryData(["users"], (oldUsers) =>
        oldUsers
          ? oldUsers.map((u) => (u.id === id ? { ...u, ...data } : u))
          : []
      );
    },
  });
};