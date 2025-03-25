import { useAuth } from '@/app/store/auth';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Colors } from '@/constants/Colors';
import customAxios from '@/services/api/envConfig';
import { useUserStore } from '@/services/state/user';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useReducer, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
  }
};

const initialState = {
  phoneNumber: '',
};

export default function PhoneNumberScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    subscribed_to_promotions,
    setPromotionSubscription,
    setUser,
    setToken,
  } = useUserStore();
  const { signIn: authSignIn } = useAuth();

  console.log('phoneNumber', phoneNumber);

  const signIn = useMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/auth/phone/signin/complete`, data);
    },
    onSuccess: async (data: any) => {
      console.log(data.data);

      // Store the auth token in user store
      setToken(data?.data?.data?.token);

      // Store user data in user store
      setUser(data?.data?.data?.user);

      // Update promotion subscription if needed
      if (isChecked) {
        setPromotionSubscription(true);
      }

      router.push({
        pathname: '/(tabs)/discover',
        params: {
          isChecked: isChecked ? '1' : '0',
          phoneNumber: phoneNumber,
        },
      });
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

  const formatPhoneNumber = (number: string) => {
    // Ensure number starts with +1 and remove any non-digit characters
    const cleaned = number.replace(/\D/g, '');
    return `+1${cleaned}`;
  };

  const handleSignIn = () => {
    if (phoneNumber.length === 10) {
      const formattedNumber = formatPhoneNumber(phoneNumber);
      signIn.mutate({
        phone_number: formattedNumber,
        password: password,
      });
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
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ThemedText style={styles.helloText}> 😇 Hello there</ThemedText>
        <ThemedText style={[styles.title, { fontFamily: 'Bogart-Semibold' }]}>
          Welcome back
        </ThemedText>

        <View style={styles.inputWrapper}>
          <View
            style={[
              styles.inputContainer,
              phoneNumber.length > 0 && styles.inputActive,
            ]}
          >
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#999',
                }}
              >
                <ThemedText style={styles.countryCode}>+1</ThemedText>
                <TextInput
                  style={[styles.input, { marginTop: 0 }]}
                  placeholder='Phone no'
                  placeholderTextColor='#999'
                  keyboardType='phone-pad'
                  autoFocus
                  value={phoneNumber.replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    '($1) $2-$3'
                  )}
                  onChangeText={handlePhoneNumberChange}
                  accessibilityLabel='Phone number input'
                  accessibilityHint='Enter your phone number'
                  textContentType='telephoneNumber'
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: '#999',
                }}
              >
                <TextInput
                  style={[styles.input, { marginTop: 0, flex: 1 }]}
                  placeholder='Password'
                  placeholderTextColor='#999'
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={!showPassword}
                  accessibilityLabel='Password input'
                  accessibilityHint='Enter your password'
                  textContentType='password'
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color={Colors.light.text}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <ThemedText style={styles.redText}>Forgot Password ?</ThemedText>
          <Button
            label='Login'
            onPress={handleSignIn}
            variant={
              phoneNumber.length === 10 && password.length > 0
                ? 'primary'
                : 'disabled'
            }
            disabled={phoneNumber.length !== 10 || password.length === 0}
            loading={signIn.isPending}
          />
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => router.push('/phoneNumber')}
          >
            <ThemedText style={styles.greyText}>
              Don't have an account?{' '}
            </ThemedText>
            <ThemedText style={styles.redText}>Sign up</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
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
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 36,
  },
  inputWrapper: {
    marginBottom: 40,
  },
  inputContainer: {
    gap: 40,
  },
  countryCode: {
    fontFamily: 'Poppins',
    fontSize: 24,
    color: Colors.light.text,
    marginRight: 8,
    lineHeight: 32,
  },
  input: {
    fontFamily: 'Poppins',
    fontSize: 24,
    paddingVertical: 8,
    color: Colors.light.text,
  },
  inputActive: {
    borderBottomColor: Colors.light.primary,
  },
  bottomContainer: {
    alignItems: 'center',
    gap: 24,
  },
  redText: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 18,
    color: '#EB4430',
    fontFamily: 'Poppins',
  },
  greyText: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 18,
    color: '#261D2A80',
    fontFamily: 'Poppins',
  },
  helloText: {
    fontWeight: 400,
    fontSize: 15,
    lineHeight: 19,
    color: '#052222',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
