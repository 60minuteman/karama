import { useUserStore } from '@/services/state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Redirect, router, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { useAuth } from '../app/store/auth';
import UserService from '../services/api/UserService';

const useAuthQuery = (options: any) => {
  const query = useQuery(options);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { token, logout, clearUser } = useUserStore();
  const hasHandledLogout = useRef(false);

  useEffect(() => {
    if (
      token &&
      !hasHandledLogout.current &&
      ((query?.error as any)?.response?.status === 401 ||
        (query?.error as any)?.response?.status === 403 ||
        (query?.error as any)?.response?.data?.message ===
          'invalid credentials')
    ) {
      // Token is expired - clear session and redirect to login
      hasHandledLogout.current = true;

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
  }, [token, query?.error, clearUser, logout, queryClient, router]);

  return query;
};

export default useAuthQuery;
