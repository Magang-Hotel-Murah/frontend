import { useMutation } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useActivateAccount = () => {
  return useMutation({
    mutationFn: async ({ token, name, password, passwordConfirm }) => {
      const res = await ApiService.ActiveAccount(
        token,
        name,
        password,
        passwordConfirm
      );
      return res?.data || res;
    },
    onError: (error) => {
      console.error("Gagal mengaktifkan akun:", error);
    },
    onSuccess: () => {
      console.log("Akun berhasil diaktifkan");
    },
  });
};
