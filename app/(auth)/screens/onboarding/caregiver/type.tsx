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
import { StyleSheet, View } from 'react-native';

const caregiverTypes = [
  { label: '🌙 Night Nurse' },
  { label: '👩🏻‍💼 Governess' },
  { label: '🧁 Babysitter' },
  { label: '👩🏽‍🍼 Nanny' },
  { label: '🙎🏼‍♂️ Manny' },
  { label: '🧃 Au Pair' },
  { label: '🧽 Caregiver/Housekeeper' },
  { label: '📅 Caregiver/Personal Assistant' },
  { label: '🧢 Caregiver/Household Manager' },
] as const;

export default function Page() {
  const {
    caregiverPositionType,
    setCaregiverPositionType,
    setOnboardingScreen,
  } = useUserStore();
  // const [selectedType, setSelectedType] = useState<string | null>(null);
  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/experience');
    router.push('/(auth)/screens/onboarding/caregiver/experience');
  };
  return (
    <ThemedView style={styles.container}>
      <Header variant='back' titleStyle={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          What type of{'\n'}caregiver are you
        </ThemedText>

        <View style={styles.optionsContainer}>
          {caregiverTypes.map((type, index) => (
            <Pill
              key={index}
              label={type.label}
              onPress={() => {
                setCaregiverPositionType(type.label);
                handleNext();
              }}
              selected={caregiverPositionType === type.label}
              style={styles.option}
            />
          ))}
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Button
          label='Next'
          onPress={handleNext}
          variant='compact'
          style={styles.nextButton}
          disabled={!caregiverPositionType}
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
    marginBottom: 40,
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
  bottomNav: {
    padding: 20,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextButton: {
    backgroundColor: '#F45B69',
    borderRadius: 100,
  },
});
