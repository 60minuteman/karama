import { Redirect } from 'expo-router';
import { useOnboarding } from '@/hooks/useOnboarding';
import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

export default function InitialScreen() {
  const { isFirstLaunch } = useOnboarding();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkInitialRoute = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        const token = await AsyncStorage.getItem('userToken');
        
        if (token) {
          setInitialRoute('/(tabs)/discover');
        } else if (isFirstLaunch) {
          setInitialRoute('/(auth)/onboarding');
        } else {
          setInitialRoute('/(auth)/auth');
        }
      } catch (error) {
        console.error('Initial route check error:', error);
        setInitialRoute('/(auth)/auth');
      }
    };

    checkInitialRoute();
  }, [isFirstLaunch]);

  if (!initialRoute) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Redirect href={initialRoute} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
});