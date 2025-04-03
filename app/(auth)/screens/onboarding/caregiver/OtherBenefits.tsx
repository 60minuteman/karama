import React, { useState } from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { useUserStore } from '@/services/state/user';

export default function OtherBenefits() {
  const router = useRouter();
  const [benefit, setBenefit] = useState('');
  const { 
    caregiverRequiredBenefits, 
    setCaregiverRequiredBenefits,
    setOnboardingScreen 
  } = useUserStore();

  const handleAdd = () => {
    if (benefit.trim()) {
      const updatedBenefits = [...(caregiverRequiredBenefits || []), benefit.trim()];
      setCaregiverRequiredBenefits(updatedBenefits);
      setOnboardingScreen('/(auth)/screens/onboarding/caregiver/PastPosition');
      router.push('/(auth)/screens/onboarding/caregiver/PastPosition');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <ThemedView style={styles.container}>
        <Header variant="back" />
        
        <View style={styles.content}>
          <View style={styles.spacerTop} />
          <ProgressBar progress={0.85} />

          <ThemedText style={styles.title}>
            Add other benefits{'\n'}you require
          </ThemedText>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type here"
              placeholderTextColor="#999"
              value={benefit}
              onChangeText={setBenefit}
              autoFocus
              multiline
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              label="Add"
              onPress={handleAdd}
              variant="compact"
              disabled={!benefit.trim()}
            />
          </View>
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
    lineHeight: 42,
    fontFamily: 'Bogart',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 40,
    marginTop: 20,
  },
  inputContainer: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.primary,
    marginBottom: 40,
  },
  input: {
    fontFamily: 'Poppins',
    fontSize: 24,
    color: Colors.light.text,
    paddingVertical: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
}); 