import { toastConfig } from '@/components/Toast';
import { Colors } from '@/constants/Colors';
import { FontProvider } from '@/providers/FontProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useUserStore } from '@/services/state/user';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AuthProvider from './store/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const { hydrated, token } = useUserStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    async function prepare() {
      try {
        // Only prepare fonts or other resources here
        // Token hydration is handled in user store
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (!isReady || !hydrated) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (token && inAuthGroup) {
      router.replace('/(tabs)/discover');
    } else if (!token && inTabsGroup) {
      router.replace('/(auth)/auth');
    }

    // Hide splash screen after navigation is ready
    SplashScreen.hideAsync().catch(console.warn);
  }, [isReady, hydrated, segments, token]);

  if (!isReady || !hydrated) {
    return <View style={{ flex: 1, backgroundColor: Colors.light.background }} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider>
            <FontProvider>
              <AuthProvider>
                <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
                  <Slot />
                  <StatusBar style='dark' backgroundColor={Colors.light.background} />
                  <Toast config={toastConfig} position='top' />
                </View>
              </AuthProvider>
            </FontProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

