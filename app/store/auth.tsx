import { useUserStore } from '@/services/state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useRootNavigation, useSegments } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isLoggedIn: boolean | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return value;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { user, logout, hydrated } = useUserStore();
  const rootSegments = useSegments();
  const rootNavigation = useRootNavigation();

  useEffect(() => {
    if (!rootNavigation?.isReady || !hydrated) return;

    const timer = setTimeout(() => {
      if (!rootNavigation.isReady) return;

      const inAuthGroup = rootSegments[0] === '(auth)';

      if (!user && !inAuthGroup) {
        // If no user and not in auth group, clear everything and redirect
        logout().then(() => {
          router.replace('/(auth)');
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [user, rootNavigation?.isReady, rootSegments, hydrated]);

  const signIn = async (token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await logout(); // Clear user state
      setIsLoggedIn(false);
      router.replace('/(auth)');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoading, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
