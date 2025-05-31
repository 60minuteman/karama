import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';

interface PaymentMethodProps {
  onNext?: (method: string) => void;
}

const PaymentOptions = [
  { id: 'employee' as const, label: '🪪 Employee', icon: '🪪' },
  {
    id: 'contractor' as const,
    label: ' 🧾 Independent Contractor',
    icon: '🧾',
  },
  { id: 'no_preference' as const, label: '💵 No Preference', icon: '💵' },
];

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onNext }) => {
  const router = useRouter();
  const {
    caregiverPaymentMethod,
    setCaregiverPaymentMethod,
    showCaregiverPaymentMethod,
    setShowCaregiverPaymentMethod,
    setOnboardingScreen,
  } = useUserStore();
  // const [selectedMethod, setSelectedMethod] = useState<string>('');
  // const [showOnProfile, setShowOnProfile] = useState(false);

  console.log('caregiverPaymentMethod', caregiverPaymentMethod);

  const handleNext = () => {
    if (onNext) {
      onNext(caregiverPaymentMethod);
    } else {
      setOnboardingScreen('/(auth)/screens/onboarding/caregiver/benefits');
      router.push('/(auth)/screens/onboarding/caregiver/benefits');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' titleStyle={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.3} />

        <ScrollView style={styles.mainContent}>
          <ThemedText style={styles.title}>
            What is your preferred{'\n'}payment method
          </ThemedText>

          <ThemedText style={styles.description}>
            If you choose "Employee," please note that taxes and withholdings
            will be deducted from your pay. If you choose "Independent
            Contractor," taxes will not be withheld, and you are responsible for
            paying your own taxes.
          </ThemedText>

          <View style={styles.optionsContainer}>
            {PaymentOptions.map((option) => (
              <View key={option.id} style={styles.pillWrapper}>
                <Pill
                  label={option.label}
                  // icon={option.icon}
                  selected={caregiverPaymentMethod === option.label}
                  onPress={() => setCaregiverPaymentMethod(option.label)}
                />
              </View>
            ))}
          </View>

          <View style={styles.toggleContainer}>
            <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
            <Switch
              value={showCaregiverPaymentMethod}
              onValueChange={setShowCaregiverPaymentMethod}
              trackColor={{ false: '#E5E5E5', true: Colors.light.primary }}
              thumbColor={showCaregiverPaymentMethod ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button label='Skip' onPress={() => router.back()} variant='skip' />
          <Button
            label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={!caregiverPaymentMethod}
          />
        </View>
      </View>
    </ThemedView>
  );
};

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
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 32,
    lineHeight: 20,
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

export default PaymentMethod;
