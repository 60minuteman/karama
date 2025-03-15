import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
// import { Bogart_400Regular, Bogart_500Medium } from '@expo-google-fonts/bogart';
import { useUserStore } from '@/services/state/user';

export default function Page() {
  const { caregiverDob, setCaregiverDob, setOnboardingScreen } = useUserStore();
  const [fontsLoaded] = useFonts({
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
  });
  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/gender');
    router.push('/(auth)/screens/onboarding/caregiver/gender');
  };
  const handleDateChange = (text: string) => {
    // Format input as MM/DD/YYYY
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.length >= 2) {
      formatted = cleaned.slice(0, 2) + (cleaned.length > 2 ? '/' + cleaned.slice(2) : '');
    }
    if (cleaned.length >= 4) {
      formatted = formatted.slice(0, 5) + (cleaned.length > 4 ? '/' + cleaned.slice(4, 8) : '');
    }

    setCaregiverDob(formatted);
  };
  useEffect(() => {
    console.log(caregiverDob)
  }, [caregiverDob])
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <ThemedView style={styles.container}>
        <Header variant="back" />

        <View style={styles.content}>
          <View style={styles.spacerTop} />
          <ProgressBar progress={0.2} />

          <ThemedText style={[styles.title, { fontFamily: 'Bogart-Bold' }]}>
            What is your date of{'\n'}birth?
          </ThemedText>

          <View style={[styles.inputContainer, (caregiverDob?.trim() || '').length > 0 && styles.inputContainerActive]}>
            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#999"
              value={caregiverDob || ''}
              onChangeText={handleDateChange}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
        </View>

        <View style={styles.bottomNav}>
          <Button
            label="Next"
            onPress={handleNext}
            variant={caregiverDob?.length === 10 ? "primary" : undefined}
            disabled={caregiverDob?.length !== 10}
          />
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
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
  title: {
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
  },
  inputContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
    marginBottom: 40,
  },
  inputContainerActive: {
    borderBottomColor: Colors.light.primary,
  },
  input: {
    fontSize: 24,
    color: Colors.light.text,
    paddingVertical: 8,
  },
  bottomNav: {
    padding: 20,
    paddingBottom: 40,
  },
});
