import ApiService from '../../services/ApiService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => ApiService.storeUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
    },
  });
};