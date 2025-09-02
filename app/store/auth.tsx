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
  const { user, clearUser, onboarding_screen, logout, hydrated, token } =
    useUserStore();
  const rootSegments = useSegments();
  const rootNavigation = useRootNavigation();

  // Check if the user is authenticated when the app loads

  useEffect(() => {
    // Ensure everything is ready before attempting navigation
    if (!rootNavigation?.isReady || !hydrated || !rootSegments) return;

    const inAuthGroup = rootSegments[0] === '(auth)';
    const inPreviewGroup = rootSegments[0] === 'preview';

    console.log('user', user);
    console.log('onboarding_screen', !onboarding_screen);
    console.log('inAuthGroup', inAuthGroup);
    console.log('inPreviewGroup', inPreviewGroup);

    try {
      // Skip auth protection for preview screens (dev only)
      if (inPreviewGroup) {
        return;
      }

      if (user && !onboarding_screen && inAuthGroup) {
        // Redirect away from auth group if authenticated
        router.replace('/(tabs)/discover');
      } else if (
        (!user && !inAuthGroup) ||
        (onboarding_screen && !inAuthGroup)
      ) {
        // Redirect to auth group if not authenticated
        router.replace('/(auth)/onboarding');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback navigation on error
      if (!user && !inAuthGroup) {
        router.replace('/(auth)/onboarding');
      }
    }
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
      // Retry once on failure
      try {
        await AsyncStorage.setItem('userToken', token);
        setIsLoggedIn(true);
      } catch (retryError) {
        console.error('Retry failed for sign in:', retryError);
        throw retryError;
      }
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
      // Continue with logout even if AsyncStorage fails
      try {
        await logout();
        setIsLoggedIn(false);
        router.replace('/(auth)');
      } catch (logoutError) {
        console.error('Logout failed:', logoutError);
        // Force navigation to auth screen
        router.replace('/(auth)');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoading, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
