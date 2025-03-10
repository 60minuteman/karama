import { Colors } from '@/constants/Colors';
import { FontProvider } from '@/providers/FontProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useUserStore } from '@/services/state/user';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AuthProvider, { useAuth } from './store/auth';

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  victory: ({ text1, text2, props }: any) => (
    <View style={{ position: 'absolute', top: 30, width: '90%' }}>
      {/* <SuccessToast text1={text1} text2={text2} /> */}
    </View>
  ),

  info: ({ text1, text2, props }: any) => (
    <View style={{ position: 'absolute', top: 30, width: '90%' }}>
      {/* <InfoToast text1={text1} text2={text2} /> */}
    </View>
  ),

  problem: ({ text1, text2, props }: any) => (
    <View style={{ position: 'absolute', top: 30, width: '90%' }}>
      {/* <ProblemToast text1={text1} text2={text2} /> */}
    </View>
  ),
  comingSoon: ({ text1 }: any) => (
    <View style={{ position: 'absolute', top: 30, width: '90%' }}>
      {/* <ComingSoonToast text1={text1} /> */}
    </View>
  ),
};

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
  const hydrated = useUserStore((state) => state.hydrated);

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
      SplashScreen.hideAsync();
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

  // if (!authInitialized && !user) return null;

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: Colors.light.background },
                }}
              >
                <Stack.Screen
                  name='(auth)'
                  options={{
                    presentation: 'fullScreenModal',
                  }}
                />
                <Stack.Screen name='(app)' options={{ headerShown: false }} />
              </Stack>
              <StatusBar
                style='dark'
                backgroundColor={Colors.light.background}
              />
            </View>
          </QueryClientProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
