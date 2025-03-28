import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { useUserStore } from '@/services/state/user';

const experienceOptions = [
  ['1-11 months', '1-5 years'],
  ['6-10 years', '11-20 years'],
  ['21-30 years', '31 years+'],
] as const;

export default function Page() {
  const { caregiverExperienceDuration, setCaregiverExperienceDuration, setOnboardingScreen } = useUserStore()
  // const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/education')
    router.push('/(auth)/screens/onboarding/caregiver/education')
  }
  return (
    <ThemedView style={styles.container}>
      <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          How many years of{'\n'}childcare experience{'\n'}do you have?
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          We are referring to paid experience.
        </ThemedText>

        <View style={styles.optionsContainer}>
          {experienceOptions.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((option) => (
                <Pill
                  key={option}
                  label={option}
                  onPress={() => setCaregiverExperienceDuration(option)}
                  selected={caregiverExperienceDuration === option}
                  style={styles.option}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Button
          label="Next"
          onPress={handleNext}
          variant="compact"
          style={styles.nextButton}
          disabled={!caregiverExperienceDuration}
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
    fontFamily: 'Bogart',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 12,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#BEBAB9',
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  bottomNav: {
    padding: 20,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextButton: {
    backgroundColor: '#F45B69',
    borderRadius: 100,
  }
}); 