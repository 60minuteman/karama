import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import {
  CaregiverAbilities,
  CaregiverCertification,
  useUserStore,
} from '@/services/state/user';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const abilities = [
  { label: '✈️ Can Travel' as const },
  { label: '🚗 Able To Drive' as const },
  { label: '⛑️ First Aid' as const },
  { label: '🏊 Can Swim' as const },
  { label: '💉 COVID Vaccination' as const },
  { label: '👐 CPR' as const },
  { label: '🏕️ Other' as const },
];

const certifications = [
  { label: '🤟 Sign Language' as const },
  { label: '💊 Administering Medication' as const },
  { label: '👨‍🦽 Special Needs' as const },
  { label: '🦼 Condition Specific' as const },
  { label: '🍔 Feeding & Swallowing' as const },
  { label: '😇 Registered Behaviour Technician' as const },
  { label: '📃 Other' as const },
];

export default function Page() {
  const {
    caregiverAbilities,
    setCaregiverAbilities,
    caregiverCertifications,
    setCaregiverCertification,
    setOnboardingScreen,
  } = useUserStore();
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleAbilitiesSelection = (label: CaregiverAbilities) => {
    if (label === '🏕️ Other') {
      setOnboardingScreen(
        '/(auth)/screens/onboarding/caregiver/otherAbilities'
      );
      router.push('/(auth)/screens/onboarding/caregiver/otherAbilities');
      return;
    }
    const prev = caregiverAbilities ?? [];
    const totalSelections =
      (caregiverCertifications?.length ?? 0) + prev.length;

    // If trying to deselect, allow it
    if (prev.includes(label)) {
      const updatedAbilities = prev.filter((item) => item !== label);
      setCaregiverAbilities(updatedAbilities);
      return;
    }

    // If already at max selections, don't allow more
    if (totalSelections >= 6) {
      return;
    }

    const updatedAbilities = [...prev, label];
    setCaregiverAbilities(updatedAbilities);
  };
  const toggleCertificationSelection = (label: CaregiverCertification) => {
    if (label === '📃 Other') {
      setOnboardingScreen(
        '/(auth)/screens/onboarding/caregiver/otherCertification'
      );
      router.push('/(auth)/screens/onboarding/caregiver/otherCertification');
      return;
    }
    const prev = caregiverCertifications ?? [];
    const totalSelections = (caregiverAbilities?.length ?? 0) + prev.length;

    // If trying to deselect, allow it
    if (prev.includes(label)) {
      const updatedCertification = prev.filter((item) => item !== label);
      setCaregiverCertification(updatedCertification);
      return;
    }

    // If already at max selections, don't allow more
    if (totalSelections >= 6) {
      return;
    }

    const updatedCertification = [...prev, label];
    setCaregiverCertification(updatedCertification);
  };
  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/language');
    router.push('/(auth)/screens/onboarding/caregiver/language');
  };
  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          What are your{'\n'}abilities and{'\n'}certifications?
        </ThemedText>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedText style={styles.sectionTitle}>Abilities</ThemedText>
          <View style={styles.optionsContainer}>
            {abilities.map((option) => {
              const totalSelections =
                (caregiverAbilities?.length ?? 0) +
                (caregiverCertifications?.length ?? 0);
              const isDisabled =
                !caregiverAbilities?.includes(option.label) &&
                totalSelections >= 6;
              return (
                <Pill
                  key={option.label}
                  label={option.label}
                  onPress={() => toggleAbilitiesSelection(option.label)}
                  selected={caregiverAbilities?.includes(option.label)}
                  disabled={isDisabled}
                />
              );
            })}
          </View>

          <ThemedText style={styles.sectionTitle}>Certifications</ThemedText>
          <View style={styles.optionsContainer}>
            {certifications.map((option) => {
              const totalSelections =
                (caregiverAbilities?.length ?? 0) +
                (caregiverCertifications?.length ?? 0);
              const isDisabled =
                !caregiverCertifications?.includes(option.label) &&
                totalSelections >= 10;
              return (
                <Pill
                  key={option.label}
                  label={option.label}
                  onPress={() => toggleCertificationSelection(option.label)}
                  selected={caregiverCertifications?.includes(option.label)}
                  disabled={isDisabled}
                />
              );
            })}
          </View>
          <View style={styles.scrollEndSpacer} />
        </ScrollView>
      </View>

      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={[
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.9)',
            'rgba(255,255,255,1)',
          ]}
          style={styles.buttonGradient}
          pointerEvents='none'
        />
        <View style={styles.bottomNav}>
          <Button label='Skip' onPress={handleNext} variant='skip' />
          <Button
            label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={
              !caregiverAbilities?.length && !caregiverCertifications?.length
            }
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  scrollEndSpacer: {
    height: 20,
  },
  title: {
    fontSize: 32,
    lineHeight: 44,
    fontFamily: 'Bogart-Semibold', // Changed to 'Bogart-Bold' for the header text
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 40,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#BEBAB9',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  gradientContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonGradient: {
    height: 120,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40,
  },
});
