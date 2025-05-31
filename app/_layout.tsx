import ErrorBoundary from '@/components/ErrorBoundary';
import { SplashScreen } from '@/components/SplashScreen';
import { toastConfig } from '@/components/Toast';
import { Colors } from '@/constants/Colors';
import { FontProvider } from '@/providers/FontProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useUserStore } from '@/services/state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import * as SplashScreenExpo from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { io, Socket } from 'socket.io-client';
import AuthProvider, { useAuth } from './store/auth';

let socketInstance: Socket | null = null;

export const getSocket = () => {
  const { user, token } = useUserStore.getState();

  // If no user or token, ensure socket is disconnected
  if (!user?.user_id || !token) {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
    }
    return null;
  }

  // If socket exists but user/token changed, disconnect and create new
  if (socketInstance) {
    const currentUserId = socketInstance.io.opts.query?.userId;
    const currentToken = socketInstance.io.opts.query?.token;

    if (currentUserId !== `${user.user_id}` || currentToken !== token) {
      socketInstance.disconnect();
      socketInstance = null;
    }
  }

  // Create new socket if needed
  if (!socketInstance) {
    socketInstance = io('https://starfish-app-7pbch.ondigitalocean.app/chat', {
      transports: ['websocket'],
      query: {
        userId: `${user.user_id}`,
        token: `${token}`,
      },
    });
  }

  return socketInstance;
};

// Keep splash screen visible while we fetch resources
SplashScreenExpo.preventAutoHideAsync();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
    },
  },
});

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const { hydrated } = useUserStore();

  useEffect(() => {
    async function prepare() {
      try {
        // Hide native splash immediately and show custom splash
        await SplashScreenExpo.hideAsync();
        
        // Minimum loading time for app initialization
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsReady(true);
      } catch (e) {
        console.warn(e);
        setIsReady(true); // Ensure we don't get stuck
      }
    }
    prepare();
  }, []);

  const handleSplashFinish = () => {
    setShowCustomSplash(false);
  };

  // Show custom splash while loading
  if (showCustomSplash || !isReady || !hydrated) {
    return <SplashScreen onAnimationFinish={handleSplashFinish} />;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  // const { authInitialized, user } = useAuth();
  // const { isLoading, isLoggedIn } = useAuth();
  const { hydrated } = useUserStore();

  if (!hydrated) return null;

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <FontProvider>
                <View
                  style={{ flex: 1, backgroundColor: Colors.light.background }}
                >
                  <Slot />
                  <StatusBar
                    style='dark'
                    backgroundColor={Colors.light.background}
                  />
                </View>
                <Toast config={toastConfig} position='top' />
              </FontProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
