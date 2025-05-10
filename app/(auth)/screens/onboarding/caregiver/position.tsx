import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { CaregiverPositions, useUserStore } from '@/services/state/user';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const POSITIONS = [
  { label: '⏰ Full Time' as const },
  { label: '⌛ Part Time' as const },
  { label: '🗓️ Occasionally' as const },
  { label: '🍹 Night Out' as const },
  { label: '🎒 After school Pickup' as const },
];

export default function PositionScreen() {
  const router = useRouter();
  // const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const {
    caregiverPreferredPositions,
    setCaregiverPreferredPositions,
    setOnboardingScreen,
  } = useUserStore();
  const togglePosition = (position: CaregiverPositions) => {
    const prev = caregiverPreferredPositions ?? [];
    const selectedPositions = prev.includes(position)
      ? prev.filter((item) => item !== position)
      : [...prev, position];
    setCaregiverPreferredPositions(selectedPositions);
  };

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/arrangements');
    router.push('/(auth)/screens/onboarding/caregiver/arrangements');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' titleStyle={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.9} />

        <ThemedText style={styles.title}>
          What positions are{'\n'}you open to{'\n'}considering?
        </ThemedText>

        <View style={styles.positionsContainer}>
          {POSITIONS.map((position) => (
            <View key={position.label} style={styles.pillWrapper}>
              <Pill
                label={position.label}
                selected={caregiverPreferredPositions?.includes(
                  position.label.split(' ').slice(1).join(' ')
                )}
                onPress={() =>
                  togglePosition(position.label.split(' ').slice(1).join(' '))
                }
              />
            </View>
          ))}
        </View>

        <View style={styles.bottomContainer}>
          <Button
            label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={caregiverPreferredPositions?.length === 0}
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
    marginBottom: 40,
    fontWeight: '600',
    marginTop: 20,
  },
  positionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pillWrapper: {
    alignSelf: 'flex-start',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
});
