import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useToggleStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await ApiService.deleteUser(id);
      return res;
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(["users"], (oldUsers) =>
        oldUsers
          ? oldUsers.map((u) =>
              u.id === id
                ? {
                    ...u,
                    deleted_at: u.deleted_at ? null : new Date().toISOString(),
                  }
                : u
            )
          : []
      );
    },
  });
};