import { useUserStore } from '@/services/state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Redirect, router, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../app/store/auth';
import UserService from '../services/api/UserService';

const useAuthMutation = (options: any) => {
  const mutation = useMutation(options);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { token, logout, clearUser } = useUserStore();

  // Handle authentication errors with useEffect to prevent infinite re-renders
  useEffect(() => {
    if (
      token &&
      mutation.error &&
      ((mutation.error as any)?.response?.status === 401 ||
        (mutation.error as any)?.response?.status === 403 ||
        (mutation.error as any)?.response?.data?.message ===
          'invalid credentials')
    ) {
      // Token is expired - clear session and redirect to login
      const handleLogout = async () => {
        try {
          console.log(
            'Token expired - clearing session and redirecting to login'
          );

          // Clear user data
          clearUser();

          // Logout from store
          await logout();

          // Clear query cache
          queryClient.clear();

          // Clear matches cache
          await AsyncStorage.removeItem('@matches_conversations');
          await AsyncStorage.removeItem('@matches_data');

          // Redirect to login screen
          router.replace('/(auth)/signInPhone');
        } catch (error) {
          console.error('Error during logout:', error);

          // Fallback - just redirect (cleanup may have partially failed)
          router.replace('/(auth)/signInPhone');
        }
      };

      handleLogout();
    }
  }, [mutation.error, token, clearUser, logout, queryClient, router]);

  return mutation;
};

export default useAuthMutation;
