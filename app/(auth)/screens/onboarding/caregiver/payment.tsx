import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type PaymentType = 'Hourly' | 'Salary Base';

interface CustomThumbProps {
  value: number;
}

const CustomThumb: React.FC<CustomThumbProps> = ({ value }) => (
  <View style={styles.thumbContainer}>
    <View style={styles.thumbValueContainer}>
      <ThemedText style={styles.thumbValue}>${value.toString()}</ThemedText>
    </View>
    <View style={styles.thumb} />
  </View>
);

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
    setCaregiverPaymentType,
  } = useUserStore();

  console.log('caregiverHourlyRate', caregiverHourlyRate);

  // Initialize hourly rate range if not set
  useEffect(() => {
    if (caregiverPaymentType === 'Hourly' && !caregiverHourlyRate) {
      setCaregiverHourlyRate([20, 30]); // Default range
    }
  }, [caregiverPaymentType]);

  // Ensure we have valid values for the slider
  const sliderValues =
    caregiverHourlyRate && Array.isArray(caregiverHourlyRate)
      ? caregiverHourlyRate
      : [20, 30];

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
        rate:
          caregiverPaymentType === 'Hourly'
            ? caregiverHourlyRate?.[0] || 0
            : parseInt(caregiverSalaryAmount?.replace(/,/g, '') || '0'),
        minRate: caregiverHourlyRate?.[0],
        maxRate: caregiverHourlyRate?.[1],
      },
    });
  };

  const handleSliderChange = (values: number[]) => {
    setHasInteracted(true);
    setCaregiverHourlyRate(values);
  };

  const handleTextInputChange = (text: string) => {
    const numValue = parseInt(text) || 0;
    if (numValue >= 15 && numValue <= 45) {
      setHasInteracted(true);
      setCaregiverHourlyRate([numValue, numValue]);
    }
  };

  console.log(
    'caregiver salary',
    typeof Number(caregiverSalaryAmount),
    caregiverHourlyRate
  );

  const handleSalaryChange = (text: string) => {
    // Only allow numbers and commas
    const cleanText = text.replace(/[^0-9,]/g, '');
    // Format with commas
    const formattedText = cleanText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setCaregiverSalaryAmount(formattedText);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <Header variant='back' />

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
                <View style={styles.sliderContainer}>
                  <View style={styles.sliderLabels}>
                    <ThemedText>$15</ThemedText>
                    <ThemedText>$20</ThemedText>
                    <ThemedText>$25</ThemedText>
                    <ThemedText>$30</ThemedText>
                    <ThemedText>$35</ThemedText>
                    <ThemedText>$40</ThemedText>
                    <ThemedText>$45+</ThemedText>
                  </View>
                  <MultiSlider
                    values={sliderValues}
                    min={15}
                    max={45}
                    step={1}
                    sliderLength={318}
                    selectedStyle={{
                      backgroundColor: Colors.light.primary,
                    }}
                    unselectedStyle={{
                      backgroundColor: '#E8E8E8',
                    }}
                    containerStyle={{
                      height: 40,
                    }}
                    trackStyle={{
                      height: 4,
                    }}
                    markerStyle={{
                      backgroundColor: Colors.light.primary,
                      height: 20,
                      width: 20,
                    }}
                    onValuesChange={handleSliderChange}
                  />
                </View>
              </View>
            )}

            {caregiverPaymentType === 'Salary Base' && (
              <View style={styles.inputContainer}>
                <View
                  style={[
                    styles.inputBorder,
                    (caregiverSalaryAmount?.length || 0) > 0 &&
                      styles.inputBorderActive,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder='50,000'
                    placeholderTextColor='#999'
                    value={caregiverSalaryAmount || ''}
                    onChangeText={handleSalaryChange}
                    keyboardType='numeric'
                    autoFocus
                    maxLength={7}
                  />
                </View>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              label='Next'
              onPress={handleNext}
              variant='compact'
              disabled={
                !caregiverPaymentType ||
                (caregiverPaymentType === 'Hourly' &&
                  (!caregiverHourlyRate?.[0] || !caregiverHourlyRate?.[1])) ||
                (caregiverPaymentType === 'Salary Base' &&
                  !caregiverSalaryAmount)
              }
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
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 32,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  sliderContainer: {
    marginTop: 40,
    paddingHorizontal: 10,
    position: 'relative',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: '100%',
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
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: 20,
  },
  thumbContainer: {
    alignItems: 'center',
  },
  thumbValueContainer: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  thumbValue: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
  },
});
