import { useMutation } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useInviteUser = () => {
  return useMutation({
    mutationFn: async (employees) => {
      const res = await ApiService.InviteUser(employees);
      return res?.data || res;
    },
    onError: (error) => {
      console.error("Gagal mengundang user:", error);
    },
    onSuccess: () => {
      console.log("User berhasil diundang");
    },
  });
};
