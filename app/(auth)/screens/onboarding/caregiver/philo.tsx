import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { CaregiverPhilosophies, useUserStore } from '@/services/state/user';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const PHILOSOPHIES = [
  { label: '🌈 Montessori' as const, icon: '🌈' },
  { label: '🌈 Waldorf/ Steiner' as const, icon: '🌈' },
  { label: '🌈 Harkness' as const, icon: '🌈' },
  { label: '🌈 Sudbury' as const, icon: '🌈' },
  { label: '🌈 Reggio Emillia' as const, icon: '🌈' },
  { label: '🌈 Gentle Parenting' as const, icon: '🌈' },
  { label: '🌈 Permissive Parenting' as const, icon: '🌈' },
  { label: '🌈 Other' as const, icon: '🌈' },
  // { label: '🚫 None' as const, icon: '🚫' },
];

export default function PhiloScreen() {
  const router = useRouter();
  const {
    hasPhilosophyExperience,
    setHasPhilosophyExperience,
    caregiverPhilosophyExperience,
    setCaregiverPhilosophyExperience,
    setOnboardingScreen,
  } = useUserStore();
  // const [hasExperience, setHasExperience] = useState<boolean | null>(null);
  // const [selectedPhilosophies, setSelectedPhilosophies] = useState<string[]>([]);

  const togglePhilosophy = (philosophy: CaregiverPhilosophies) => {
    if (philosophy === 'Other') {
      setOnboardingScreen('/(auth)/screens/onboarding/family/otherPhilo');
      router.push('/(auth)/screens/onboarding/family/otherPhilo');
      return;
    }

    if (philosophy === 'None') {
      setCaregiverPhilosophyExperience(['None']);
      setOnboardingScreen('/(auth)/screens/onboarding/caregiver/speak');
      router.push('/(auth)/screens/onboarding/caregiver/speak');
    } else {
      const prev = caregiverPhilosophyExperience ?? [];
      const isSelected = prev.includes(philosophy);

      // If the philosophy is already selected, remove it
      if (isSelected) {
        const selectedPhilosophies = prev.filter((item) => item !== philosophy);
        setCaregiverPhilosophyExperience(selectedPhilosophies);
      } else {
        // If not selected, add it if the total selected is less than 4
        if (prev.length < 4) {
          const selectedPhilosophies = [...prev, philosophy];
          setCaregiverPhilosophyExperience(selectedPhilosophies);
        }
      }
    }
  };

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/speak');
    router.push('/(auth)/screens/onboarding/caregiver/speak');
  };

  if (hasPhilosophyExperience === null) {
    return (
      <ThemedView style={styles.container}>
        <Header variant='back' />

        <View style={styles.content}>
          <View style={styles.spacerTop} />
          <ProgressBar progress={0.8} />

          <ThemedText style={styles.title}>
            Do you have{'\n'}experience with{'\n'}educational or{'\n'}parenting
            {'\n'}philosophies?
          </ThemedText>

          <View style={styles.optionsContainer}>
            <Pill
              label='Yes'
              onPress={() => setHasPhilosophyExperience('yes')}
              selected={hasPhilosophyExperience === 'yes'}
            />
            <Pill
              label='No'
              onPress={() => {
                setHasPhilosophyExperience('no');
                setCaregiverPhilosophyExperience([]);
              }}
              selected={hasPhilosophyExperience === 'no'}
            />
          </View>

          <View style={styles.bottomContainer}>
            <Button label='Skip' onPress={handleNext} variant='skip' />
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
        <ProgressBar progress={0.8} />

        <ThemedText style={styles.title}>
          Do you have{'\n'}experience with{'\n'}educational or{'\n'}parenting
          {'\n'}philosophies?
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          You can select up to 4 options
        </ThemedText>

        <View style={styles.optionsContainer}>
          <Pill label='Yes' selected={true} />
          <Pill label='No' selected={false} onPress={handleNext} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.philosophiesContainer}>
            {PHILOSOPHIES.map((philosophy) => (
              <Pill
                key={philosophy.label}
                label={philosophy.label}
                // icon={philosophy.icon}
                selected={caregiverPhilosophyExperience?.includes(
                  philosophy.label
                )}
                onPress={() => togglePhilosophy(philosophy.label)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          {/* <Button label='Skip' onPress={handleNext} variant='skip' /> */}
          <Button
            // label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={caregiverPhilosophyExperience?.length === 0}
          />
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
  title: {
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 44,
    color: Colors.light.text,
    // marginBottom: 40,
    fontWeight: '600',
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  philosophiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.light.background,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    marginBottom: 24,
    marginTop: 24,
  },
});
