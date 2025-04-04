import { useRouter } from 'expo-router';
import { StyleSheet, View, TextInput, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { useFonts } from 'expo-font';
// import { Bogart_600SemiBold } from '@expo-google-fonts/bogart';
import { useUserStore } from '@/services/state/user';

export default function ZipCodeScreen() {
  const router = useRouter();
  // const [zipCode, setZipCode] = useState('');
  const {caregiverLocation,setCaregiverLocation,setOnboardingScreen}=useUserStore()
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [fontsLoaded] = useFonts({
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
  });

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handleZipCodeChange = (text: string) => {
    // Only allow numbers and limit to 5 digits
    const cleaned = text.replace(/[^0-9]/g, '');
    setCaregiverLocation(cleaned.slice(0, 5));
  };

  const handleNext = () => {
    if (caregiverLocation?.length === 5) {
      setOnboardingScreen('/(auth)/screens/onboarding/caregiver/type')
      router.push('/(auth)/screens/onboarding/caregiver/type');
    }
  };

  return (
    <ThemedView style={styles.container}>
        <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />
      
      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.9} />
        
        <ThemedText style={styles.title}>
          What's your{'\n'}zip code?
        </ThemedText>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter zip code"
            placeholderTextColor="#666"
            value={caregiverLocation || ''}
            onChangeText={handleZipCodeChange}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>

        <View style={[
          styles.buttonContainer,
          keyboardHeight > 0 && {
            bottom: keyboardHeight + 20,
          }
        ]}>
          <Button
            label="Next"
            onPress={handleNext}
            variant="compact"
            disabled={caregiverLocation?.length !== 5}
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
    fontFamily: 'Bogart',
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