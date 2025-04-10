import { toastConfig } from '@/components/Toast';
import { Colors } from '@/constants/Colors';
import { FontProvider } from '@/providers/FontProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useUserStore } from '@/services/state/user';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
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
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

console.log('useUserStore.getState().token', useUserStore.getState().token);

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
  const { hydrated } = useUserStore();

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (isReady && hydrated) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 50);
      return;
    }
  }, [isReady, hydrated]);

  if (!isReady) {
    return null;
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
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
