import { useQuery } from "@tanstack/react-query";
import ApiService from "../../services/ApiService";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("token_expiry");

      if (!token) {
        return null;
      }

      if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("token_expiry");
        localStorage.removeItem("remember_me");
        return null;
      }

      try {
        const response = await ApiService.getCurrentUser();
        const userData = response.data;

        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      } catch (error) {
        console.error("Error fetching user:", error);

        if (error.message?.includes("Session expired") || error.message?.includes("401")) {
          return null;
        }

        const cachedUser = localStorage.getItem("user");
        if (cachedUser) {
          try {
            return JSON.parse(cachedUser);
          } catch {
            return null;
          }
        }

        return null;
      }
    },

    enabled: !!localStorage.getItem("token"),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,

    initialData: () => {
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("token_expiry");

      if (!token) return null;

      if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
        return null;
      }

      try {
        const cachedUser = localStorage.getItem("user");
        if (!cachedUser) return null;
        return JSON.parse(cachedUser);
      } catch {
        return null;
      }
    },
  });
};