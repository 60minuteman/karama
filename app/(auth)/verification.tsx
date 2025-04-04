import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/ui/Header';
import { Colors } from '@/constants/Colors';
import customAxios from '@/services/api/envConfig';
import { useUserStore } from '@/services/state/user';
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/app/store/auth';

export default function OTPInputScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(50);
  const [canResend, setCanResend] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const { phoneNumber, isChecked } = useLocalSearchParams();
  const [user, setUser] = useState<any>(null);
  const { setUser: setUserStore, setOnboardingScreen, setToken } = useUserStore();
  const { signIn: authSignIn } = useAuth();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  const phoneVerification = useMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/auth/phone/start-verification`, data);
    },
    onSuccess: async (data: any) => {
      console.log('OTP resent successfully');
    },
    onError: (error: any) => {
      console.log('error', error['response'].data);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error['response'].data?.message,
      });
    },
  });

  const handleResend = async () => {
    if (canResend) {
      // const  user = await signUp(`karama${phoneNumber}@mail.com`, `karama${phoneNumber}@mail.com`, 'karama')

      phoneVerification.mutate({
        phone_number: `+1${phoneNumber}`,
      });
      setTimeLeft(50);
      setCanResend(false);
      // Add your resend logic here
    }
  };

  const verify = useMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/auth/phone/confirm-otp`, data);
    },
    onSuccess: async (response: any) => {
      try {
        console.log('Full verification response:', JSON.stringify(response?.data, null, 2));
        
        if (response?.data?.success) {
          // Store phone number in user store
          setUserStore({ phone_number: `+1${phoneNumber}` });
          
          // Navigate to createPassword screen with params
          router.push({
            pathname: '/(auth)/createPassword',
            params: {
              isChecked: isChecked ? '1' : '0',
              phoneNumber: phoneNumber,
            },
          });
        } else {
          throw new Error('Verification failed');
        }
      } catch (error) {
        console.error('Error in verification:', error);
        Toast.show({
          type: 'error',
          text1: 'Error in verification',
          text2: error instanceof Error ? error.message : 'Unknown error occurred',
        });
      }
    },
    onError: (error: any) => {
      console.error('Verification error:', error?.response?.data);
      Toast.show({
        type: 'error',
        text1: 'Verification failed',
        text2: error?.response?.data?.message || 'Please try again',
      });
    },
  });

  const handleCodeChange = (text: string) => {
    // Only allow numbers and limit to 6 digits
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 6);
    setCode(cleaned);

    // When 6 digits are entered, verify the code
    if (cleaned.length === 6) {
      verify.mutate({
        phone_number: `+1${phoneNumber}`,
        code: cleaned,
      });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <ThemedText style={styles.title} type='title'>
          Enter code sent to{'\n'}your phone number
        </ThemedText>

        <View style={styles.codeContainer}>
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={code}
            onChangeText={handleCodeChange}
            keyboardType='number-pad'
            maxLength={6}
            autoFocus
          />
          {[...Array(6)].map((_, index) => (
            <View key={index} style={styles.codeInputContainer}>
              <ThemedText style={styles.codeInput}>{code[index]}</ThemedText>
              <View
                style={[
                  styles.codeLine,
                  code[index] ? styles.codeLineFilled : null,
                  index === code.length ? styles.codeLineActive : null,
                ]}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={handleResend} disabled={verify.isPending}>
          {verify.isPending ? (
            <ActivityIndicator color={Colors.light.primary} />
          ) : (
            <ThemedText style={styles.resendText}>
              Didn't receive a code?{' '}
              {canResend ? (
                <ThemedText style={styles.resendActive}>Resend</ThemedText>
              ) : (
                `Resend (${timeLeft}s)`
              )}
            </ThemedText>
          )}
        </TouchableOpacity>
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
    paddingTop: 120,
  },
  title: {
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 20,
    position: 'relative',
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  codeInputContainer: {
    alignItems: 'center',
    width: 40,
  },
  codeInput: {
    fontFamily: 'Poppins',
    fontSize: 32,
    lineHeight: 36,
    color: Colors.light.text,
    marginBottom: 4,
    height: 40,
  },
  codeLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E5E5',
  },
  codeLineFilled: {
    backgroundColor: Colors.light.text,
  },
  codeLineActive: {
    backgroundColor: Colors.light.primary,
  },
  resendText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  resendActive: {
    color: Colors.light.primary,
  },
});
