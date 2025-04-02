import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Pill } from '@/components/ui/Pill';
import { Colors } from '@/constants/Colors';
import { TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { useUserStore } from '@/services/state/user';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type PaymentType = 'Hourly' | 'Salary Base';

export default function PaymentScreen() {
  const router = useRouter();
  const [hasInteracted, setHasInteracted] = useState(false);
  const {
    caregiverHourlyRate,
    setCaregiverHourlyRate,
    caregiverSalaryAmount,
    setCaregiverSalaryAmount,
    setOnboardingScreen,
    caregiverPaymentType,
    setCaregiverPaymentType
  } = useUserStore();

  // Initialize hourly rate if not set
  useEffect(() => {
    if (caregiverPaymentType === 'Hourly' && !caregiverHourlyRate) {
      setCaregiverHourlyRate(20); // Default value
    }
  }, [caregiverPaymentType]);

  const paymentOptions: Array<{ label: PaymentType; icon: string }> = [
    { label: 'Hourly', icon: '🤑' },
    { label: 'Salary Base', icon: '💰' },
  ];

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/PaymentMethod');
    router.push({
      pathname: '/(auth)/screens/onboarding/caregiver/PaymentMethod',
      params: {
        type: caregiverPaymentType,
        rate: caregiverPaymentType === 'Hourly' 
          ? caregiverHourlyRate || 0
          : parseInt(caregiverSalaryAmount?.replace(/,/g, '') || '0')
      }
    });
  };

  const handleSliderChange = (value: number) => {
    setHasInteracted(true);
    setCaregiverHourlyRate(Math.round(value));
  };

  const handleTextInputChange = (text: string) => {
    const numValue = parseInt(text) || 0;
    if (numValue >= 15 && numValue <= 45) {
      setHasInteracted(true);
      setCaregiverHourlyRate(numValue);
    }
  };

  const handleSalaryChange = (text: string) => {
    // Only allow numbers and commas
    const cleanText = text.replace(/[^0-9,]/g, '');
    // Format with commas
    const formattedText = cleanText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setCaregiverSalaryAmount(formattedText);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemedView style={styles.container}>
        <Header variant="back" />
        
        <View style={styles.content}>
          <View style={styles.spacerTop} />
          <ProgressBar progress={0.95} />

          <View style={styles.mainContent}>
            <ThemedText style={styles.title}>
              How would you like to be paid?
            </ThemedText>

            <View style={styles.optionsContainer}>
              {paymentOptions.map((option) => (
                <Pill
                  key={option.label}
                  label={option.label}
                  icon={option.icon}
                  selected={caregiverPaymentType === option.label}
                  onPress={() => setCaregiverPaymentType(option.label)}
                />
              ))}
            </View>

            {caregiverPaymentType === 'Hourly' && (
              <View style={styles.inputContainer}>
                <View style={[styles.sliderContainer, { backgroundColor: '#FAFAFA' }]}>
                  <View style={styles.sliderWrapper}>
                    <Slider
                      style={{width: '100%', height: 40}}
                      minimumValue={15}
                      maximumValue={45}
                      value={caregiverHourlyRate || 20}
                      step={1}
                      onValueChange={handleSliderChange}
                      minimumTrackTintColor={Colors.light.primary}
                      maximumTrackTintColor="#E5E5E5"
                      thumbTintColor={Colors.light.primary}
                    />
                  </View>
                </View>
                <View style={[styles.inputBorder, (caregiverHourlyRate || 0) > 0 && styles.inputBorderActive]}>
                  <TextInput
                    style={styles.input}
                    placeholder="$20-$30/hr"
                    placeholderTextColor="#999"
                    value={caregiverHourlyRate?.toString() || ''}
                    onChangeText={handleTextInputChange}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>
              </View>
            )}

            {caregiverPaymentType === 'Salary Base' && (
              <View style={styles.inputContainer}>
                <View style={[styles.inputBorder, (caregiverSalaryAmount?.length || 0) > 0 && styles.inputBorderActive]}>
                  <TextInput
                    style={styles.input}
                    placeholder="50,000"
                    placeholderTextColor="#999"
                    value={caregiverSalaryAmount || ''}
                    onChangeText={handleSalaryChange}
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
              disabled={!caregiverPaymentType || 
                (caregiverPaymentType === 'Hourly' && !caregiverHourlyRate) ||
                (caregiverPaymentType === 'Salary Base' && !caregiverSalaryAmount)}
            />
          </View>
        </View>
      </ThemedView>
    </GestureHandlerRootView>
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
    borderRadius: 10,
  },
  sliderWrapper: {
    width: '80%',
    borderRadius: 60,
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