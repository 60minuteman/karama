import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { View } from 'react-native';
import { Colors } from '@/constants/Colors';

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <Stack 
            screenOptions={{ 
              headerShown: false,
              contentStyle: { backgroundColor: Colors.light.background }
            }}
          >
            <Stack.Screen 
              name="(auth)" 
              options={{
                presentation: 'fullScreenModal',
              }}
            />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </View>
  );
}