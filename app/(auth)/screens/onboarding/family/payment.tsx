import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Slider } from '@/components/ui/Slider';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type PaymentType = 'Hourly' | 'Salary Base';

export default function PaymentScreen() {
  const router = useRouter();
  const { family_payment, setFamilyPayment, setOnboardingScreen } =
    useUserStore();
  const { selected_type, hourly_rate, salary_amount, has_interacted } =
    family_payment;

  const paymentOptions: Array<{ label: PaymentType; icon: string }> = [
    { label: 'Hourly', icon: '🤑' },
    { label: 'Salary Base', icon: '💰' },
  ];

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/PaymentMethod');
    router.push({
      pathname: '/(auth)/screens/onboarding/family/PaymentMethod',
      params: {
        type: selected_type,
        rate:
          selected_type === 'Hourly'
            ? hourly_rate
            : parseInt(salary_amount.replace(/,/g, '')),
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.95} />

        <View style={styles.mainContent}>
          <ThemedText style={[styles.title, { fontFamily: 'Bogart-Semibold' }]}>
            How do you plan to{'\n'}pay your caregiver?
          </ThemedText>

          <View style={styles.optionsContainer}>
            {paymentOptions.map((option) => (
              <Pill
                key={option.label}
                label={option.label}
                icon={option.icon}
                selected={selected_type === option.label}
                onPress={() =>
                  setFamilyPayment({ selected_type: option.label })
                }
              />
            ))}
          </View>

          {selected_type === 'Hourly' && (
            <>
              <View style={styles.inputContainer}>
                <View style={styles.sliderContainer}>
                  <View style={styles.sliderWrapper}>
                    <Slider
                      min={15}
                      max={45}
                      value={hourly_rate}
                      onValueChange={(value) => {
                        setFamilyPayment({
                          hourly_rate: value,
                          has_interacted: true,
                        });
                      }}
                    />
                  </View>
                </View>
                <View
                  style={[
                    styles.inputBorder,
                    hourly_rate > 0 && styles.inputBorderActive,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder='$20-$30/hr'
                    placeholderTextColor='#999'
                    value={has_interacted ? hourly_rate.toString() : ''}
                    onChangeText={(text) => {
                      setFamilyPayment({
                        hourly_rate: Number(text),
                        has_interacted: true,
                      });
                    }}
                    keyboardType='numeric'
                    maxLength={3}
                  />
                </View>
              </View>
            </>
          )}

          {selected_type === 'Salary Base' && (
            <View style={styles.inputContainer}>
              <View
                style={[
                  styles.inputBorder,
                  salary_amount.length > 0 && styles.inputBorderActive,
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder='50,000'
                  placeholderTextColor='#999'
                  value={salary_amount}
                  onChangeText={(text) =>
                    setFamilyPayment({ salary_amount: text })
                  }
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
            disabled={!selected_type}
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
    fontFamily: 'Poppins',
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
    justifyContent: 'flex-end',
  },
  button: {
    alignSelf: 'flex-end',
  },
});
