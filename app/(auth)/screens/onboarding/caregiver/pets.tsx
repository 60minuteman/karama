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

const PETS = [
  { label: 'Cat', emoji: '🐱' },
  { label: 'Small Dog', emoji: '🐶' },
  { label: 'Pig', emoji: '🐷' },
  { label: 'Large Dog', emoji: '🦮' },
  { label: 'Cow', emoji: '🐮' },
  { label: 'Butterfly', emoji: '🦋' },
  { label: 'Turtle', emoji: '🐢' },
  { label: 'Snake', emoji: '🐍' },
  { label: 'Parrot', emoji: '🦜' },
  { label: 'Rabbit', emoji: '🐰' },
  { label: 'Sheep', emoji: '🐑' },
  { label: 'Duck', emoji: '🦆' },
  { label: 'Horse', emoji: '🐎' },
  { label: 'Frog', emoji: '🐸' },
  { label: 'Gecko', emoji: '🦎' },
  { label: 'Whale', emoji: '🐋' },
  { label: 'Chicken', emoji: '🐔' },
  { label: 'Hamster', emoji: '🐹' },
  { label: 'Dinosaur', emoji: '🦕' },
  { label: 'Baby Elephant', emoji: '🐘' },
  { label: 'Unicorn', emoji: '🦄' },
  { label: 'None', emoji: '⛔' },
  { label: 'Other', emoji: '🐾' },
];

export default function Page() {
  const [selectedPets, setSelectedPets] = useState<string[]>([]);

  const handleNext = () => {
    router.push('/(auth)/screens/onboarding/caregiver/interest');
  };

  const togglePet = (pet: string) => {
    if (pet === 'None') {
      setSelectedPets(['None']);
      return;
    }

    setSelectedPets(prev => {
      // Remove 'None' if selecting another pet
      const filtered = prev.filter(p => p !== 'None');
      
      if (prev.includes(pet)) {
        return filtered.filter(p => p !== pet);
      } else {
        return [...filtered, pet];
      }
    });
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
              selected={selectedPets.includes(pet.label)}
              disabled={pet.label !== 'None' && selectedPets.includes('None')}
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
            disabled={selectedPets.length === 0}
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