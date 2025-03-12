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
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';

const foodAllergies = [
  { id: 'milk', label: 'Milk', icon: '🥛' },
  { id: 'eggs', label: 'Eggs', icon: '🥚' },
  { id: 'peanuts', label: 'Peanuts', icon: '🥜' },
  { id: 'treenut', label: 'Treenut', icon: '🌳' },
  { id: 'fish', label: 'Fish', icon: '🐟' },
  { id: 'shellfish', label: 'Shellfish', icon: '🦐' },
  { id: 'soy', label: 'Soy', icon: '🫘' },
  { id: 'wheat', label: 'Wheat', icon: '🌾' },
  { id: 'other_food', label: 'Other', icon: '🍽️' },
];

const environmentalAllergies = [
  { id: 'pollen', label: 'Pollen', icon: '🌸' },
  { id: 'dust_mites', label: 'Dust mites', icon: '💨' },
  { id: 'mold', label: 'Mold', icon: '🍄' },
  { id: 'animal_dander', label: 'Animal Dander', icon: '🐕' },
  { id: 'insect_sting', label: 'Insect sting', icon: '🐝' },
  { id: 'other_environmental', label: 'Other', icon: '🌲' },
];

const otherAllergies = [
  { id: 'latex', label: 'Latex', icon: '🧤' },
  { id: 'perfume', label: 'Perfume', icon: '🌹' },
  { id: 'cleaning_chemicals', label: 'Cleaning Chemicals', icon: '💧' },
  { id: 'metal', label: 'Metal', icon: '⚙️' },
  { id: 'other', label: 'Other', icon: '➕' },
];

export default function Allergies() {
  const router = useRouter();
  const {
    family_has_allergies,
    family_allergies,
    setFamilyHasAllergies,
    setFamilyAllergies,
    setOnboardingScreen,
  } = useUserStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Update state management to handle categorized arrays
  const [localAllergies, setLocalAllergies] = useState({
    food: Array.from(family_allergies.food),
    environmental: Array.from(family_allergies.environmental),
    other: Array.from(family_allergies.other),
  });

  // Update local state when store changes
  useEffect(() => {
    setLocalAllergies({
      food: Array.from(family_allergies.food),
      environmental: Array.from(family_allergies.environmental),
      other: Array.from(family_allergies.other),
    });
  }, [family_allergies]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAllergyToggle = (
    id: string,
    category: 'food' | 'environmental' | 'other'
  ) => {
    const newSelected = [...localAllergies[category]];
    const index = newSelected.indexOf(id);
    if (index > -1) {
      newSelected.splice(index, 1);
    } else {
      newSelected.push(id);
    }

    setFamilyAllergies({
      ...localAllergies,
      [category]: newSelected,
    });
  };

  const handleOtherPress = (type: 'food' | 'environmental' | 'other') => {
    router.push(`/(auth)/screens/onboarding/family/other-allergy?type=${type}`);
  };

  const handleNext = () => {
    // Update the store with categorized allergies
    const foodAllergiesSelected = foodAllergies
      .filter(
        (allergy) =>
          localAllergies.food.includes(allergy.id) &&
          allergy.id !== 'other_food'
      )
      .map((allergy) => allergy.id);

    const environmentalAllergiesSelected = environmentalAllergies
      .filter(
        (allergy) =>
          localAllergies.environmental.includes(allergy.id) &&
          allergy.id !== 'other_environmental'
      )
      .map((allergy) => allergy.id);

    const otherAllergiesSelected = otherAllergies
      .filter(
        (allergy) =>
          localAllergies.other.includes(allergy.id) && allergy.id !== 'other'
      )
      .map((allergy) => allergy.id);

    setFamilyAllergies({
      food: foodAllergiesSelected,
      environmental: environmentalAllergiesSelected,
      other: otherAllergiesSelected,
    });

    setOnboardingScreen('/(auth)/screens/onboarding/family/intermission');
    router.push('/(auth)/screens/onboarding/family/intermission');
  };

  // Update helper function to work with arrays
  const getSelectedAllergies = (
    allergyList: typeof foodAllergies,
    category: 'food' | 'environmental' | 'other'
  ) => {
    return allergyList.filter((allergy) =>
      localAllergies[category].includes(allergy.id)
    );
  };

  const selectedFoodAllergies = getSelectedAllergies(foodAllergies, 'food');
  const selectedEnvironmentalAllergies = getSelectedAllergies(
    environmentalAllergies,
    'environmental'
  );
  const selectedOtherAllergies = getSelectedAllergies(otherAllergies, 'other');

  if (family_has_allergies === null) {
    return (
      <ThemedView style={styles.container}>
        <Header variant='back' />

        <View style={styles.content}>
          <View style={styles.spacerTop} />
          <ProgressBar progress={0.3} />

          <ThemedText style={styles.title}>
            Does your family{'\n'}have any allergies?
          </ThemedText>

          <View style={styles.pillsContainer}>
            <Pill
              label='Yes'
              selected={false}
              onPress={() => setFamilyHasAllergies(true)}
            />
            <Pill
              label='No'
              selected={false}
              onPress={() =>
                router.push('/(auth)/screens/onboarding/family/interest')
              }
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button label='Skip' onPress={() => router.back()} variant='skip' />
          </View>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.3} />

        <ThemedText style={styles.title}>
          Does your family{'\n'}have any allergies?
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
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Food</ThemedText>
              <View style={styles.pillsContainer}>
                {foodAllergies.map((allergy) => (
                  <Pill
                    key={allergy.id}
                    label={allergy.label}
                    icon={allergy.icon}
                    selected={localAllergies.food.includes(allergy.id)}
                    onPress={() =>
                      allergy.id === 'other_food'
                        ? handleOtherPress('food')
                        : handleAllergyToggle(allergy.id, 'food')
                    }
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>
                Environmental Allergies
              </ThemedText>
              <View style={styles.pillsContainer}>
                {environmentalAllergies.map((allergy) => (
                  <Pill
                    key={allergy.id}
                    label={allergy.label}
                    icon={allergy.icon}
                    selected={localAllergies.environmental.includes(allergy.id)}
                    onPress={() =>
                      allergy.id === 'other_environmental'
                        ? handleOtherPress('environmental')
                        : handleAllergyToggle(allergy.id, 'environmental')
                    }
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>
                Other Allergies
              </ThemedText>
              <View style={styles.pillsContainer}>
                {otherAllergies.map((allergy) => (
                  <Pill
                    key={allergy.id}
                    label={allergy.label}
                    icon={allergy.icon}
                    selected={localAllergies.other.includes(allergy.id)}
                    onPress={() =>
                      allergy.id === 'other'
                        ? handleOtherPress('other')
                        : handleAllergyToggle(allergy.id, 'other')
                    }
                  />
                ))}
              </View>
            </View>
          </Animated.ScrollView>

          <LinearGradient
            colors={['rgba(255,255,255,0)', Colors.light.background]}
            style={styles.buttonGradient}
            pointerEvents='none'
          />
          <View style={styles.buttonContainer}>
            <Button label='Skip' onPress={() => router.back()} variant='skip' />
            <Button label='Next' onPress={handleNext} variant='compact' />
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
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 24,
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  optionButton: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#666666',
    marginBottom: 8,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
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
