import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { PetType, useUserStore } from '@/services/state/user';
import { Bogart_600SemiBold } from '@expo-google-fonts/bogart';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const PETS: { label: PetType; emoji: string }[] = [
  { label: '🐱 Cat', emoji: '🐱' },
  { label: '🐶 Small Dog', emoji: '🐶' },
  { label: '🐽 Pig', emoji: '🐽' },
  { label: '🐩 Large Dog', emoji: '🐩' },
  { label: '🐮 Cow', emoji: '🐮' },
  { label: '🦋 Butterfly', emoji: '🦋' },
  { label: '🐢 Turtle', emoji: '🐢' },
  { label: '🐍 Snake', emoji: '🐍' },
  { label: '🦜 Parrot', emoji: '🦜' },
  { label: '🐰 Rabbit', emoji: '🐰' },
  { label: '🐑 Sheep', emoji: '🐑' },
  { label: '🦆 Duck', emoji: '🦆' },
  { label: '🐎 Horse', emoji: '🐎' },
  { label: '🐸 Frog', emoji: '🐸' },
  { label: '🦎 Gecko', emoji: '🦎' },
  { label: '🐳 Whale', emoji: '🐳' },
  { label: '🐔 Chicken', emoji: '🐔' },
  { label: '🐹 Hamster', emoji: '🐹' },
  { label: '🦕 Dinosaur', emoji: '🦕' },
  { label: '🐘 Baby Elephant', emoji: '🐘' },
  { label: '🦄 Unicorn', emoji: '🦄' },
  // { label: '🐾 Other', emoji: '🐾' },
];

export default function Page() {
  const {
    caregiverPetExperience,
    setCaregiverPetExperience,
    setOnboardingScreen,
  } = useUserStore();
  // const [selectedPets, setSelectedPets] = useState<string[]>([]);
  console.log('caregiverPetExperience', caregiverPetExperience);

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/interest');
    router.push('/(auth)/screens/onboarding/caregiver/interest');
  };

  const togglePet = (pet: PetType) => {
    if (pet === 'Other') {
      setOnboardingScreen('/(auth)/screens/onboarding/family/otherPet');
      router.push('/(auth)/screens/onboarding/family/otherPet');
      return;
    }
    const prev = caregiverPetExperience ?? [];
    const filtered = prev.filter((p) => p !== 'None');

    if (prev.includes(pet)) {
      setCaregiverPetExperience(filtered.filter((p) => p !== pet));
    } else {
      // Only add if we haven't reached the limit of 10
      if (filtered.length < 6) {
        setCaregiverPetExperience([...filtered, pet]);
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.headerContent}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.65} />

        <ThemedText style={styles.title}>
          What pets can you{'\n'}work with?
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          You can choose up to 6 options
        </ThemedText>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.petsContainer}>
          {PETS.map((pet) => (
            <Pill
              key={pet.label}
              label={`${pet.label}`}
              onPress={() => togglePet(pet.label)}
              selected={caregiverPetExperience?.includes(pet.label)}
              disabled={
                pet.label !== 'None' && caregiverPetExperience?.includes('None')
              }
            />
          ))}
        </View>
        <View style={styles.scrollEndSpacer} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', Colors.light.background]}
          style={styles.buttonGradient}
          pointerEvents='none'
        />
        <View style={styles.bottomNav}>
          <Button label='Skip' onPress={handleNext} variant='skip' />
          <Button
            // label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={caregiverPetExperience?.length === 0}
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
  headerContent: {
    paddingHorizontal: 20,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
  },
  spacerTop: {
    height: 120,
  },
  title: {
    fontSize: 32,
    lineHeight: 44,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    color: Colors.light.text,
    // marginBottom: 20,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    marginBottom: 24,
    marginTop: 24,
  },
  petsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 40,
  },
  scrollEndSpacer: {
    height: 100,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  bottomNav: {
    marginBottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
