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
import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';

type Category = 'Creative' | 'Instruments' | 'Sports' | 'STEM';
type Interest = { label: string; icon: string; category: Category };

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

export default function InterestScreen() {
  const router = useRouter();
  const { family_interests, setFamilyInterests, setOnboardingScreen } =
    useUserStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  const toggleInterest = (interest: Interest) => {
    const { label, category } = interest;
  
    // Check if "Other" is selected
    if (label === 'Other') {
      // Redirect to the custom interest input screen
      router.push(`/(auth)/screens/onboarding/family/custom-interest?category=${category}`);
      return;
    }
  
    // Get current interests array for this category
    let currentInterests: string[] = [];
    switch (category) {
      case 'Creative':
        currentInterests = family_interests.creative_interests;
        break;
      case 'Instruments':
        currentInterests = family_interests.instrument_interests;
        break;
      case 'Sports':
        currentInterests = family_interests.sport_interests;
        break;
      case 'STEM':
        currentInterests = family_interests.stem_interests;
        break;
    }
  
    // Toggle the interest in the appropriate category
    const updatedInterests = {
      ...family_interests,
      creative_interests:
        category === 'Creative'
          ? currentInterests.includes(label)
            ? currentInterests.filter((i) => i !== label)
            : [...currentInterests, label]
          : family_interests.creative_interests,
      instrument_interests:
        category === 'Instruments'
          ? currentInterests.includes(label)
            ? currentInterests.filter((i) => i !== label)
            : [...currentInterests, label]
          : family_interests.instrument_interests,
      sport_interests:
        category === 'Sports'
          ? currentInterests.includes(label)
            ? currentInterests.filter((i) => i !== label)
            : [...currentInterests, label]
          : family_interests.sport_interests,
      stem_interests:
        category === 'STEM'
          ? currentInterests.includes(label)
            ? currentInterests.filter((i) => i !== label)
            : [...currentInterests, label]
          : family_interests.stem_interests,
    };
  
    setFamilyInterests(updatedInterests);
  };
  

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/household');
    router.push('/(auth)/screens/onboarding/family/household');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.95} />

        <ThemedText style={styles.title}>
          What are your{'\n'}children's interests?
        </ThemedText>

        <View style={styles.scrollViewContainer}>
          <LinearGradient
            colors={[Colors.light.background, 'rgba(255,255,255,0)']}
            style={styles.topGradient}
            pointerEvents='none'
          />
          <Animated.ScrollView
            style={[styles.scrollView, { opacity: fadeAnim }]}
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
                        family_interests.creative_interests.includes(
                          interest.label
                        ) ||
                        family_interests.instrument_interests.includes(
                          interest.label
                        ) ||
                        family_interests.sport_interests.includes(
                          interest.label
                        ) ||
                        family_interests.stem_interests.includes(interest.label)
                      }
                      onPress={() => toggleInterest(interest)}
                    />
                  ))}
                </View>
              </View>
            ))}
            <View style={styles.spacerBottom} />
          </Animated.ScrollView>
          <LinearGradient
            colors={['rgba(255,255,255,0)', Colors.light.background]}
            style={styles.buttonGradient}
            pointerEvents='none'
          />
          <View style={styles.buttonContainer}>
            <Button label='Skip' onPress={handleNext} variant='compact' />
            <Button
              label='Next'
              onPress={handleNext}
              variant='compact'
              disabled={
                family_interests.creative_interests.length === 0 &&
                family_interests.instrument_interests.length === 0 &&
                family_interests.sport_interests.length === 0 &&
                family_interests.stem_interests.length === 0
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
    height: 100,
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
  title: {
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
    // color: '#002140',
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
