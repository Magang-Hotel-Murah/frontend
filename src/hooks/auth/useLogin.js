import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiService from "@/services/ApiService";

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ email, password }) => {
      return await ApiService.login(email, password);
    },
    onSuccess: (data) => {
      // Simpan token dan user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Opsional: Simpan waktu expiry (jika backend memberikan info expiry)
      // Misal token valid 2 hari
      const expiryTime = Date.now() + (1 * 8 * 60 * 60 * 1000);
      localStorage.setItem("token_expiry", expiryTime.toString());
      
      // Update cache React Query
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};