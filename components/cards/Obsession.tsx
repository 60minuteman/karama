import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { 
  useFonts,
  Poppins_400Regular 
} from '@expo-google-fonts/poppins';

interface ObsessionProps {
  obsession: string;
}

export const Obsession = ({
  obsession = "Chickens! The kids love them and we just got two chicks named Bo & Sam."
}: ObsessionProps) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>My current obbession is</ThemedText>
        <ThemedText style={styles.obsessionText}>{obsession}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  section: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    fontWeight: '400',
    color: 'rgba(38, 29, 42, 0.4)',
    marginBottom: 12,
  },
  obsessionText: {
    fontSize: 24,
    fontFamily: 'Bogart-Regular',
    fontWeight: '400',
    color: '#261D2A',
    lineHeight: 32,
  },
}); 