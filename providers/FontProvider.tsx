import { 
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts as usePoppinsFonts
} from '@expo-google-fonts/poppins';
import React from 'react';
import { View } from 'react-native';

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [fontsLoaded] = usePoppinsFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    'Bogart-Bold': require('../assets/fonts/bogart/bogart-bold.otf'),
    'Bogart-Semibold': require('../assets/fonts/bogart/Bogart-Semibold-trial.ttf'),
  });

  if (!fontsLoaded) {
    return <View />; // Or a loading screen
  }

  return <>{children}</>;
} 