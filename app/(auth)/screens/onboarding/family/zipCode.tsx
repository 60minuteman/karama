import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';

export default function ZipCodeScreen() {
  const router = useRouter();
  const {
    family_zipcode,
    setFamilyZipcode,
    family_keyboard_height,
    setFamilyKeyboardHeight,
    setOnboardingScreen,
  } = useUserStore();
  const [zipCode, setZipCode] = useState(family_zipcode);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', (e) => {
      setFamilyKeyboardHeight(e.endCoordinates.height);
    });

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      setFamilyKeyboardHeight(0);
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handleZipCodeChange = (text: string) => {
    // Only allow numbers and limit to 5 digits
    const cleaned = text.replace(/[^0-9]/g, '');
    const newZipCode = cleaned.slice(0, 5);
    setZipCode(newZipCode);
    setFamilyZipcode(newZipCode);
  };

  const handleNext = () => {
    if (zipCode.length === 5) {
      setOnboardingScreen('/(auth)/screens/onboarding/family/language');
      router.push('/(auth)/screens/onboarding/family/language');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.9} />

        <ThemedText style={styles.title}>What's your{'\n'}zip code?</ThemedText>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Enter zip code'
            placeholderTextColor='#666'
            value={zipCode}
            onChangeText={handleZipCodeChange}
            keyboardType='numeric'
            maxLength={5}
          />
        </View>

        <View
          style={[
            styles.buttonContainer,
            family_keyboard_height > 0 && {
              bottom: family_keyboard_height + 20,
            },
          ]}
        >
          <Button
            label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={zipCode.length !== 5}
          />
        </View>
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
    fontWeight: undefined,
    marginTop: 20,
  },
  inputContainer: {
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
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
