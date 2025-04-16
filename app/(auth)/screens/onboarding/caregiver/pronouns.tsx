import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';

const pronounOptions = [
  {
    label: 'She/Her',
    emoji: '👱‍♀️',
  },
  {
    label: 'He/Him',
    emoji: '👨🏽',
  },
  {
    label: 'They/Them',
    emoji: '∞',
  },
];

export default function Page() {
  const {
    caregiverPronouns,
    setCaregiverPronouns,
    setOnboardingScreen,
    caregiverShowPronouns,
    setCaregiverShowPronouns,
  } = useUserStore();
  // const [selectedPronouns, setSelectessssDietdPronouns] = useState<string | null>(null);
  // const [showOnProfile, setShowOnProfile] = useState(false);
  const [fontsLoaded] = useFonts({
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
  });
  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/hear');
    router.push('/(auth)/screens/onboarding/caregiver/hear');
  };
  useEffect(() => {}, [caregiverPronouns]);

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={[styles.title, { fontFamily: 'Bogart-Bold' }]}>
          What are your{'\n'}pronouns?
        </ThemedText>

        <View style={styles.optionsContainer}>
          {pronounOptions.map((option) => (
            <Pill
              key={option.label}
              label={`${option.emoji} ${option.label}`}
              onPress={() => setCaregiverPronouns(option.label)}
              selected={caregiverPronouns === option.label}
            />
          ))}
        </View>

        <View style={styles.toggleContainer}>
          <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
          <Switch
            value={caregiverShowPronouns}
            onValueChange={setCaregiverShowPronouns}
            trackColor={{ false: '#E2E8F0', true: '#F45B69' }}
            thumbColor={'#FFFFFF'}
          />
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Button label='Skip' onPress={handleNext} variant='skip' />
        <Button
          label='Next'
          onPress={handleNext}
          variant='compact'
          disabled={!caregiverPronouns}
        />
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
    fontWeight: '600',
    color: '#002140',
    marginBottom: 40,
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pill: {
    backgroundColor: '#F8FAFC',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  toggleText: {
    fontSize: 16,
    color: '#0F172A',
    fontFamily: 'Poppins',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
});
