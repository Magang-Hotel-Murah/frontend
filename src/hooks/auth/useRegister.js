import { useMutation } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ name, email, password, confirmPassword, company_name }) => {
      const res = await ApiService.register(name, email, password, confirmPassword, company_name);
      if (!res?.success) throw new Error(res?.message || "Registrasi gagal");
      return res;
    },
    onError: (err) => console.error("Register error:", err),
  });
};