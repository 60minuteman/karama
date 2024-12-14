import { useRouter } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';

export default function OTPInputScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(50);
  const [canResend, setCanResend] = useState(false);
  const inputRef = useRef<TextInput>(null);

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

  const handleResend = () => {
    if (canResend) {
      setTimeLeft(50);
      setCanResend(false);
      // Add your resend logic here
    }
  };

  const handleCodeChange = (text: string) => {
    // Only allow numbers and limit to 6 digits
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 6);
    setCode(cleaned);
    
    // When 6 digits are entered, navigate to bridge screen
    if (cleaned.length === 6) {
      router.push('/bridge');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <ThemedText style={styles.title} type="title">
          Enter code sent to{'\n'}your phone number
        </ThemedText>

        <View style={styles.codeContainer}>
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={code}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
          />
          {[...Array(6)].map((_, index) => (
            <View key={index} style={styles.codeInputContainer}>
              <ThemedText style={styles.codeInput}>
                {code[index]}
              </ThemedText>
              <View style={[
                styles.codeLine,
                code[index] ? styles.codeLineFilled : null,
                index === code.length ? styles.codeLineActive : null
              ]} />
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={handleResend}>
          <ThemedText style={styles.resendText}>
            Didn't receive a code? {canResend ? (
              <ThemedText style={styles.resendActive}>Resend</ThemedText>
            ) : (
              `Resend (${timeLeft}s)`
            )}
          </ThemedText>
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
    fontFamily: 'Poppins',
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
  }
});