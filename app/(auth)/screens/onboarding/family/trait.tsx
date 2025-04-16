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

export default function TraitScreen() {
  const router = useRouter();
  const { caregiver_traits, setCaregiverTraits, setOnboardingScreen } =
    useUserStore();
  const { selected_traits, is_dealbreaker } = caregiver_traits;

  const personalityTraits = [
    { label: 'Bubbly', icon: '🫧' },
    { label: 'Animated', icon: '🤹' },
    { label: 'Chill', icon: '🧘' },
    { label: 'Patient', icon: '😌' },
    { label: 'Wacky', icon: '🤪' },
    { label: 'Extroverted', icon: '🤩' },
    { label: 'Disciplined', icon: '📏' },
    { label: 'Introverted', icon: '😐' },
    { label: 'Thoughtful', icon: '🤔' },
    { label: 'Adventurous', icon: '🚀' },
    { label: 'Whimsical', icon: '🧚' },
    { label: 'Nurturing', icon: '🤗' },
    { label: 'Cool', icon: '😎' },
    { label: 'Organized', icon: '👨‍💼' },
  ];

  const handleTraitSelect = (trait: string) => {
    const newTraits = selected_traits.includes(trait)
      ? selected_traits.filter((t) => t !== trait)
      : [...selected_traits, trait];

    setCaregiverTraits({ selected_traits: newTraits });
  };

  const handleNext = () => {
    if (selected_traits.length > 0) {
      setOnboardingScreen('/(auth)/screens/onboarding/family/age');
      router.push('/(auth)/screens/onboarding/family/age');
    }
  };

  const handleSkip = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/age');
    router.push('/(auth)/screens/onboarding/family/age');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.3} />

        <ThemedText style={[styles.title, { fontFamily: 'Bogart-Semibold' }]}>
          What personality{'\n'}traits would you like{'\n'}your caregiver to
          {'\n'}have ?
        </ThemedText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <View style={styles.traitsContainer}>
              {personalityTraits.map((trait, index) => (
                <Pill
                  key={index}
                  label={trait.label}
                  icon={trait.icon}
                  onPress={() => handleTraitSelect(trait.label)}
                  selected={selected_traits.includes(trait.label)}
                />
              ))}
            </View>

            <View style={styles.dealbreakerContainer}>
              <ThemedText style={styles.dealbreakerText}>
                Dealbreaker
              </ThemedText>
              <Switch
                value={is_dealbreaker}
                onValueChange={(value) =>
                  setCaregiverTraits({ is_dealbreaker: value })
                }
                trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                thumbColor='#FFFFFF'
              />
            </View>
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContainer}>
            <Button label='Skip' onPress={handleSkip} variant='skip' />
            <Button
              label='Next'
              onPress={handleNext}
              variant='compact'
              disabled={selected_traits.length === 0}
            />
          </View>
        </LinearGradient>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  spacerTop: {
    height: 120,
  },
  mainContent: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Poppins',
    fontWeight: '600',
    marginBottom: 20,
    color: Colors.light.text,
    marginTop: 20,
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  traitPill: {
    marginBottom: 12,
  },
  highlightedPill: {
    backgroundColor: Colors.light.primary,
  },
  dealbreakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 10,
  },
  dealbreakerText: {
    fontSize: 16,
    color: Colors.light.text,
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
  buttonContainer: {
    marginBottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
