import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    },
    staleTime: Infinity,
    initialData: () => {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    },
  });
};
