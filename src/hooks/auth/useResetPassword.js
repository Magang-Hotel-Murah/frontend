import { useMutation } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ email, otp, password, passwordConfirm }) => {
      const res = await ApiService.resetPassword(email, otp, password, passwordConfirm);
      if (!res?.success) throw new Error(res?.message || "Gagal reset password");
      return res;
    },
    onError: (err) => console.error("Reset password error:", err),
  });
};
