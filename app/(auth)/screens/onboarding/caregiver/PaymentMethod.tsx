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
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [showOnProfile, setShowOnProfile] = useState(false);

  const handleNext = () => {
    if (onNext) {
      onNext(selectedMethod);
    } else {
      router.push('/(auth)/screens/onboarding/caregiver/benefits');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.3} />

        <ScrollView style={styles.mainContent}>
          <ThemedText style={styles.title}>
            What is your preferred{'\n'}payment method
          </ThemedText>
          
          <ThemedText style={styles.description}>
            If you choose "Employee," please note that taxes and withholdings will be deducted from your pay. If you choose "Independent Contractor," taxes will not be withheld, and you are responsible for paying your own taxes.
          </ThemedText>

          <View style={styles.optionsContainer}>
            {PaymentOptions.map((option) => (
              <View key={option.id} style={styles.pillWrapper}>
                <Pill
                  label={option.label}
                  icon={option.icon}
                  selected={selectedMethod === option.id}
                  onPress={() => setSelectedMethod(option.id)}
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
        </ScrollView>

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
            disabled={!selectedMethod}
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
    fontFamily: 'Poppins',
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
  }
});

export default PaymentMethod;