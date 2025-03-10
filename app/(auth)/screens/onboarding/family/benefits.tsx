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

const benefitsOptions = [
  { id: 'yearly_bonus', label: 'Yearly Bonus', icon: '💰' },
  { id: 'paid_time_off', label: 'Paid Time Off', icon: '🏖' },
  { id: 'yearly_raise', label: 'Yearly Raise', icon: '💸' },
  { id: 'overtime_pay', label: 'Overtime Pay', icon: '💲' },
  { id: 'maternity_leave', label: 'Maternity Leave', icon: '👶' },
  { id: 'health_insurance', label: 'Health Insurance', icon: '🏥' },
  { id: 'retirement_account', label: 'Retirement Account', icon: '🤑' },
  { id: 'metro_card', label: 'Monthly Metro Card', icon: '🚇' },
  { id: 'mileage', label: 'Mileage Reimbursement', icon: '🚗' },
  { id: 'extra_child_pay', label: 'Extra Pay For Additional Children', icon: '👶' },
  { id: 'other', label: 'Other', icon: '✨' },
];

export default function Benefits() {
  const router = useRouter();
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [showOnProfile, setShowOnProfile] = useState(false);

  const toggleBenefit = (benefitId: string) => {
    setSelectedBenefits(prev =>
      prev.includes(benefitId)
        ? prev.filter(id => id !== benefitId)
        : [...prev, benefitId]
    );
  };

  const handleNext = () => {
    router.push('/(auth)/screens/onboarding/family/prompt');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.85} />

        <ThemedText style={styles.title}>
          What benefits are{'\n'}you offering?
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
                  selected={selectedBenefits.includes(benefit.id)}
                  onPress={() => toggleBenefit(benefit.id)}
                />
              </View>
            ))}
          </View>

          <View style={styles.toggleContainer}>
            <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
            <Switch
              value={showOnProfile}
              onValueChange={setShowOnProfile}
              trackColor={{ false: '#E5E5E5', true: Colors.light.primary }}
              thumbColor={showOnProfile ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.bottomSpacer} />
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
              disabled={selectedBenefits.length === 0}
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
    marginTop: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    color: '#002140',
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
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  toggleText: {
    fontSize: 16,
  },
  bottomSpacer: {
    height: 100,
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