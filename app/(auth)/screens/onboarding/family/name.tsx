import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
export default function FamilyNameScreen() {
  const router = useRouter();
  const { familyName, setFamilyName, setOnboardingScreen } = useUserStore();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleNext = () => {
    if (familyName?.trim()) {
      setOnboardingScreen('/(auth)/screens/onboarding/family/description');
      router.push('/(auth)/screens/onboarding/family/description');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          <View style={styles.spacer} />
          <ProgressBar progress={0.4} />

          <ThemedText style={styles.title}>
            What's your family's{'\n'}name?
          </ThemedText>

          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputBorder,
                (familyName?.trim() || '').length > 0 &&
                  styles.inputBorderActive,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder='Family name'
                placeholderTextColor='#999'
                value={familyName || ''}
                onChangeText={setFamilyName}
                autoFocus
                autoCapitalize='words'
              />
            </View>
          </View>

          {!keyboardVisible ? (
            <View style={styles.buttonContainer}>
              <Button
                label='Next'
                onPress={handleNext}
                variant={familyName?.trim() ? 'primary' : undefined}
                disabled={!familyName?.trim()}
              />
            </View>
          ) : (
            <View style={styles.buttonContainerKeyboard}>
              <Button
                label='Next'
                onPress={handleNext}
                variant={familyName?.trim() ? 'primary' : undefined}
                disabled={!familyName?.trim()}
              />
            </View>
          )}
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
    fontFamily: 'Bogart-Bold',
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
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  buttonContainerKeyboard: {
    paddingHorizontal: 20,
    marginTop: 'auto',
    paddingBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});
