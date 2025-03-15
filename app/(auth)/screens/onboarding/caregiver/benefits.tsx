import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserStore } from '@/services/state/user';

const benefitsOptions = [
  { id: 'yearly_bonus' as const, label: 'Yearly Bonus', icon: '💰' },
  { id: 'paid_time_off' as const, label: 'Paid Time Off', icon: '🏖' },
  { id: 'yearly_raise' as const, label: 'Yearly Raise', icon: '💸' },
  { id: 'overtime_pay' as const, label: 'Overtime Pay', icon: '💲' },
  { id: 'maternity_leave' as const, label: 'Maternity Leave', icon: '👶' },
  { id: 'health_insurance' as const, label: 'Health Insurance', icon: '🏥' },
  { id: 'retirement_account' as const, label: 'Retirement Account', icon: '🤑' },
  { id: 'metro_card' as const, label: 'Monthly Metro Card', icon: '🚇' },
  { id: 'mileage' as const, label: 'Mileage Reimbursement', icon: '🚗' },
  { id: 'extra_child_pay' as const, label: 'Extra Pay For Additional Children', icon: '👶' },
];

export default function Benefits() {
  const router = useRouter();
  // const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  // const [showOnProfile, setShowOnProfile] = useState(false);
  const { caregiverRequiredBenefits, setCaregiverRequiredBenefits,
    showCaregiverRequiredBenefit, setShowCaregiverRequiredBenefits, setOnboardingScreen } = useUserStore();
  const toggleBenefit = (benefitId: string) => {
    const prev = caregiverRequiredBenefits ?? [];
    const updatedBenefits = prev.includes(benefitId)
      ? prev.filter(id => id !== benefitId)
      : [...prev, benefitId]
    setCaregiverRequiredBenefits(updatedBenefits); 
    
};

const handleNext = () => {
  setOnboardingScreen('/(auth)/screens/onboarding/caregiver/PastPosition')
  router.push('/(auth)/screens/onboarding/caregiver/PastPosition');
};

return (
  <ThemedView style={styles.container}>
    <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />

    <View style={styles.content}>
      <View style={styles.spacerTop} />
      <ProgressBar progress={0.85} />

      <ThemedText style={styles.title}>
        What benefits do{'\n'}you require?
      </ThemedText>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.benefitsContainer}>
          {benefitsOptions.map((benefit) => (
            <View key={benefit.id} style={styles.pillWrapper}>
              <Pill
                label={benefit.label}
                icon={benefit.icon}
                selected={caregiverRequiredBenefits?.includes(benefit.id)}
                onPress={() => toggleBenefit(benefit.id)}
              />
            </View>
          ))}
        </View>

        <ThemedText style={styles.sectionHeader}>Other</ThemedText>

        <View style={styles.toggleContainer}>
          <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
          <Switch
            value={showCaregiverRequiredBenefit}
            onValueChange={setShowCaregiverRequiredBenefits}
            trackColor={{ false: '#E5E5E5', true: Colors.light.primary }}
            thumbColor={showCaregiverRequiredBenefit ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
      </ScrollView>

      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        style={styles.buttonGradient}
      >
        <View style={styles.buttonContainer}>
          <Button
            label="Skip"
            onPress={() => router.back()}
            variant="skip"
          />
          <Button
            label="Next"
            onPress={handleNext}
            variant="compact"
            disabled={caregiverRequiredBenefits?.length === 0}
          />
        </View>
      </LinearGradient>
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 20,
    marginTop: 20,
  },
  benefitsContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 32,
  },
  pillWrapper: {
    alignSelf: 'flex-start',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#002140',
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
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingHorizontal: 20,
  }
});