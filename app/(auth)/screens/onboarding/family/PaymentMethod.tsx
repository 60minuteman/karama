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

interface PaymentMethodProps {
  onNext?: (method: string) => void;
}

const PaymentOptions = [
  { id: 'employee', label: 'Employee', icon: '💳' },
  { id: 'contractor', label: 'Independent Contractor', icon: '📄' },
  { id: 'no_preference', label: 'No Preference', icon: '💰' },
];

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onNext }) => {
  const router = useRouter();
  const {
    family_payment_method = { selected_method: '', show_on_profile: false },
    setFamilyPaymentMethod,
    setOnboardingScreen,
  } = useUserStore();

  // Initialize with default values if family_payment_method is null or undefined
  React.useEffect(() => {
    if (
      !family_payment_method ||
      Object.keys(family_payment_method).length === 0
    ) {
      setFamilyPaymentMethod({
        selected_method: '',
        show_on_profile: false,
      });
    }
  }, []);

  // Destructure with default values
  const { selected_method = '', show_on_profile = false } =
    family_payment_method;

  const handleNext = () => {
    if (onNext) {
      onNext(selected_method);
    } else {
      setOnboardingScreen('/(auth)/screens/onboarding/family/benefits');
      router.push('/(auth)/screens/onboarding/family/benefits');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.3} />

        <ScrollView style={styles.mainContent}>
          <ThemedText style={styles.title}>
            What is your preferred{'\n'}payment method
          </ThemedText>

          <ThemedText style={styles.description}>
            If you choose "Employee," please note that taxes and withholdings
            are expected to be deducted before paying your caregiver. If you
            choose "Independent Contractor," the caregiver is responsible for
            paying their own taxes.
          </ThemedText>

          <View style={styles.optionsContainer}>
            {PaymentOptions.map((option) => (
              <View key={option.id} style={styles.pillWrapper}>
                <Pill
                  label={option.label}
                  icon={option.icon}
                  selected={selected_method === option.id}
                  onPress={() =>
                    setFamilyPaymentMethod({ selected_method: option.id })
                  }
                />
              </View>
            ))}
          </View>

          <View style={styles.toggleContainer}>
            <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
            <Switch
              value={show_on_profile}
              onValueChange={(value) =>
                setFamilyPaymentMethod({ show_on_profile: value })
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
            disabled={!selected_method}
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
    color: '#002140',
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
