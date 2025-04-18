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

export default function MoreInfo() {
  const router = useRouter();
  const {caregiverMoreInfo,setCaregiverMoreInfo,setOnboardingScreen}=useUserStore()
  const [answer, setAnswer] = useState('');

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/upload');
    router.push('/(auth)/screens/onboarding/caregiver/upload');
  };

  return (
    <KeyboardAvoidingView 
      style={{flex: 1}} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ThemedView style={styles.container}>
        <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />
        
        <View style={styles.content}>
          <View style={styles.spacerTop} />
          <ProgressBar progress={0.9} />

          <ThemedText style={styles.title}>
            Is there anything{'\n'}else you'd like{'\n'}caregivers to know?
          </ThemedText>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Write your answer here..."
              placeholderTextColor="#A8A3A5"
              value={caregiverMoreInfo}
              onChangeText={setCaregiverMoreInfo}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.bottomNav}>
          <Button
            label="Skip"
            onPress={() => router.back()}
            variant="skip"
          />
          <Button
            label="Next"
            onPress={handleNext}
            variant="compact"
          />
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
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
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart',
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 24,
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#F4F2ED',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    maxHeight: 200,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
    padding: 0,
    textAlignVertical: 'top',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 20,
  }
});
