import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { useFonts } from 'expo-font';
import { Bogart_600SemiBold } from '@expo-google-fonts/bogart';
import { PetType, useUserStore } from '@/services/state/user';

const PETS = [
  { label: 'Cat' as const, emoji: '🐱' },
  { label: 'Small Dog' as const, emoji: '🐶' },
  { label: 'Pig' as const, emoji: '🐷' },
  { label: 'Large Dog' as const, emoji: '🦮' },
  { label: 'Cow' as const, emoji: '🐮' },
  { label: 'Butterfly' as const, emoji: '🦋' },
  { label: 'Turtle' as const, emoji: '🐢' },
  { label: 'Snake' as const, emoji: '🐍' },
  { label: 'Parrot' as const, emoji: '🦜' },
  { label: 'Rabbit' as const, emoji: '🐰' },
  { label: 'Sheep' as const, emoji: '🐑' },
  { label: 'Duck' as const, emoji: '🦆' },
  { label: 'Horse' as const, emoji: '🐎' },
  { label: 'Frog' as const, emoji: '🐸' },
  { label: 'Gecko' as const, emoji: '🦎' },
  { label: 'Whale' as const, emoji: '🐋' },
  { label: 'Chicken' as const, emoji: '🐔' },
  { label: 'Hamster' as const, emoji: '🐹' },
  { label: 'Dinosaur' as const, emoji: '🦕' },
  { label: 'Baby Elephant' as const, emoji: '🐘' },
  { label: 'Unicorn' as const, emoji: '🦄' },
  { label: 'Other' as const, emoji: '🐾' },
];

export default function Page() {
  const { caregiverPetExperience, setCaregiverPetExperience, setOnboardingScreen } = useUserStore()
  // const [selectedPets, setSelectedPets] = useState<string[]>([]);

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/interest')
    router.push('/(auth)/screens/onboarding/caregiver/interest');
  };

  const togglePet = (pet: PetType) => {
    // if (pet === 'None') {
    //   setCaregiverPetExperience(['None']);
    //   return;
    // }
    const prev = caregiverPetExperience ?? [];
    const filtered = prev.filter(p => p !== 'None');
    if (prev.includes(pet)) {
      setCaregiverPetExperience(filtered.filter(p => p !== pet));
    } else {
      setCaregiverPetExperience([...filtered, pet]);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

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
              label={`${pet.emoji} ${pet.label}`}
              onPress={() => togglePet(pet.label)}
              selected={caregiverPetExperience?.includes(pet.label)}
              disabled={pet.label !== 'None' && caregiverPetExperience?.includes('None')}
            />
          ))}
        </View>
        <View style={styles.scrollEndSpacer} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', Colors.light.background]}
          style={styles.buttonGradient}
          pointerEvents="none"
        />
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
  }
});