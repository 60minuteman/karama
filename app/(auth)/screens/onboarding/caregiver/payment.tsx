import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Pill } from '@/components/ui/Pill';
import { Colors } from '@/constants/Colors';
import { TextInput } from 'react-native';
import { Slider } from '@/components/ui/Slider';
import { useUserStore } from '@/services/state/user';

type PaymentType = 'Hourly' | 'Salary Base';

export default function PaymentScreen() {
  const router = useRouter();
  // const [selected, setSelected] = useState<PaymentType | null>(null);
  // const [hourlyRate, setHourlyRate] = useState(15);
  // const [salaryAmount, setSalaryAmount] = useState('50,000');
  const [hasInteracted, setHasInteracted] = useState(false);
  const {caregiverHourlyRate,setCaregiverHourlyRate,caregiverSalaryAmount,
    setCaregiverSalaryAmount,setOnboardingScreen,caregiverPaymentType,setCaregiverPaymentType}=useUserStore()
  const paymentOptions: Array<{ label: PaymentType; icon: string }> = [
    { label: 'Hourly', icon: '🤑' },
    { label: 'Salary Base', icon: '💰' },
  ];

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/PaymentMethod',)
    router.push({
      pathname: '/(auth)/screens/onboarding/caregiver/PaymentMethod',
      params: {
        type: caregiverPaymentType,
        rate: caregiverPaymentType === 'Hourly' ? caregiverHourlyRate : 
        parseInt(caregiverSalaryAmount?.replace(/,/g, ''))
      }
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.95} />

        <View style={styles.mainContent}>
          <ThemedText style={styles.title}>
            How do you plan to{'\n'}pay your caregiver?
          </ThemedText>

          <View style={styles.optionsContainer}>
            {paymentOptions.map((option) => (
              <Pill
                key={option.label}
                label={option.label}
                icon={option.icon}
                selected={caregiverPaymentType=== option.label}
                onPress={() => setCaregiverPaymentType(option.label)}
              />
            ))}
          </View>

          {caregiverPaymentType === 'Hourly' && (
            <>
              <View style={styles.inputContainer}>
                <View style={styles.sliderContainer}>
                  <View style={styles.sliderWrapper}>
                    <Slider
                      min={15}
                      max={45}
                      value={caregiverHourlyRate}
                      onValueChange={(value) => {
                        setHasInteracted(true);
                        setCaregiverHourlyRate(value);
                      }}
                    />
                  </View>
                </View>
                <View style={[styles.inputBorder, caregiverHourlyRate > 0 && styles.inputBorderActive]}>
                  <TextInput
                    style={styles.input}
                    placeholder="$20-$30/hr"
                    placeholderTextColor="#999"
                    value={caregiverHourlyRate?.toString()}
                    onChangeText={(text) => {
                      setHasInteracted(true);
                      setCaregiverHourlyRate(Number(text));
                    }}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>
              </View>
            </>
          )}

          {caregiverPaymentType === 'Salary Base' && (
            <View style={styles.inputContainer}>
              <View style={[styles.inputBorder, caregiverSalaryAmount?.length > 0 && styles.inputBorderActive]}>
                <TextInput
                  style={styles.input}
                  placeholder="50,000"
                  placeholderTextColor="#999"
                  value={caregiverSalaryAmount}
                  onChangeText={setCaregiverSalaryAmount}
                  keyboardType="numeric"
                  autoFocus
                  maxLength={7}
                />
              </View>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Next"
            onPress={handleNext}
            variant="compact"
            disabled={!caregiverPaymentType}
            style={styles.button}
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
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 40,
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  sliderContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  sliderWrapper: {
    width: '80%',
  },
  inputContainer: {
    marginTop: 20,
  },
  inputBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
  },
  inputBorderActive: {
    borderBottomColor: Colors.light.primary,
  },
  input: {
    fontFamily: 'Poppins',
    fontSize: 24,
    color: Colors.light.text,
    paddingVertical: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    alignSelf: 'flex-end'
  }
});