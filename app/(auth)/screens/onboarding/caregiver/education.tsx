import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';

const educationOptions = [
  { label: '🎓 High School' as const },
  { label: '📓 In College' as const },
  { label: '🎓 Undergraduate Degree' as const },
  { label: '📘 In Grad School' as const },
  { label: '🎓 Graduate Degree' as const },
  { label: 'No Preference' as const },
];

export default function Page() {
  const {
    caregiverEducation,
    setCaregiverEducation,
    setOnboardingScreen,
    caregiverShowEducation,
    setCaregiverShowEducation,
  } = useUserStore();

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/abilities');
    router.push('/(auth)/screens/onboarding/caregiver/abilities');
  };

  const handleToggle = (value: boolean) => {
    setCaregiverShowEducation(value);
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' titleStyle={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          What is your highest{'\n'}level of education?
        </ThemedText>

        <ThemedText style={styles.subtitle}>Choose just one option</ThemedText>

        <View style={styles.optionsContainer}>
          {educationOptions.map((option) => (
            <Pill
              key={option.label}
              label={option.label}
              onPress={() => setCaregiverEducation(option.label)}
              selected={caregiverEducation === option.label}
              style={styles.option}
            />
          ))}
        </View>

        <View style={styles.toggleContainer}>
          <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
          <Switch
            value={caregiverShowEducation}
            onValueChange={handleToggle}
            trackColor={{ false: '#E2E8F0', true: Colors.light.primary }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor='#E2E8F0'
          />
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Button
          // label='Next'
          onPress={handleNext}
          variant='compact'
          style={styles.nextButton}
          disabled={!caregiverEducation}
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
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    color: Colors.light.text,
    // marginBottom: 40,
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  option: {
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
    padding: 20,
    paddingBottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextButton: {
    backgroundColor: '#F45B69',
    borderRadius: 100,
  },

  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    marginBottom: 24,
    marginTop: 24,
  },
});
