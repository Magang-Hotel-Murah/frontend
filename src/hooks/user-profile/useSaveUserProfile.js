import { useState } from 'react';
import { useCreateUserProfile } from './useCreateUserProfile';
import { useUpdateUserProfile } from './useUpdateUserProfile';

export const useSaveUserProfile = () => {
  const [isCreating, setIsCreating] = useState(false);
  
  const createProfile = useCreateUserProfile();
  const updateProfile = useUpdateUserProfile();

  const saveProfile = async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    try {
      setIsCreating(false);
      await updateProfile.mutateAsync({ id: user.id, data });
      return { success: true, message: 'Profil berhasil diperbarui!' };
    } catch (error) {
      if (error.message.includes('404')) {
        setIsCreating(true);
        await createProfile.mutateAsync(data);
        return { success: true, message: 'Profil berhasil dibuat!' };
      }
      throw error;
    }
  };

  return {
    saveProfile,
    isLoading: createProfile.isPending || updateProfile.isPending,
    isError: createProfile.isError || updateProfile.isError,
    error: createProfile.error || updateProfile.error,
    isCreating,
  };
};