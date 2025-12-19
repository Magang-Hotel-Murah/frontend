import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiService from "@/services/ApiService";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password, remember = false }) => {
      const result = await ApiService.login(email, password, remember);

      return result;
    },
    onSuccess: (data, variables) => {
      const actualData = data?.data || data;

      if (!actualData.token) {
        return;
      }

      if (!actualData.user) {
        return;
      }

      localStorage.setItem("token", actualData.token);
      localStorage.setItem("user", JSON.stringify(actualData.user));

      if (actualData.expires_at) {
        const expiryTime = new Date(actualData.expires_at).getTime();
        localStorage.setItem("token_expiry", expiryTime.toString());
      } else {
        const { remember } = variables;
        const expiryDuration = remember
          ? 30 * 24 * 60 * 60 * 1000
          : 8 * 60 * 60 * 1000;

        const expiryTime = Date.now() + expiryDuration;
        localStorage.setItem("token_expiry", expiryTime.toString());
      }

      if (variables.remember) {
        localStorage.setItem("remember_me", "true");
      } else {
        localStorage.removeItem("remember_me");
      }

      queryClient.setQueryData(["user"], actualData.user);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};