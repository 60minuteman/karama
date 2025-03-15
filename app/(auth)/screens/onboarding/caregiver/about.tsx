import { useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView, Switch } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { useUserStore } from '@/services/state/user';

type Category = 'Personality' | 'Rules' | 'Diet' | 'Religion';

interface CategoryData {
  label: string;
  icon: string;
  category: Category;
}

export default function AboutScreen() {
  const router = useRouter();
  const {
    caregiverReligion,
    setCaregiverReligion,
    showCaregiverReligion,
    setShowCaregiverReligion,
    caregiverPersonality,
    setCaregiverPersonality,
    showCaregiverPersonality,
    setShowCaregiverPersonality,
    caregiverDiet,
    setCaregiverDiet,
    showCaregiverDiet,
    setShowCaregiverDiet,
    caregiverRules,
    setCaregiverRules,
    setOnboardingScreen,

  } = useUserStore()
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // const [visibilitySettings, setVisibilitySettings] = useState({
  //   personality: false,
  //   diet: false,
  //   religion: false
  // });

  const categories: Record<Category, CategoryData[]> = {
    Personality: [
      { label: 'Bubbly', icon: '✨', category: 'Personality' },
      { label: 'Animated', icon: '🤗', category: 'Personality' },
      { label: 'Chill', icon: '🕯️', category: 'Personality' },
      { label: 'Patient', icon: '😌', category: 'Personality' },
      { label: 'Wacky', icon: '🤪', category: 'Personality' },
      { label: 'Extroverted', icon: '😎', category: 'Personality' },
      { label: 'Disciplined', icon: '📝', category: 'Personality' },
      { label: 'Introverted', icon: '🤔', category: 'Personality' },
      { label: 'Thoughtful', icon: '🤗', category: 'Personality' },
      { label: 'Adventurous', icon: '🚀', category: 'Personality' },
      { label: 'Whimsical', icon: '🌈', category: 'Personality' },
      { label: 'Nurturing', icon: '🫂', category: 'Personality' },
      { label: 'Cool', icon: '😎', category: 'Personality' },
      { label: 'Organized', icon: '👥', category: 'Personality' },
    ],
    Rules: [
      { label: 'No Screens', icon: '📱', category: 'Rules' },
      { label: 'No Vaping', icon: '💨', category: 'Rules' },
      { label: 'Be Kind', icon: '🤗', category: 'Rules' },
      { label: 'No Hitting', icon: '👊', category: 'Rules' },
      { label: 'No Nuts', icon: '🥜', category: 'Rules' },
      { label: 'No Swearing', icon: '🤬', category: 'Rules' },
      { label: 'No Long Nails', icon: '💅', category: 'Rules' },
      { label: 'No Bullying', icon: '🚫', category: 'Rules' },
      { label: 'No Perfume', icon: '🌸', category: 'Rules' },
      { label: 'No Smoking', icon: '🚭', category: 'Rules' },
      { label: 'No Throwing Balls', icon: '🏈', category: 'Rules' },
      { label: 'No Jumping On Furniture', icon: '🛋️', category: 'Rules' },
      { label: 'Other', icon: '❓', category: 'Rules' },
    ],
    Diet: [
      { label: 'Vegan', icon: '🥬', category: 'Diet' },
      { label: 'Vegetarian', icon: '🥗', category: 'Diet' },
      { label: 'Halal', icon: '🌙', category: 'Diet' },
      { label: 'Meat Eater', icon: '🍖', category: 'Diet' },
      { label: 'Kosher', icon: '✡️', category: 'Diet' },
      { label: 'Pescatarian', icon: '🐟', category: 'Diet' },
      { label: 'Sugar Free', icon: '🚫', category: 'Diet' },
      { label: 'None', icon: '❌', category: 'Diet' },
      { label: 'Other', icon: '❓', category: 'Diet' },
    ],
    Religion: [
      { label: 'Islam', icon: '☪️', category: 'Religion' },
      { label: 'Taoism', icon: '☯️', category: 'Religion' },
      { label: 'Buddhism', icon: '☸️', category: 'Religion' },
      { label: 'Judaism', icon: '✡️', category: 'Religion' },
      { label: 'Hinduism', icon: '🕉️', category: 'Religion' },
      { label: 'Christianity', icon: '✝️', category: 'Religion' },
      { label: 'Atheism', icon: '🚫', category: 'Religion' },
      { label: 'Other', icon: '❓', category: 'Religion' },
    ],
  };

  const togglePersonalitySelection = (item: string) => {
    const prev = caregiverPersonality ?? [];
    const selectedPersonality = prev.includes(item)
      ? prev.filter(i => i !== item)
      : [...prev, item]
    setCaregiverPersonality(selectedPersonality);
  };
  const toggleRulesSelection = (item: string) => {
    const prev = caregiverRules ?? [];
    const selectedRules = prev.includes(item)
      ? prev.filter(i => i !== item)
      : [...prev, item]
    setCaregiverRules(selectedRules);
  };
  const toggleDietSelection = (item: string) => {
    const prev = caregiverDiet ?? [];
    const selectedDiet = prev.includes(item)
      ? prev.filter(i => i !== item)
      : [...prev, item]
    setCaregiverDiet(selectedDiet);
  };
  const toggleReligionSelection = (item: string) => {
    const prev = caregiverReligion ?? [];
    const selectedReligion = prev.includes(item)
      ? prev.filter(i => i !== item)
      : [...prev, item]
    setCaregiverReligion(selectedReligion);
  };

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/philo');
    router.push('/(auth)/screens/onboarding/caregiver/philo');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.75} />

        <ThemedText style={styles.title}>
          Tell us about{'\n'}yourself.
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
            {(Object.keys(categories) as Category[]).map((category) => (
              <View key={category} style={styles.categoryContainer}>
                <ThemedText style={styles.categoryTitle}>
                  {category}
                </ThemedText>
                <View style={styles.pillsContainer}>
                  {categories[category].map((item) => (
                    <Pill
                      key={item.label}
                      label={item.label}
                      icon={item.icon}
                      selected={
                        category === 'Personality' ?
                          caregiverPersonality?.includes(item.label)
                          : category === 'Rules' ?
                            caregiverRules?.includes(item.label)
                            : category === 'Diet' ?
                              caregiverDiet?.includes(item.label)
                              : caregiverReligion?.includes(item.label)
                      }
                      onPress={() =>
                        category === 'Personality' ?
                          togglePersonalitySelection(item.label)
                          : category === 'Rules' ?
                            toggleRulesSelection(item.label)
                            : category === 'Diet' ?
                              toggleDietSelection(item.label)
                              : toggleReligionSelection(item.label)
                      }
                    />
                  ))}
                </View>
                {category !== 'Rules' && (
                  <View style={styles.switchContainer}>
                    <ThemedText style={styles.switchLabel}>Show on profile</ThemedText>
                    <Switch
                      value={
                        category === 'Personality' ?
                          showCaregiverPersonality
                          : category === 'Diet' ?
                            showCaregiverDiet :
                            showCaregiverReligion
                      }
                      onValueChange={(value) => {
                        category === 'Personality' ?
                          setShowCaregiverPersonality(value)
                          : category === 'Diet' ?
                            setShowCaregiverDiet(value) :
                            setShowCaregiverReligion(value)
                      }
                      }
                    />
                  </View>
                )}
                {category === 'Religion' && (
                  <ThemedText style={styles.disclaimer}>
                    Your religion won't appear on your profile automatically - it's up to you whether to include it or not. We only ask so we can match you with families who are looking for caregivers who share the same faith.
                  </ThemedText>
                )}
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
                caregiverDiet?.length === 0 ||
                caregiverPersonality?.length === 0 ||
                caregiverReligion?.length === 0 ||
                caregiverRules?.length === 0
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
    paddingBottom: 20,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Bogart-Bold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: '#666',
  },
  disclaimer: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
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