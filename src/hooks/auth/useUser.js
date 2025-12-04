import { useQuery } from "@tanstack/react-query";
import ApiService from "../../services/ApiService"; // sesuaikan path

export const useUser = () => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!token) {
        localStorage.removeItem("user");
        return null;
      }

      try {
        const response = await ApiService.getCurrentUser();
        const userData = response.data;

        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return null;
      }
    },
    enabled: !!token,
    retry: false,
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,

    placeholderData: () => {
      try {
        const user = localStorage.getItem("user");
        if (!user) return null;
        return JSON.parse(user);
      } catch {
        return null;
      }
    },
  });
};