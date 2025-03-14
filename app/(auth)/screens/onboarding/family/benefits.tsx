import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';

const BenefitOptions = [
  { id: 'health_insurance', label: 'Health Insurance', icon: '🏥' },
  { id: 'paid_time_off', label: 'Paid Time Off', icon: '🌴' },
  { id: 'sick_leave', label: 'Sick Leave', icon: '🤒' },
  { id: 'dental_insurance', label: 'Dental Insurance', icon: '🦷' },
  { id: 'vision_insurance', label: 'Vision Insurance', icon: '👁️' },
  { id: 'retirement_plan', label: 'Retirement Plan', icon: '💰' },
  { id: 'life_insurance', label: 'Life Insurance', icon: '🌟' },
  { id: 'disability_insurance', label: 'Disability Insurance', icon: '♿' },
];

export default function BenefitsScreen() {
  const router = useRouter();
  const { family_benefits, setFamilyBenefits, setOnboardingScreen } =
    useUserStore();

  console.log('family_benefits', family_benefits);

  const { selected_benefits, show_on_profile } = family_benefits;

  const toggleBenefit = (id: string) => {
    const currentBenefits = selected_benefits ?? [];
    const updatedBenefits = currentBenefits.includes(id)
      ? currentBenefits.filter((benefit) => benefit !== id)
      : [...currentBenefits, id];

    setFamilyBenefits({ selected_benefits: updatedBenefits });
  };

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/prompt');
    router.push('/(auth)/screens/onboarding/family/prompt');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.95} />

        <ScrollView style={styles.mainContent}>
          <ThemedText style={styles.title}>
            What benefits do you{'\n'}offer to caregivers?
          </ThemedText>

          <View style={styles.optionsContainer}>
            {BenefitOptions.map((benefit) => (
              <View key={benefit.id} style={styles.pillWrapper}>
                <Pill
                  label={benefit.label}
                  icon={benefit.icon}
                  selected={selected_benefits?.includes(benefit.id)}
                  onPress={() => toggleBenefit(benefit.id)}
                />
              </View>
            ))}
          </View>

          <View style={styles.toggleContainer}>
            <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
            <Switch
              value={show_on_profile}
              onValueChange={(value) =>
                setFamilyBenefits({ show_on_profile: value })
              }
              trackColor={{ false: '#E5E5E5', true: Colors.light.primary }}
              thumbColor={show_on_profile ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button label='Skip' onPress={() => router.back()} variant='skip' />
          <Button
            label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={selected_benefits?.length === 0}
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
  mainContent: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    color: '#002140',
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 32,
  },
  pillWrapper: {
    alignSelf: 'flex-start',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  toggleText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
