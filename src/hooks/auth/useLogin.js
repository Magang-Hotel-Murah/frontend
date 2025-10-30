import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await ApiService.login(email, password);
      if (!response?.success) throw new Error(response?.message || "Login gagal");

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      queryClient.setQueryData(["user"], response.user);
      return response.user;
    },
    onError: (err) => console.error("Login error:", err),
  });
};