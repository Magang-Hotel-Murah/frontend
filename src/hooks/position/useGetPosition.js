import ApiService from "../../services/ApiService";
import { useQuery } from "@tanstack/react-query";

export const useGetPosition = () => {
    return useQuery({
        queryKey: ["position"],
        queryFn: async () => {
            const response = await ApiService.getPositions();
            return response?.data || response || [];
        },
        staleTime: 5 * 60 * 1000,
    });
};