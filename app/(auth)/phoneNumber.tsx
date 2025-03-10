import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function PhoneNumberScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleNext = () => {
    if (phoneNumber.length === 10) {
      router.push('/(auth)/verification');
    }
  };

  const handlePhoneNumberChange = (text: string) => {
    // Only allow digits
    const cleaned = text.replace(/\D/g, '');
    // Limit to 10 digits
    const truncated = cleaned.slice(0, 10);
    setPhoneNumber(truncated);
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='close' />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ThemedText style={[styles.title, { fontFamily: 'Bogart-Semibold' }]}>What's your phone number?</ThemedText>

        <View style={styles.inputWrapper}>
          <View
            style={[
              styles.inputContainer,
              phoneNumber.length > 0 && styles.inputActive,
            ]}
          >
            <ThemedText style={styles.countryCode}>+1</ThemedText>
            <TextInput
              style={styles.input}
              placeholder='(555) 555-5555'
              placeholderTextColor='#999'
              keyboardType='phone-pad'
              autoFocus
              value={phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
              onChangeText={handlePhoneNumberChange}
              accessibilityLabel='Phone number input'
              accessibilityHint='Enter your phone number'
            />
          </View>
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, !isChecked && styles.checkboxInactive]}
            onPress={() => setIsChecked(!isChecked)}
            accessibilityRole='checkbox'
            accessibilityState={{ checked: isChecked }}
          >
            {isChecked && <View style={styles.checkmark} />}
          </TouchableOpacity>
          <ThemedText style={styles.checkboxText}>
            I would like to receive updates and news from Karama
          </ThemedText>
        </View>

        <Button
          label='Next'
          onPress={handleNext}
          variant={phoneNumber.length === 10 ? 'primary' : 'disabled'}
          disabled={phoneNumber.length !== 10}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  closeIcon: {
    fontSize: 24,
    color: Colors.light.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  spacer: {
    height: 120,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 32,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 20,
    lineHeight: 36,
  },
  inputWrapper: {
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.primary,
  },
  countryCode: {
    fontFamily: 'Poppins',
    fontSize: 24,
    color: Colors.light.text,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 24,
    paddingVertical: 8,
    color: Colors.light.text,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.light.primary,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInactive: {
    backgroundColor: '#EEEEEE',
  },
  checkmark: {
    width: 12,
    height: 8,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.light.white,
    transform: [{ rotate: '-45deg' }],
  },
  checkboxText: {
    fontFamily: 'Poppins',
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
  },
  inputActive: {
    borderBottomColor: Colors.light.primary,
  },
});
