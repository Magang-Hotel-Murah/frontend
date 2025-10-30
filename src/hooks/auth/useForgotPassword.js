import { useMutation } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async ({ email }) => {
      const res = await ApiService.forgotPassword(email);
      if (!res?.success) throw new Error(res?.message || "Gagal mengirim email reset password");
      return res;
    },
    onError: (err) => console.error("Forgot password error:", err),
  });
};
