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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { user, clearUser, onboarding_screen, logout, hydrated } =
    useUserStore();
  const rootSegments = useSegments();
  const rootNavigation = useRootNavigation();

  // Check if the user is authenticated when the app loads

  useEffect(() => {
    // Ensure everything is ready before attempting navigation
    if (!rootNavigation?.isReady || !hydrated || !rootSegments) return;

    // Add a longer initial delay to ensure complete mounting
    const timer = setTimeout(() => {
      // Double-check navigation readiness
      if (!rootNavigation.isReady) return;

      const inAuthGroup = rootSegments[0] === '(auth)';

      try {
        if (user && !onboarding_screen && inAuthGroup) {
          // Redirect away from auth group if authenticated
          router.navigate('/(tabs)/discover');
        } else if (!user && !inAuthGroup) {
          // Redirect to auth group if not authenticated
          router.navigate('/(auth)');
        }
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }, 50); // Increased delay to 100ms

    return () => clearTimeout(timer);
  }, [
    user,
    rootNavigation?.isReady,
    rootSegments,
    hydrated,
    onboarding_screen,
  ]);

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
