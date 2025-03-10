import { Colors } from '@/constants/Colors';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { FontProvider } from '@/providers/FontProvider';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

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
          <FontProvider>
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
          </FontProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </View>
  );
}
