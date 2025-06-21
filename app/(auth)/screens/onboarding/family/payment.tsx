import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type PaymentType = 'Hourly' | 'Salary Base';

export default function PaymentScreen() {
  const router = useRouter();
  const { family_payment, setFamilyPayment, setOnboardingScreen } =
    useUserStore();
  const { selected_type, hourly_rate, salary_amount, has_interacted } =
    family_payment;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  console.log('family_payment', family_payment);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (selected_type === 'Hourly' && !hourly_rate) {
      setFamilyPayment({ hourly_rate: [20, 30] }); // Default range
    }
  }, [selected_type]);

  const sliderValues =
    hourly_rate && Array.isArray(hourly_rate) ? hourly_rate : [20, 30];

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
            ? Array.isArray(hourly_rate)
              ? hourly_rate[0]
              : hourly_rate
            : parseInt(salary_amount.replace(/,/g, '')),
      },
    });
  };

  const handleSliderChange = (values: number[]) => {
    setFamilyPayment({
      hourly_rate: values,
      has_interacted: true,
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <Header variant='back' />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 10}
        >
          <View style={styles.spacerTop} />
          <ProgressBar progress={0.95} />

          <View style={styles.mainContent}>
            <ThemedText
              style={[styles.title, { fontFamily: 'Bogart-Semibold' }]}
            >
              How do you plan to{'\n'}pay your caregiver?
            </ThemedText>

            <View style={styles.optionsContainer}>
              {paymentOptions.map((option) => (
                <Pill
                  key={option.label}
                  label={`${option.icon} ${option.label}`}
                  selected={selected_type === option.label}
                  onPress={() =>
                    setFamilyPayment({ selected_type: option.label })
                  }
                />
              ))}
            </View>

            {selected_type === 'Hourly' && (
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

          <View
            style={[
              styles.buttonContainer,
              isKeyboardVisible ? { marginBottom: 10 } : { marginBottom: 50 },
            ]}
          >
            <Button
              label='Next'
              onPress={handleNext}
              variant='compact'
              disabled={!selected_type}
            />
          </View>
        </KeyboardAvoidingView>
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    alignSelf: 'flex-end',
  },
});
