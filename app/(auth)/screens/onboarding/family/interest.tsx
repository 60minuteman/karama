import { useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';

type Category = 'Creative' | 'Instruments' | 'Sports' | 'STEM';
type Interest = { label: string; icon: string; category: Category };

export default function InterestScreen() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

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

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    router.push('/(auth)/screens/onboarding/family/household');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.95} />
        
        <ThemedText style={styles.title}>
          What are your{'\n'}children's interests?
        </ThemedText>

        <View style={styles.scrollViewContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
            style={styles.topGradient}
          />
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {(Object.keys(interests) as Category[]).map((category) => (
              <View key={category} style={styles.categoryContainer}>
                <ThemedText style={styles.categoryTitle}>
                  {category}
                </ThemedText>
                <View style={styles.pillsContainer}>
                  {interests[category].map((interest) => (
                    <Pill
                      key={interest.label}
                      label={interest.label}
                      icon={interest.icon}
                      selected={selectedInterests.includes(interest.label)}
                      onPress={() => toggleInterest(interest.label)}
                    />
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            style={styles.buttonGradient}
          >
            <View style={styles.buttonContainer}>
              <Button
                label="Skip"
                onPress={handleNext}
                variant="compact"
              />
              <Button
                label="Next"
                onPress={handleNext}
                variant="compact"
                disabled={selectedInterests.length === 0}
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
    fontFamily: 'Poppins',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
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