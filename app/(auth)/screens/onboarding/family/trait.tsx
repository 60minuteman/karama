import { useRouter } from 'expo-router';
import { StyleSheet, View, Switch, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Pill } from '@/components/ui/Pill';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function TraitScreen() {
  const router = useRouter();
  const [isDealbreaker, setIsDealbreaker] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

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
    { label: 'Organized', icon: '👨‍💼' }
  ];

  const handleTraitSelect = (trait: string) => {
    setSelectedTraits(prev => {
      if (prev.includes(trait)) {
        return prev.filter(t => t !== trait);
      }
      return [...prev, trait];
    });
  };

  const handleNext = () => {
    if (selectedTraits.length > 0) {
      router.push('/(auth)/screens/onboarding/family/age');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/screens/onboarding/family/age');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.3} />

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <ThemedText style={[styles.title, { fontFamily: 'Bogart-Bold' }]}>
              What personality{'\n'}traits would you like{'\n'}your caregiver to{'\n'}have ?
            </ThemedText>

            <View style={styles.traitsContainer}>
              {personalityTraits.map((trait, index) => (
                <Pill
                  key={index}
                  label={trait.label}
                  icon={trait.icon}
                  onPress={() => handleTraitSelect(trait.label)}
                  selected={selectedTraits.includes(trait.label)}
                />
              ))}
            </View>

            <View style={styles.dealbreakerContainer}>
              <ThemedText style={styles.dealbreakerText}>Dealbreaker</ThemedText>
              <Switch
                value={isDealbreaker}
                onValueChange={setIsDealbreaker}
                trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContainer}>
            <Button
              label="Skip"
              onPress={handleSkip}
              variant="skip"
            />
            <Button
              label="Next"
              onPress={handleNext}
              variant="compact"
              disabled={selectedTraits.length === 0}
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
    paddingTop: 40,
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
    justifyContent: 'space-between'
  }
});