import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { useFonts } from 'expo-font';
import { Bogart_600SemiBold } from '@expo-google-fonts/bogart';

export default function Page() {
  const [selection, setSelection] = useState<'yes' | 'no' | null>(null);
  const [fontsLoaded] = useFonts({
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
  });

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" style={{ fontFamily: 'Bogart-Bold' }} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.6} />

        <ThemedText style={styles.title}>
          Are you able to work{'\n'}with pets in a{'\n'}household?
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Don't be afraid to use your imagination
        </ThemedText>

        <View style={[styles.optionsContainer, { justifyContent: 'flex-end' }]}>
          <Pill
            label="Yes"
            onPress={() => setSelection('yes')}
            selected={selection === 'yes'}
          />
          <Pill
            label="No"
            onPress={() => setSelection('no')}
            selected={selection === 'no'}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <View style={styles.buttonContainer}>
          <Button
            label="Next"
            onPress={() => {
              if (selection === 'yes') {
                router.push('/(auth)/screens/onboarding/caregiver/pets');
              } else {
                router.push('/(auth)/screens/onboarding/caregiver/next-screen');
              }
            }}
            variant="compact"
            disabled={!selection}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  spacerTop: {
    height: 120,
  },
  title: {
    fontSize: 32,
    lineHeight: 44,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 16,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  bottomNav: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: Colors.light.background,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
}); 