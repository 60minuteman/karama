import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { useUserStore } from '@/services/state/user';

export default function SpeakScreen() {
  const {caregiverLanguageMatch,setCaregiverLanguageMatch,setOnboardingScreen}=useUserStore()
  const router = useRouter();
  // const [preference, setPreference] = useState<string | null>(null);

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/position');
    router.push('/(auth)/screens/onboarding/caregiver/position');
  };

  const handlePillPress = (value: boolean) => {
    setCaregiverLanguageMatch(value);
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/position');
    router.push('/(auth)/screens/onboarding/caregiver/position');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.85} />
        
        <ThemedText style={styles.title}>
          Would you like to{'\n'}work with families{'\n'}that speak the same{'\n'}language(s) as{'\n'}yourself?
        </ThemedText>

        <View style={styles.optionsContainer}>
          <View style={styles.pillWrapper}>
            <Pill
              label="Yes, required"
              onPress={() => handlePillPress(true)}
              selected={caregiverLanguageMatch === true}
            />
          </View>
          <View style={styles.pillWrapper}>
            <Pill
              label="Not required"
              onPress={() => handlePillPress(false)}
              selected={caregiverLanguageMatch === false}
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Button
            label="Skip"
            onPress={handleNext}
            variant="skip"
            style={styles.skipButton}
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
  spacerTop: {
    height: 120,
  },
  title: {
    fontFamily: 'Bogart',
    fontSize: 32,
    lineHeight: 44,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '600',
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  pillWrapper: {
    alignSelf: 'flex-start',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
  },
  skipButton: {
    alignSelf: 'flex-start',
  },
}); 