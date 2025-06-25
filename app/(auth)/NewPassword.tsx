import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { TextInput } from '@/components/ui/TextInput';
import { Colors } from '@/constants/Colors';
import customAxios from '@/services/api/envConfig';
import { useUserStore } from '@/services/state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const NewPassword = () => {
  const [password, setPassword] = useState<string>('');
  const { phoneNumber, isChecked } = useLocalSearchParams();
  const { setToken, setUser, setOnboardingScreen } = useUserStore();

  const createPassword = useMutation({
    mutationFn: async (data: any) => {
      return customAxios.post(`/auth/password/forgot-password/update`, data);
    },
    onSuccess: async (response: any) => {
      Toast.show({
        type: 'success',
        text1: 'Password updated successfully',
        text2: '',
      });
      router.push('/(auth)/signInPhone');
    },
    onError: (error: any) => {
      console.error('Password creation error:', error?.response?.data);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error?.response?.data?.message || 'Please try again',
      });
    },
  });

  function containsUppercaseAndNumber(str: string) {
    const hasUpperCase = /[A-Z]/.test(str);
    const hasNumber = /\d/.test(str);
    const hasNoSpaces = !/\s/.test(str);
    const hasMinLength = str.length >= 8;
    return hasUpperCase && hasNumber && hasNoSpaces && hasMinLength;
  }

  const handleCreatePassword = () => {
    if (containsUppercaseAndNumber(password)) {
      createPassword.mutate({
        phone_number: `+1${phoneNumber}`,
        new_password: password.trim(),
        // subscribed_to_promotions: isChecked === '1' ? true : false,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Password Requirements:',
        text2:
          '• Minimum 8 characters\n• At least 1 uppercase letter\n• At least 1 number\n• No spaces',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.container}>
          <Header variant='back' />

          <View style={styles.content}>
            <View style={styles.spacer} />
            <ThemedText
              style={[styles.title, { fontFamily: 'Bogart-Semibold' }]}
            >
              Create new password
            </ThemedText>

            <PasswordInput
              password={password}
              onChangePassword={setPassword}
              autoFocus
            />

            <Button
              label='Next'
              onPress={handleCreatePassword}
              variant={password?.length >= 8 ? 'primary' : 'compact'}
              disabled={password.length < 8}
              loading={createPassword.isPending}
            />
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
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
    lineHeight: 37,
  },
});
