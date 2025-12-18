import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiService from "@/services/ApiService";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password, remember = false }) => {
      const result = await ApiService.login(email, password, remember);
      console.log("🎯 Hook received data:", result);
      return result;
    },
    onSuccess: (data, variables) => {
      const { remember } = variables;

      const actualData = data?.data || data;

      console.log("📦 Actual data to save:", actualData);

      if (!actualData.token) {
        console.error("❌ TOKEN TIDAK ADA!", actualData);
        return;
      }

      if (!actualData.user) {
        console.error("❌ USER TIDAK ADA!", actualData);
        return;
      }

      console.log("💾 Saving to localStorage...");
      localStorage.setItem("token", actualData.token);
      localStorage.setItem("user", JSON.stringify(actualData.user));

      const expiryDuration = remember
        ? 30 * 24 * 60 * 60 * 1000
        : 8 * 60 * 60 * 1000;

      const expiryTime = Date.now() + expiryDuration;
      localStorage.setItem("token_expiry", expiryTime.toString());

      if (remember) {
        localStorage.setItem("remember_me", "true");
      } else {
        localStorage.removeItem("remember_me");
      }

      console.log("✅ localStorage after save:", {
        token: localStorage.getItem("token"),
        user: localStorage.getItem("user"),
        token_expiry: localStorage.getItem("token_expiry")
      });

      queryClient.setQueryData(["user"], actualData.user);
    },
    onError: (error) => {
      console.error("❌ Login failed:", error);
    },
  });
};