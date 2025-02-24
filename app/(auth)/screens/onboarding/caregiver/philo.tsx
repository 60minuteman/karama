import { useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';

const PHILOSOPHIES = [
  { label: 'Montessori', icon: '🌈' },
  { label: 'Waldorf/ Steiner', icon: '🌈' },
  { label: 'Harkness', icon: '🌈' },
  { label: 'Sudbury', icon: '🌈' },
  { label: 'Reggio Emillia', icon: '🌈' },
  { label: 'Gentle Parenting', icon: '🌈' },
  { label: 'Permissive Parenting', icon: '🌈' },
];

export default function PhiloScreen() {
  const router = useRouter();
  const [hasExperience, setHasExperience] = useState<boolean | null>(null);
  const [selectedPhilosophies, setSelectedPhilosophies] = useState<string[]>([]);

  const togglePhilosophy = (philosophy: string) => {
    setSelectedPhilosophies(prev =>
      prev.includes(philosophy)
        ? prev.filter(p => p !== philosophy)
        : [...prev, philosophy]
    );
  };

  const handleNext = () => {
    router.push('/(auth)/screens/onboarding/caregiver/speak');
  };

  if (hasExperience === null) {
    return (
      <ThemedView style={styles.container}>
        <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />
        
        <View style={styles.content}>
          <View style={styles.spacerTop} />
          <ProgressBar progress={0.8} />
          
          <ThemedText style={styles.title}>
            Do you have{'\n'}experience with{'\n'}educational or{'\n'}parenting{'\n'}philosophies?
          </ThemedText>

          <View style={styles.optionsContainer}>
            <Pill
              label="Yes"
              onPress={() => setHasExperience(true)}
              selected={hasExperience === true}
              variant="primary"
            />
            <Pill
              label="No"
              onPress={() => setHasExperience(false)}
              selected={hasExperience === false}
            />
          </View>

          <View style={styles.bottomContainer}>
            <Button
              label="Skip"
              onPress={handleNext}
              variant="skip"
            />
          </View>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.8} />
        
        <ThemedText style={styles.title}>
          Do you have{'\n'}experience with{'\n'}educational or{'\n'}parenting{'\n'}philosophies?
        </ThemedText>

        <View style={styles.optionsContainer}>
          <Pill
            label="Yes"
            selected={true}
            variant="primary"
          />
          <Pill
            label="No"
            selected={false}
          />
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
                icon={philosophy.icon}
                selected={selectedPhilosophies.includes(philosophy.label)}
                onPress={() => togglePhilosophy(philosophy.label)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <Button
            label="Skip"
            onPress={handleNext}
            variant="skip"
          />
          <Button
            label="Next"
            onPress={handleNext}
            variant="compact"
            disabled={selectedPhilosophies.length === 0}
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
    justifyContent: 'space-between',
    backgroundColor: Colors.light.background,
  },
}); 