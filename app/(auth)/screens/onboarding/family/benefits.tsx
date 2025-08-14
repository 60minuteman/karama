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
  { id: 'health_insurance', label: '🏥 Health Insurance' },
  { id: 'paid_time_off', label: '🌴 Paid Time Off' },
  { id: 'sick_leave', label: '🤒 Sick Leave' },
  { id: 'dental_insurance', label: '🦷 Dental Insurance' },
  { id: 'vision_insurance', label: '👁️ Vision Insurance' },
  { id: 'retirement_plan', label: '💰 Retirement Plan' },
  { id: 'life_insurance', label: '🌟 Life Insurance' },
  { id: 'disability_insurance', label: '♿ Disability Insurance' },
];

export default function BenefitsScreen() {
  const router = useRouter();
  const { family_benefits, setFamilyBenefits, setOnboardingScreen } =
    useUserStore();

  console.log('family_benefits', family_benefits);

  const { selected_benefits, show_on_profile } = family_benefits;

  const toggleBenefit = (label: string) => {
    const currentBenefits = selected_benefits ?? [];
    const isBenefitSelected = currentBenefits.includes(label);
    let updatedBenefits;

    if (isBenefitSelected) {
      updatedBenefits = currentBenefits.filter((benefit) => benefit !== label);
    } else if (currentBenefits.length <= 6) {
      updatedBenefits = [...currentBenefits, label];
    }

    setFamilyBenefits({ selected_benefits: updatedBenefits });
  };

  const handleNext = () => {
    // setOnboardingScreen('/(auth)/screens/onboarding/family/prompt');
    // router.push('/(auth)/screens/onboarding/family/prompt');
    router.push('/(auth)/screens/onboarding/family/promptSelection');
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

          <ThemedText style={styles.subtitle}>
            you can choose up to 6 options
          </ThemedText>

          <View style={styles.optionsContainer}>
            {BenefitOptions.map((benefit) => (
              <View key={benefit.id} style={styles.pillWrapper}>
                <Pill
                  label={benefit.label}
                  selected={selected_benefits?.includes(benefit.label)}
                  onPress={() => toggleBenefit(benefit.label)}
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
          <Button label='Skip' onPress={handleNext} variant='skip' />
          <Button
            // label='Next'
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
    // marginBottom: 16,
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

  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    marginBottom: 24,
    marginTop: 16,
  },
});
