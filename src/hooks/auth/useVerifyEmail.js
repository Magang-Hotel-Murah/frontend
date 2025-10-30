import { useMutation } from "@tanstack/react-query";
import apiService from "../../services/ApiService";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: ({ id, hash, expires, signature }) =>
      apiService.verifyEmail(id, hash, expires, signature),
  });
};