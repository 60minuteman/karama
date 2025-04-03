import { useRouter } from 'expo-router';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/services/state/user';

export default function CaregiverNameScreen() {
  const router = useRouter();
  const { caregiverName, setCaregiverName,setOnboardingScreen } = useUserStore();
  const handleNext = () => {
    if (caregiverName?.trim()) {
      // Navigate to next screen in caregiver flow
      setOnboardingScreen('/(auth)/screens/onboarding/caregiver/dob')
      router.push('/(auth)/screens/onboarding/caregiver/dob'); // Update with actual next screen
      console.log(caregiverName)

    }
  };
useEffect(()=>{
  console.log(caregiverName)
},[caregiverName])
  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Header variant="back" />

        <View style={styles.content}>
          <View style={styles.spacer} />
          <ProgressBar progress={0.4} />
          
          <ThemedText style={[styles.title, { fontFamily: 'Bogart-Bold' }]}>
            What's your{'\n'}name?
          </ThemedText>

          <View style={styles.inputContainer}>
            <View style={[styles.inputBorder, (caregiverName?.trim() || '').length> 0 && styles.inputBorderActive]}>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor="#999"
                value={caregiverName || ''}
                onChangeText={setCaregiverName}
                autoFocus
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              label="Next"
              onPress={handleNext}
              variant={caregiverName?.trim() ? "primary" : undefined}
              disabled={!caregiverName?.trim()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  spacer: {
    height: 120,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 40,
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
    marginTop: 'auto',
    marginBottom: 20,
  },
});