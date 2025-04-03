import { useUserStore } from '@/services/state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { createContext, useContext, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextType {
  signIn: (data: { token: string }) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, clearUser } = useUserStore();
  const queryClient = useQueryClient();

  const signIn = async (data: { token: string }) => {
    try {
      setIsLoading(true);
      
      if (!data?.token) {
        throw new Error('Invalid token format');
      }

      // Save token to AsyncStorage first
      await AsyncStorage.setItem('userToken', data.token);
      
      // Then update store
      await setToken(data.token);
      
      // Finally navigate
      router.replace('/(tabs)/discover');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Clear everything first
      await AsyncStorage.clear();
      queryClient.clear();
      await clearUser();
      
      // Then navigate
      router.replace('/(auth)/signInPhone');
    } catch (error) {
      console.error('Error signing out:', error);
      router.replace('/(auth)/signInPhone');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
