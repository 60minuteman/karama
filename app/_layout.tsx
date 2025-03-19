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
import AuthProvider, { useAuth } from './store/auth';

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

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
            <AuthProvider>
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
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
