import React, { useState } from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';

export default function Page() {
  const [date, setDate] = useState('');

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

    setDate(formatted);
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
          <ProgressBar progress={0.2} />

          <ThemedText style={styles.title}>
            What is your date of{'\n'}birth?
          </ThemedText>

          <View style={[styles.inputContainer, date.length > 0 && styles.inputContainerActive]}>
            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#999"
              value={date}
              onChangeText={handleDateChange}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
        </View>

        <View style={styles.bottomNav}>
          <Button
            label="Next"
            onPress={() => router.push('/(auth)/screens/onboarding/caregiver/gender')}
            variant={date.length === 10 ? "primary" : "disabled"}
            disabled={date.length !== 10}
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
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
    fontSize: 24,
    color: Colors.light.text,
    paddingVertical: 8,
  },
  bottomNav: {
    padding: 20,
    paddingBottom: 40,
  },
});
