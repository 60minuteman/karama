import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';

type PetType =
  | 'None'
  | 'Cat'
  | 'Small Dog'
  | 'Pig'
  | 'Large Dog'
  | 'Cow'
  | 'Butterfly'
  | 'Turtle'
  | 'Snake'
  | 'Parrot'
  | 'Rabbit'
  | 'Sheep'
  | 'Duck'
  | 'Horse'
  | 'Frog'
  | 'Gecko'
  | 'Whale'
  | 'Chicken'
  | 'Hamster'
  | 'Dinosaur'
  | 'Baby Elephant'
  | 'Unicorn'
  | 'Other';

const pets = [
  { type: 'None' as const, icon: '⛔' },
  { type: 'Cat' as const, icon: '😺' },
  { type: 'Small Dog' as const, icon: '🐕' },
  { type: 'Pig' as const, icon: '🐷' },
  { type: 'Large Dog' as const, icon: '🐕' },
  { type: 'Cow' as const, icon: '🐮' },
  { type: 'Butterfly' as const, icon: '🦋' },
  { type: 'Turtle' as const, icon: '🐢' },
  { type: 'Snake' as const, icon: '🐍' },
  { type: 'Parrot' as const, icon: '🦜' },
  { type: 'Rabbit' as const, icon: '🐰' },
  { type: 'Sheep' as const, icon: '🐑' },
  { type: 'Duck' as const, icon: '🦆' },
  { type: 'Horse' as const, icon: '🐎' },
  { type: 'Frog' as const, icon: '🐸' },
  { type: 'Gecko' as const, icon: '🦎' },
  { type: 'Whale' as const, icon: '🐳' },
  { type: 'Chicken' as const, icon: '🐔' },
  { type: 'Hamster' as const, icon: '🐹' },
  { type: 'Dinosaur' as const, icon: '🦕' },
  { type: 'Baby Elephant' as const, icon: '🐘' },
  { type: 'Unicorn' as const, icon: '🦄' },
  { type: 'Other' as const, icon: '🐾' },
];

export default function PetScreen() {
  const router = useRouter();
  const { family_pets, setFamilyPets, setOnboardingScreen } = useUserStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const togglePet = (pet: PetType) => {
    if (pet === 'None') {
      setFamilyPets(['None']);
    } else {
      const newPets = family_pets.includes('None')
        ? [pet]
        : family_pets.includes(pet)
        ? family_pets.filter((p) => p !== pet)
        : [...family_pets, pet];
      setFamilyPets(newPets);
    }
  };

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/interest');
    router.push('/(auth)/screens/onboarding/family/interest');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.9} />

        <ThemedText style={[styles.title, { fontFamily: 'Bogart-Bold' }]}>
          What pets are{'\n'}a part of your{'\n'}family?
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Don't be afraid to use your imagination
        </ThemedText>

        <View style={styles.scrollViewContainer}>
          <LinearGradient
            colors={[Colors.light.background, 'rgba(255,255,255,0)']}
            style={styles.topGradient}
          />
          <Animated.ScrollView
            style={[styles.scrollView, { opacity: fadeAnim }]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.pillsContainer}>
              {pets.map(({ type, icon }) => (
                <Pill
                  key={type}
                  label={type}
                  icon={icon}
                  selected={family_pets.includes(type)}
                  onPress={() => togglePet(type)}
                />
              ))}
            </View>
            <View style={styles.bottomPadding} />
          </Animated.ScrollView>

          <LinearGradient
            colors={['rgba(255,255,255,0)', Colors.light.background]}
            style={styles.buttonGradient}
          >
            <View style={styles.buttonContainer}>
              <Button label='Skip' onPress={handleNext} variant='skip' />
              <Button
                label='Next'
                onPress={handleNext}
                variant='compact'
                disabled={family_pets.length === 0}
              />
            </View>
          </LinearGradient>
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
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 8,
    fontWeight: '500',
    marginTop: 20,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 40,
  },
  scrollViewContainer: {
    flex: 1,
    position: 'relative',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bottomPadding: {
    height: 100,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
