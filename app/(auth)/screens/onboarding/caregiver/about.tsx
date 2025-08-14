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
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';

type Category = 'Personality' | 'Diet' | 'Religion';

interface CategoryData {
  label: string;
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
  } = useUserStore();
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // const [visibilitySettings, setVisibilitySettings] = useState({
  //   personality: false,
  //   diet: false,
  //   religion: false
  // });

  const categories: Record<Category, CategoryData[]> = {
    Personality: [
      { label: '🫧 Bubbly', category: 'Personality' },
      { label: '🦹‍♂️ Animated', category: 'Personality' },
      { label: '🧘‍♀️ Chill', category: 'Personality' },
      { label: '😌 Patient', category: 'Personality' },
      { label: '🤪 Wacky', category: 'Personality' },
      { label: '🤩 Extroverted', category: 'Personality' },
      { label: '📏 Disciplined', category: 'Personality' },
      { label: '😬 Introverted', category: 'Personality' },
      { label: '🥰 Thoughtful', category: 'Personality' },
      { label: '🚀 Adventurous', category: 'Personality' },
      { label: '🧚 Whimsical', category: 'Personality' },
      { label: '🤗 Nurturing', category: 'Personality' },
      { label: '😎 Cool', category: 'Personality' },
      { label: '👨🏽‍💻 Organized', category: 'Personality' },
    ],
    // Rules: [
    //   { label: '📵 No Screens', category: 'Rules' },
    //   { label: '💨 No Vapping', category: 'Rules' },
    //   { label: '😊 Be Kind', category: 'Rules' },
    //   { label: '👋🏽 No Hitting', category: 'Rules' },
    //   { label: '🥜 No Nuts', category: 'Rules' },
    //   { label: '🤬 No Swearing', category: 'Rules' },
    //   { label: '💅 No Long Nails', category: 'Rules' },
    //   { label: '🐂 No Bullying', category: 'Rules' },
    //   { label: '🌸 No Perfume', category: 'Rules' },
    //   { label: '🚭 No Smoking', category: 'Rules' },
    //   { label: '☄️ No Throwing Balls', category: 'Rules' },
    //   { label: '🛋️ No Jumping On Furniture', category: 'Rules' },
    //   { label: '🎈 Other', category: 'Rules' },
    // ],
    Diet: [
      { label: '🥬 Vegan', category: 'Diet' },
      { label: '🥗 Vegetarian', category: 'Diet' },
      { label: '🥩 Halal', category: 'Diet' },
      { label: '🍗 Meat Eater', category: 'Diet' },
      { label: '🧆 Kosher', category: 'Diet' },
      { label: '🐟 Pescatarian', category: 'Diet' },
      { label: '🍉 Sugar Free', category: 'Diet' },
      { label: '🚫 None', category: 'Diet' },
      // { label: '🥑 Other', category: 'Diet' },
    ],
    Religion: [
      { label: '🕌 Islam', category: 'Religion' },
      { label: '☯️ Taoism', category: 'Religion' },
      { label: '☸️ Buddhism', category: 'Religion' },
      { label: '🕍 Judaism', category: 'Religion' },
      { label: '🪷 Hinduism', category: 'Religion' },
      { label: '⛪️ Christianity', category: 'Religion' },
      { label: '⚛️ Athesisim', category: 'Religion' },
      // { label: '📿 Other', category: 'Religion' },
    ],
  };

  console.log('caregiverPersonality', caregiverPersonality);
  console.log('caregiverDiet', caregiverDiet);
  console.log('caregiverReligion', caregiverReligion);

  const getTotalSelections = () => {
    return (
      (caregiverPersonality?.length || 0) +
      (caregiverDiet?.length || 0) +
      (caregiverReligion?.length || 0)
    );
  };

  const canSelectMore = () => {
    return getTotalSelections() < 10;
  };

  const togglePersonalitySelection = (item: string) => {
    const prev = caregiverPersonality ?? [];
    const willBeSelected = !prev.includes(item);

    // Check if adding this selection would exceed the limit
    if (willBeSelected && !canSelectMore()) {
      return;
    }

    const selectedPersonality = willBeSelected
      ? [...prev, item]
      : prev.filter((i) => i !== item);
    setCaregiverPersonality(selectedPersonality);
  };
  const toggleRulesSelection = (item: string) => {
    if (item === '🎈 Other') {
      setOnboardingScreen('/(auth)/screens/onboarding/family/otherDiet');
      router.push('/(auth)/screens/onboarding/family/otherDiet?category=rules');
      return;
    }
    const prev = caregiverRules ?? [];
    const selectedRules = prev.includes(item)
      ? prev.filter((i) => i !== item)
      : [...prev, item];
    setCaregiverRules(selectedRules);
  };
  const toggleDietSelection = (item: string) => {
    if (item === '🥑 Other') {
      setOnboardingScreen('/(auth)/screens/onboarding/family/otherDiet');
      router.push('/(auth)/screens/onboarding/family/otherDiet?category=diet');
      return;
    }

    const prev = caregiverDiet ?? [];
    const willBeSelected = !prev.includes(item);

    // Check if adding this selection would exceed the limit
    if (willBeSelected && !canSelectMore()) {
      return;
    }

    const selectedDiet = willBeSelected
      ? [...prev, item]
      : prev.filter((i) => i !== item);
    setCaregiverDiet(selectedDiet);
  };
  const toggleReligionSelection = (item: string) => {
    if (item === '📿 Other') {
      setOnboardingScreen('/(auth)/screens/onboarding/family/otherDiet');
      router.push(
        '/(auth)/screens/onboarding/family/otherDiet?category=religion'
      );
      return;
    }
    // For religion, we only want to allow one selection
    setCaregiverReligion([item]);
  };

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/philo');
    router.push('/(auth)/screens/onboarding/caregiver/philo');
  };

  const handleSkip = () => {
    // Reset all selections when skipping
    setCaregiverPersonality([]);
    setCaregiverDiet([]);
    setCaregiverReligion([]);
    setShowCaregiverPersonality(false);
    setShowCaregiverDiet(false);
    setShowCaregiverReligion(false);
    handleNext();
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.75} />

        <ThemedText style={styles.title}>
          Tell us about{'\n'}yourself.
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          You can select up to 10 options (religion is compulsory)
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
            {(Object.keys(categories) as Category[]).map((category) => (
              <View key={category} style={styles.categoryContainer}>
                <ThemedText style={styles.categoryTitle}>{category}</ThemedText>
                <View style={styles.pillsContainer}>
                  {categories[category].map((item) => (
                    <Pill
                      key={item.label}
                      label={item.label}
                      selected={
                        category === 'Personality'
                          ? caregiverPersonality?.includes(item.label)
                          : category === 'Diet'
                          ? caregiverDiet?.includes(item.label)
                          : caregiverReligion?.includes(item.label)
                      }
                      onPress={() =>
                        category === 'Personality'
                          ? togglePersonalitySelection(item.label)
                          : category === 'Diet'
                          ? toggleDietSelection(item.label)
                          : toggleReligionSelection(item.label)
                      }
                    />
                  ))}
                </View>
                {category !== 'Religion' && (
                  <View style={styles.switchContainer}>
                    <ThemedText style={styles.switchLabel}>
                      Show on profile
                    </ThemedText>
                    <Switch
                      value={
                        category === 'Personality'
                          ? showCaregiverPersonality
                          : showCaregiverDiet
                      }
                      onValueChange={(value) => {
                        category === 'Personality'
                          ? setShowCaregiverPersonality(value)
                          : setShowCaregiverDiet(value);
                      }}
                    />
                  </View>
                )}
                {category === 'Religion' && (
                  <ThemedText style={styles.disclaimer}>
                    Your religion won't appear on your profile automatically -
                    it's up to you whether to include it or not. We only ask so
                    we can match you with families who are looking for
                    caregivers who share the same faith.
                  </ThemedText>
                )}
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
            <Button label='Skip' onPress={handleSkip} variant='skip' />
            <Button
              // label='Next'
              onPress={handleNext}
              variant='compact'
              disabled={
                !caregiverReligion?.length ||
                getTotalSelections() < 3 ||
                getTotalSelections() >= 10
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
    height: 100,
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
    marginBottom: 32,
    fontWeight: '500',
    marginTop: 16,
  },
  categoryContainer: {
    marginBottom: 40,
  },
  categoryTitle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
    fontWeight: '500',
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
    marginTop: 12,
  },
  switchLabel: {
    fontSize: 14,
    color: '#666',
  },
  disclaimer: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectionLimit: {
    fontSize: 14,
    color: '#666',
    // marginBottom: 16,
    textAlign: 'center',
  },

  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    // marginBottom: 24,
    // marginTop: 24,
  },
});
