import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiService from "@/services/ApiService";

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      try {
        return await ApiService.logout();
      } catch (error) {
        // Tetap lanjutkan logout meskipun API call gagal
        console.error("Logout API failed:", error);
      }
    },
    onSettled: () => {
      // onSettled dipanggil baik success maupun error
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("token_expiry");
      
      // Clear semua cache React Query
      queryClient.clear();
      
      // Redirect ke login
      window.location.href = "/login";
    },
  });
};