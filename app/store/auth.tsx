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

// This hook can be used to access the user info.
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
  const { user, clearUser, onboarding_screen, logout } = useUserStore();
  const rootSegments = useSegments();

  const rootNavigation = useRootNavigation();

  // Check if the user is authenticated when the app loads
  useEffect(() => {
    checkAuthStatus();
  }, []);
  useEffect(() => {
    if (rootNavigation?.isReady) {
      setIsNavigationReady(true);
    }
  }, [rootNavigation?.isReady]);
  // Handle authentication state changes
  useEffect(() => {
    if (!isNavigationReady) return; // Prevent navigation before mounting
    const inAuthGroup = rootSegments[0] === '(auth)';

    // clearUser();

    if (user && !onboarding_screen && inAuthGroup) {
      // Redirect away from auth group if authenticated
      router.replace('/(tabs)/discover');
    } else if (!user && !inAuthGroup) {
      // Redirect to auth group if not authenticated
      router.replace('/(auth)');
    }
  }, [user, rootNavigation?.isReady, rootSegments]);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      setIsLoggedIn(false);
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
