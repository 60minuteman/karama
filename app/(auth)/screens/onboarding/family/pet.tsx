import { useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView, Animated } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { LinearGradient } from 'expo-linear-gradient';

type PetType = 
  | 'None' | 'Cat' | 'Small Dog' | 'Pig' | 'Large Dog' | 'Cow' 
  | 'Butterfly' | 'Turtle' | 'Snake' | 'Parrot' | 'Rabbit' | 'Sheep'
  | 'Duck' | 'Horse' | 'Frog' | 'Gecko' | 'Whale' | 'Chicken'
  | 'Hamster' | 'Dinosaur' | 'Baby Elephant' | 'Unicorn' | 'Other';

export default function PetScreen() {
  const router = useRouter();
  const [selectedPets, setSelectedPets] = useState<PetType[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const pets: { type: PetType; icon: string }[] = [
    { type: 'None', icon: '⛔' },
    { type: 'Cat', icon: '😺' },
    { type: 'Small Dog', icon: '🐕' },
    { type: 'Pig', icon: '🐷' },
    { type: 'Large Dog', icon: '🐕' },
    { type: 'Cow', icon: '🐮' },
    { type: 'Butterfly', icon: '🦋' },
    { type: 'Turtle', icon: '🐢' },
    { type: 'Snake', icon: '🐍' },
    { type: 'Parrot', icon: '🦜' },
    { type: 'Rabbit', icon: '🐰' },
    { type: 'Sheep', icon: '🐑' },
    { type: 'Duck', icon: '🦆' },
    { type: 'Horse', icon: '🐎' },
    { type: 'Frog', icon: '🐸' },
    { type: 'Gecko', icon: '🦎' },
    { type: 'Whale', icon: '🐳' },
    { type: 'Chicken', icon: '🐔' },
    { type: 'Hamster', icon: '🐹' },
    { type: 'Dinosaur', icon: '🦕' },
    { type: 'Baby Elephant', icon: '🐘' },
    { type: 'Unicorn', icon: '🦄' },
    { type: 'Other', icon: '🐾' },
  ];

  const togglePet = (pet: PetType) => {
    if (pet === 'None') {
      setSelectedPets(['None']);
    } else {
      setSelectedPets(prev => {
        if (prev.includes('None')) {
          return [pet];
        }
        return prev.includes(pet)
          ? prev.filter(p => p !== pet)
          : [...prev, pet];
      });
    }
  };

  const handleNext = () => {
    router.push('/(auth)/screens/onboarding/family/Allergies');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.9} />
        
        <ThemedText style={styles.title}>
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
                  selected={selectedPets.includes(type)}
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
    fontFamily: 'Poppins',
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