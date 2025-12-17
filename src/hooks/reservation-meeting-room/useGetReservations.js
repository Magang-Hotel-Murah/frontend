import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetReservations = (
  page = 1,
  user,
  filterStatus = "",
  filterRoom = ""
) => {
  return useQuery({
    queryKey: [
      "reservations",
      page,
      user?.role,
      filterStatus,
      filterRoom,
    ],

    queryFn: async () => {
      const response = await ApiService.getReservations({
        page,
        userOnly: user?.role === "employee",
        status: filterStatus || undefined,
        roomId: filterRoom || undefined,
      });

      return response?.data || {};
    },

    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};
