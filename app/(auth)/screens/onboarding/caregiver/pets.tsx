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

const PETS = [
  { label: '🐱 Cat' as const },
  { label: '🐶 Small Dog' as const },
  { label: '🐷 Pig' as const },
  { label: '🦮 Large Dog' as const },
  { label: '🐮 Cow' as const },
  { label: '🦋 Butterfly' as const },
  { label: '🐢 Turtle' as const },
  { label: '🐍 Snake' as const },
  { label: '🦜 Parrot' as const },
  { label: '🐰 Rabbit' as const },
  { label: '🐑 Sheep' as const },
  { label: '🦆 Duck' as const },
  { label: '🐎 Horse' as const },
  { label: '🐸 Frog' as const },
  { label: '🦎 Gecko' as const },
  { label: '🐋 Whale' as const },
  { label: '🐔 Chicken' as const },
  { label: '🐹 Hamster' as const },
  { label: '🦕 Dinosaur' as const },
  { label: '🐘 Baby Elephant' as const },
  { label: '🦄 Unicorn' as const },
  { label: '⛔ None' as const },
  { label: '🐾 Other' as const },
];

export default function Page() {
  const {
    caregiverPetExperience,
    setCaregiverPetExperience,
    setOnboardingScreen,
  } = useUserStore();
  // const [selectedPets, setSelectedPets] = useState<string[]>([]);

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/interest');
    router.push('/(auth)/screens/onboarding/caregiver/interest');
  };

  const togglePet = (pet: PetType) => {
    if (pet === 'Other') {
      setOnboardingScreen('/(auth)/screens/onboarding/family/otherPet')
      router.push('/(auth)/screens/onboarding/family/otherPet')
      return;
    }
    const prev = caregiverPetExperience ?? [];
    const filtered = prev.filter((p) => p !== 'None');
    if (prev.includes(pet)) {
      setCaregiverPetExperience(filtered.filter((p) => p !== pet));
    } else {
      setCaregiverPetExperience([...filtered, pet]);
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
              label={pet.label}
              onPress={() => togglePet(pet.label.split(' ')[1])}
              selected={caregiverPetExperience?.includes(
                pet.label.split(' ')[1]
              )}
              disabled={
                pet.label.split(' ')[1] !== 'None' &&
                caregiverPetExperience?.includes('None')
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
            label='Next'
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
    fontFamily: 'Bogart-Bold', // Changed to use Bogart-Bold font
    fontWeight: '600',
    color: '#002140',
    marginBottom: 40,
    marginTop: 20,
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
