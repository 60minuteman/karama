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
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type Category = 'Creative' | 'Instruments' | 'Sports' | 'STEM';
type Interest = { label: string; category: Category };

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
    setOnboardingScreen,
  } = useUserStore();
  // const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests: Record<Category, Interest[]> = {
    Creative: [
      { label: '🩰 Dance', category: 'Creative' },
      { label: '🪅 DIY', category: 'Creative' },
      { label: '🎨 Painting', category: 'Creative' },
      { label: '🎭 Drama', category: 'Creative' },
      { label: '🎮 Gaming', category: 'Creative' },
      { label: '🍰 Baking', category: 'Creative' },
      { label: '🎤 Singing', category: 'Creative' },
      { label: '🏺 Pottery', category: 'Creative' },
      { label: '📚 Reading', category: 'Creative' },
      { label: '🧶 Arts & Crafts', category: 'Creative' },
      { label: '📀 DJing', category: 'Creative' },
      { label: '🪄 Magic', category: 'Creative' },
      { label: '🎬 Film Making', category: 'Creative' },
      { label: '🍳 Cooking', category: 'Creative' },
      { label: '📸 Photography', category: 'Creative' },
      { label: '🎥 Videography', category: 'Creative' },
      { label: '👗 Fashion Design', category: 'Creative' },
      // { label: '👨‍🎨 Other', category: 'Creative' },
    ],
    Instruments: [
      { label: '🎹 Piano', category: 'Instruments' },
      { label: '🎸 Guitar', category: 'Instruments' },
      { label: '🪗 Accordion', category: 'Instruments' },
      { label: '🎺 Trumpet', category: 'Instruments' },
      { label: '🪕 Banjo', category: 'Instruments' },
      { label: '🥁 Drum', category: 'Instruments' },
      { label: '🪇 Maracas', category: 'Instruments' },
      { label: '🎷 Saxophone', category: 'Instruments' },
      { label: '🪈 Flute', category: 'Instruments' },
      { label: '🎻 Violin', category: 'Instruments' },
      { label: '🪘 Conga', category: 'Instruments' },
      { label: '🎼 Other', category: 'Instruments' },
    ],
    Sports: [
      { label: '⛸️ Ice skating', category: 'Sports' },
      { label: '⛷️ Skiing', category: 'Sports' },
      { label: '🏀 Basketball', category: 'Sports' },
      { label: '🏑 Hockey', category: 'Sports' },
      { label: '⚽ Soccer', category: 'Sports' },
      { label: '🚣 Rowing', category: 'Sports' },
      { label: '🤼 Wrestling', category: 'Sports' },
      { label: '🏈 Football', category: 'Sports' },
      { label: '🏄🏻‍♀️ Surfing', category: 'Sports' },
      { label: '♟️ Chess', category: 'Sports' },
      { label: '🏐 Volleyball', category: 'Sports' },
      { label: '🎾 Tennis', category: 'Sports' },
      { label: '⚾ Baseball', category: 'Sports' },
      { label: '🥋 Karate', category: 'Sports' },
      { label: '🏃🏽‍♀️ Track', category: 'Sports' },
      { label: '⛳ Golf', category: 'Sports' },
      { label: '🏉 Rugby', category: 'Sports' },
      { label: '🐴 Polo', category: 'Sports' },
      { label: '🚴‍♀️ Cycling', category: 'Sports' },
      { label: '🎳 Bowling', category: 'Sports' },
      { label: '🏸 Badminton', category: 'Sports' },
      { label: '🏏 Cricket', category: 'Sports' },
      { label: '🤸‍♂️ Gymnastics', category: 'Sports' },
      { label: '🏊🏻‍♀️ Swimming', category: 'Sports' },
      { label: '🤽‍♂️ Water Polo', category: 'Sports' },
      { label: '🥾 Hiking', category: 'Sports' },
      { label: '🛼 Roller Skating', category: 'Sports' },
      { label: '🛹 Skateboarding', category: 'Sports' },
      { label: '🏇 Horseback Riding', category: 'Sports' },
      // { label: '🏅 Other', category: 'Sports' },
    ],
    STEM: [
      { label: '💻 Coding', category: 'STEM' },
      { label: '🧬 Sciences', category: 'STEM' },
      { label: '🤖 Robotics', category: 'STEM' },
      { label: '🧮 Mathematics', category: 'STEM' },
      // { label: '🔬 Other', category: 'STEM' },
    ],
  };

  console.log('caregiverCreativeInterests', caregiverCreativeInterests);
  console.log('caregiverInstrumentInterests', caregiverInstrumentInterests);
  console.log('caregiverSportInterest', caregiverSportInterest);
  console.log('caregiverStemInterests', caregiverStemInterests);

  const getTotalSelectedInterests = () => {
    return (
      (caregiverCreativeInterests?.length ?? 0) +
      (caregiverInstrumentInterests?.length ?? 0) +
      (caregiverSportInterest?.length ?? 0) +
      (caregiverStemInterests?.length ?? 0)
    );
  };

  const toggleCreativeInterest = (interest: string) => {
    if (interest === '👨‍🎨 Other') {
      // Redirect to the custom interest input screen
      router.push(
        `/(auth)/screens/onboarding/family/custom-interest?category=Creative`
      );
      return;
    }
    const prev = caregiverCreativeInterests ?? [];
    const isSelected = prev.includes(interest);

    // If trying to deselect and total would be less than 1, prevent it
    if (isSelected && getTotalSelectedInterests() <= 1) {
      return;
    }

    // If trying to select and total would be more than 10, prevent it
    if (!isSelected && getTotalSelectedInterests() >= 10) {
      return;
    }

    const selectedInterests = isSelected
      ? prev.filter((item) => item !== interest)
      : [...prev, interest];
    setCaregiverCreativeInterests(selectedInterests);
  };

  const toggleInstrumentInterest = (interest: string) => {
    if (interest === '🎼 Other') {
      // Redirect to the custom interest input screen
      router.push(
        `/(auth)/screens/onboarding/family/custom-interest?category=Instrument`
      );
      return;
    }
    const prev = caregiverInstrumentInterests ?? [];
    const isSelected = prev.includes(interest);

    // If trying to deselect and total would be less than 1, prevent it
    if (isSelected && getTotalSelectedInterests() <= 1) {
      return;
    }

    // If trying to select and total would be more than 10, prevent it
    if (!isSelected && getTotalSelectedInterests() >= 10) {
      return;
    }

    const selectedInterests = isSelected
      ? prev.filter((item) => item !== interest)
      : [...prev, interest];
    setCaregiverInstrumentsInterests(selectedInterests);
  };

  const toggleSportInterest = (interest: string) => {
    if (interest === '🏅 Other') {
      // Redirect to the custom interest input screen
      router.push(
        `/(auth)/screens/onboarding/family/custom-interest?category=Sport`
      );
      return;
    }
    const prev = caregiverSportInterest ?? [];
    const isSelected = prev.includes(interest);

    // If trying to deselect and total would be less than 1, prevent it
    if (isSelected && getTotalSelectedInterests() <= 1) {
      return;
    }

    // If trying to select and total would be more than 10, prevent it
    if (!isSelected && getTotalSelectedInterests() >= 10) {
      return;
    }

    const selectedInterests = isSelected
      ? prev.filter((item) => item !== interest)
      : [...prev, interest];
    setCaregiverSportsInterests(selectedInterests);
  };

  const toggleStemInterest = (interest: string) => {
    if (interest === '🔬 Other') {
      // Redirect to the custom interest input screen
      router.push(
        `/(auth)/screens/onboarding/family/custom-interest?category=stem`
      );
      return;
    }
    const prev = caregiverStemInterests ?? [];
    const isSelected = prev.includes(interest);

    // If trying to deselect and total would be less than 1, prevent it
    if (isSelected && getTotalSelectedInterests() <= 1) {
      return;
    }

    // If trying to select and total would be more than 10, prevent it
    if (!isSelected && getTotalSelectedInterests() >= 10) {
      return;
    }

    const selectedInterests = isSelected
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
      <Header variant='back' titleStyle={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.95} />

        <ThemedText style={styles.title}>
          What are your{'\n'}interests/hobbies?
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          You can choose up to 10 options
        </ThemedText>

        <View style={styles.scrollViewContainer}>
          <LinearGradient
            colors={[Colors.light.background, 'rgba(255,255,255,0)']}
            style={styles.topGradient}
            pointerEvents='none'
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
                      selected={
                        category === 'Creative'
                          ? caregiverCreativeInterests?.includes(interest.label)
                          : category === 'Instruments'
                          ? caregiverInstrumentInterests?.includes(
                              interest.label
                            )
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
            pointerEvents='none'
          />
          <View style={styles.buttonContainer}>
            <Button label='Skip' onPress={handleNext} variant='skip' />
            <Button
              // label='Next'
              onPress={handleNext}
              variant='compact'
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
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    // marginBottom: 40,
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

  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    // marginBottom: 24,
    marginTop: 24,
  },
});
