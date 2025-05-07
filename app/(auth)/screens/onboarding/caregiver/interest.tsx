import { useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { useUserStore } from '@/services/state/user';

type Category = 'Creative' | 'Instruments' | 'Sports' | 'STEM';
type Interest = { label: string; icon: string; category: Category };

export default function InterestScreen() {
  const router = useRouter();
  const {
    caregiverSportInterest,
    setCaregiverSportsInterests,
    caregiverCreativeInterests,
    setCaregiverCreativeInterests,
    caregiverInstrumentInterests,
    setCaregiverInstrumentsInterests,
    caregiverStemInterests,
    setCaregiverStemInterests,
    setOnboardingScreen
  } = useUserStore();
  // const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests: Record<Category, Interest[]> = {
    Creative: [
      { label: 'Dance', icon: '💃', category: 'Creative' },
      { label: 'DIY', icon: '⭐', category: 'Creative' },
      { label: 'Painting', icon: '🎨', category: 'Creative' },
      { label: 'Drama', icon: '🎭', category: 'Creative' },
      { label: 'Gaming', icon: '🎮', category: 'Creative' },
      { label: 'Baking', icon: '👨‍🍳', category: 'Creative' },
      { label: 'Singing', icon: '🎤', category: 'Creative' },
      { label: 'Pottery', icon: '🏺', category: 'Creative' },
      { label: 'Reading', icon: '📚', category: 'Creative' },
      { label: 'Arts & Crafts', icon: '🎨', category: 'Creative' },
      { label: 'DJing', icon: '🎧', category: 'Creative' },
      { label: 'Magic', icon: '✨', category: 'Creative' },
      { label: 'Film Making', icon: '🎥', category: 'Creative' },
      { label: 'Cooking', icon: '🔍', category: 'Creative' },
      { label: 'Photography', icon: '📸', category: 'Creative' },
      { label: 'Videography', icon: '📹', category: 'Creative' },
      { label: 'Fashion Design', icon: '💎', category: 'Creative' },
      { label: 'Other', icon: '🎨', category: 'Creative' },
    ],
    Instruments: [
      { label: 'Piano', icon: '🎹', category: 'Instruments' },
      { label: 'Guitar', icon: '🎸', category: 'Instruments' },
      { label: 'Accordion', icon: '🪗', category: 'Instruments' },
      { label: 'Trumpet', icon: '🎺', category: 'Instruments' },
      { label: 'Banjo', icon: '🪕', category: 'Instruments' },
      { label: 'Drum', icon: '🥁', category: 'Instruments' },
      { label: 'Maracas', icon: '🎵', category: 'Instruments' },
      { label: 'Saxophone', icon: '🎷', category: 'Instruments' },
      { label: 'Flute', icon: '🎼', category: 'Instruments' },
      { label: 'Violin', icon: '🎻', category: 'Instruments' },
      { label: 'Conga', icon: '🥁', category: 'Instruments' },
      { label: 'Other', icon: '🎵', category: 'Instruments' },
    ],
    Sports: [
      { label: 'Ice skating', icon: '⛸️', category: 'Sports' },
      { label: 'Skiing', icon: '⛷️', category: 'Sports' },
      { label: 'Basketball', icon: '🏀', category: 'Sports' },
      { label: 'Hockey', icon: '🏑', category: 'Sports' },
      { label: 'Soccer', icon: '⚽', category: 'Sports' },
      { label: 'Rowing', icon: '🚣', category: 'Sports' },
      { label: 'Hiking', icon: '🥾', category: 'Sports' },
      { label: 'Wrestling', icon: '🤼', category: 'Sports' },
      { label: 'Football', icon: '🏈', category: 'Sports' },
      { label: 'Surfing', icon: '🏄', category: 'Sports' },
      { label: 'Chess', icon: '♟️', category: 'Sports' },
      { label: 'Volleyball', icon: '🏐', category: 'Sports' },
      { label: 'Tennis', icon: '🎾', category: 'Sports' },
      { label: 'Baseball', icon: '⚾', category: 'Sports' },
      { label: 'Karate', icon: '🥋', category: 'Sports' },
      { label: 'Track', icon: '🏃', category: 'Sports' },
      { label: 'Golf', icon: '⛳', category: 'Sports' },
      { label: 'Rugby', icon: '🏉', category: 'Sports' },
      { label: 'Polo', icon: '🏇', category: 'Sports' },
      { label: 'Cycling', icon: '🚴', category: 'Sports' },
      { label: 'Bowling', icon: '🎳', category: 'Sports' },
      { label: 'Badminton', icon: '🏸', category: 'Sports' },
      { label: 'Cricket', icon: '🏏', category: 'Sports' },
      { label: 'Gymnastics', icon: '🤸', category: 'Sports' },
      { label: 'Swimming', icon: '🏊', category: 'Sports' },
      { label: 'Water Polo', icon: '🤽', category: 'Sports' },
      { label: 'Roller skate', icon: '🛼', category: 'Sports' },
      { label: 'Skateboarding', icon: '🛹', category: 'Sports' },
      { label: 'Horseback Riding', icon: '🏇', category: 'Sports' },
      { label: 'Other', icon: '🎯', category: 'Sports' },
    ],
    STEM: [
      { label: 'Coding', icon: '💻', category: 'STEM' },
      { label: 'Sciences', icon: '🧬', category: 'STEM' },
      { label: 'Robotics', icon: '🤖', category: 'STEM' },
      { label: 'Mathematics', icon: '📊', category: 'STEM' },
      { label: 'Other', icon: '🔬', category: 'STEM' },
    ],
  };

  useEffect(() => {
    console.log(caregiverCreativeInterests)
    console.log(caregiverInstrumentInterests)
    console.log(caregiverSportInterest)
    console.log(caregiverStemInterests)

  }, [caregiverCreativeInterests, caregiverInstrumentInterests, caregiverStemInterests, caregiverSportInterest])

  const toggleCreativeInterest = (interest: string) => {
    if (interest === 'Other') {
      // Redirect to the custom interest input screen
      router.push(`/(auth)/screens/onboarding/family/custom-interest?category=Creative`);
      return;
    }
    const prev = caregiverCreativeInterests ?? [];
    const selectedInterests = prev.includes(interest)
      ? prev.filter((item) => item !== interest)
      : [...prev, interest];
    setCaregiverCreativeInterests(selectedInterests);
  };
  const toggleInstrumentInterest = (interest: string) => {
    if (interest === 'Other') {
      // Redirect to the custom interest input screen
      router.push(`/(auth)/screens/onboarding/family/custom-interest?category=Instrument`);
      return;
    }
    const prev = caregiverInstrumentInterests ?? [];
    const selectedInterests = prev.includes(interest)
      ? prev.filter((item) => item !== interest)
      : [...prev, interest];
    setCaregiverInstrumentsInterests(selectedInterests);
  };
  const toggleSportInterest = (interest: string) => {
    if (interest === 'Other') {
      // Redirect to the custom interest input screen
      router.push(`/(auth)/screens/onboarding/family/custom-interest?category=Sport`);
      return;
    }
    const prev = caregiverSportInterest ?? [];
    const selectedInterests = prev.includes(interest)
      ? prev.filter((item) => item !== interest)
      : [...prev, interest];
    setCaregiverSportsInterests(selectedInterests);
  };
  const toggleStemInterest = (interest: string) => {
    if (interest === 'Other') {
      // Redirect to the custom interest input screen
      router.push(`/(auth)/screens/onboarding/family/custom-interest?category=stem`);
      return;
    }
    const prev = caregiverStemInterests ?? [];
    const selectedInterests = prev.includes(interest)
      ? prev.filter((item) => item !== interest)
      : [...prev, interest];
    setCaregiverStemInterests(selectedInterests);
  };


  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/about');
    router.push('/(auth)/screens/onboarding/caregiver/about');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.95} />

        <ThemedText style={styles.title}>
          What are your{'\n'}interests/hobbies?
        </ThemedText>

        <View style={styles.scrollViewContainer}>
          <LinearGradient
            colors={[Colors.light.background, 'rgba(255,255,255,0)']}
            style={styles.topGradient}
            pointerEvents="none"
          />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {(Object.keys(interests) as Category[]).map((category) => (
              <View key={category} style={styles.categoryContainer}>
                <ThemedText style={styles.categoryTitle}>{category}</ThemedText>
                <View style={styles.pillsContainer}>
                  {interests[category].map((interest) => (
                    <Pill
                      key={interest.label}
                      label={interest.label}
                      icon={interest.icon}
                      selected={
                        category === 'Creative'
                          ? caregiverCreativeInterests?.includes(interest.label)
                          : category === 'Instruments'
                            ? caregiverInstrumentInterests?.includes(interest.label)
                            : category === 'Sports'
                              ? caregiverSportInterest?.includes(interest.label)
                              : caregiverStemInterests?.includes(interest.label)
                      }
                      onPress={() =>
                        category === 'Creative'
                          ? toggleCreativeInterest(interest.label)
                          : category === 'Instruments'
                            ? toggleInstrumentInterest(interest.label)
                            : category === 'Sports'
                              ? toggleSportInterest(interest.label)
                              : toggleStemInterest(interest.label)
                      }
                    />
                  ))}
                </View>
              </View>
            ))}
            <View style={styles.spacerBottom} />
          </ScrollView>

          <LinearGradient
            colors={['rgba(255,255,255,0)', Colors.light.background]}
            style={styles.buttonGradient}
            pointerEvents="none"
          />
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
              disabled={
                caregiverCreativeInterests?.length === 0 &&
                caregiverSportInterest?.length === 0 &&
                caregiverInstrumentInterests?.length === 0 &&
                caregiverStemInterests?.length === 0
              }
            />
          </View>
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
  spacerBottom: {
    height: 120,
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
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Bogart',
    fontSize: 32,
    lineHeight: 40,
    color: '#002140',
    marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
  },
  categoryContainer: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
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