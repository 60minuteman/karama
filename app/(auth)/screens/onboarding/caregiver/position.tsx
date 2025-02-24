import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';

const POSITIONS = [
  { label: 'Full Time', icon: '⏰' },
  { label: 'Part Time', icon: '⌛' },
  { label: 'Occasionally', icon: '📅' },
  { label: 'Night Out', icon: '🍸' },
  { label: 'After school Pickup', icon: '🎒' },
];

export default function PositionScreen() {
  const router = useRouter();
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  const togglePosition = (position: string) => {
    setSelectedPositions(prev =>
      prev.includes(position)
        ? prev.filter(p => p !== position)
        : [...prev, position]
    );
  };

  const handleNext = () => {
    router.push('/(auth)/screens/onboarding/caregiver/arrangements');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />
      
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
                icon={position.icon}
                selected={selectedPositions.includes(position.label)}
                onPress={() => togglePosition(position.label)}
              />
            </View>
          ))}
        </View>

        <View style={styles.bottomContainer}>
          <Button
            label="Next"
            onPress={handleNext}
            variant="compact"
            disabled={selectedPositions.length === 0}
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
    fontFamily: 'Bogart',
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