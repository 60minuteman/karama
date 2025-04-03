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
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

const CreatePassword = () => {
  const [password, setPassword] = useState<string>('');
  const { phoneNumber, isChecked } = useLocalSearchParams();
  const { setToken, setUser, setOnboardingScreen } = useUserStore();

  const createPassword = useMutation({
    mutationFn: async (data: any) => {
      return customAxios.post(`/auth/phone/signup/complete`, data);
    },
    onSuccess: async (response: any) => {
      try {
        console.log('Password creation response:', response?.data);

        if (response?.data?.data?.token) {
          const newToken = response.data.data.token;
          const userData = response.data.data.user;

          // Save token
          await AsyncStorage.setItem('userToken', newToken);
          customAxios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${newToken}`;

          // Update user store with token and user data
          setOnboardingScreen('create password');
          setToken(newToken);
          setUser(userData);

          // Navigate to bridge screen
          router.replace('/(auth)/bridge');
        } else {
          throw new Error('No token received');
        }
      } catch (error) {
        console.error('Error in password creation:', error);
        Toast.show({
          type: 'error',
          text1: 'Error creating password',
          text2:
            error instanceof Error ? error.message : 'Unknown error occurred',
        });
      }
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
        password: password.trim(),
        subscribed_to_promotions: isChecked === '1' ? true : false,
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
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ThemedText style={[styles.title, { fontFamily: 'Bogart-Semibold' }]}>
          Create Password
        </ThemedText>

        <PasswordInput
          password={password}
          onChangePassword={setPassword}
          autoFocus
        />

        <Button
          label='Next'
          onPress={handleCreatePassword}
          variant={password?.length >= 8 ? 'primary' : 'disabled'}
          disabled={password.length < 8}
          loading={createPassword.isPending}
        />
      </View>
    </ThemedView>
  );
};

export default CreatePassword;

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
