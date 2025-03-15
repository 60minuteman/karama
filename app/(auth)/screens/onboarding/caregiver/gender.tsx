import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { useFonts } from 'expo-font';
import { Bogart_400Regular, Bogart_500Medium, Bogart_600SemiBold } from '@expo-google-fonts/bogart';
import { useUserStore } from '@/services/state/user';

const genderOptions = [
  ['Cisgender Female', 'Non Binary'],
  ['Gender Neutral', 'Gender Queer'],
  ['Transgender', 'Male'],
  ['Female', 'Prefer not to say'],
  ['Cisgender Male', 'Gender Fluid'],
  ['Other']
] as const;

export default function Page() {
  const { caregiverGender, setCaregiverGender, setOnboardingScreen } = useUserStore()
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [fontsLoaded] = useFonts({
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
  });
  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/pronouns');
    router.push('/(auth)/screens/onboarding/caregiver/pronouns')
  };
  useEffect(()=>{
    console.log(caregiverGender)
  },[caregiverGender]);
  return (
    <ThemedView style={styles.container}>
      <Header variant="back" style={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={[styles.title, { fontFamily: 'Bogart-Bold' }]}>
          What best describes{'\n'}your gender?
        </ThemedText>

        <View style={styles.optionsContainer}>
          {genderOptions.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((option) => (
                <Pill
                  key={option}
                  label={option}
                  onPress={() => setCaregiverGender(option)}
                  selected={caregiverGender === option}
                  variant={caregiverGender === option ? 'highlighted' : undefined}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Button
          label="Skip"
          onPress={handleNext}
          variant="skip"
        />
        <Button
          label="Next"
          onPress={handleNext}
          variant="compact"
          disabled={!caregiverGender}
        />
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
    fontSize: 32,
    lineHeight: 44,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 40,
    marginTop: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-start',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  }
}); 