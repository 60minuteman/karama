import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Counter } from '@/components/ui/Counter';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type AgeGroup = {
  icon: string;
  label: string;
  count: number;
};

export default function FamilyNumberScreen() {
  const router = useRouter();
  const { family_age_groups, setFamilyAgeGroups, setOnboardingScreen } =
    useUserStore();
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([
    { icon: '🐣', label: 'Expecting', count: 0 },
    { icon: '👶', label: 'Newborn', count: 0 },
    { icon: '🍼', label: 'Infant', count: 0 },
    { icon: '🧸', label: 'Toddler', count: 0 },
    { icon: '✏️', label: 'Pre Schooler', count: 0 },
    { icon: '🛴', label: 'School Age', count: 0 },
    { icon: '👑', label: 'Teenager', count: 0 },
  ]);

  console.log('family_age_groups', family_age_groups);

  useEffect(() => {
    // Initialize from stored state if it exists
    if (family_age_groups) {
      setAgeGroups(family_age_groups);
    }
  }, []);

  const handleIncrement = (index: number) => {
    const newGroups = [...ageGroups];
    newGroups[index].count += 1;
    setAgeGroups(newGroups);
    setFamilyAgeGroups(newGroups);
  };

  const handleDecrement = (index: number) => {
    const newGroups = [...ageGroups];
    if (newGroups[index].count > 0) {
      newGroups[index].count -= 1;
      setAgeGroups(newGroups);
      setFamilyAgeGroups(newGroups);
    }
  };

  const totalChildren = ageGroups.reduce((sum, group) => sum + group.count, 0);

  const handleNext = () => {
    if (totalChildren > 0) {
      setOnboardingScreen('/(auth)/screens/onboarding/family/behaviour');
      router.push('/(auth)/screens/onboarding/family/behaviour');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.6} />

        <ThemedText style={styles.title}>
          How many children{'\n'}do you have and{'\n'}what are their age{'\n'}
          ranges?
        </ThemedText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.countersContainer}>
            {ageGroups.map((group, index) => (
              <Counter
                key={group.label}
                icon={group.icon}
                label={group.label}
                value={group.count}
                onIncrement={() => handleIncrement(index)}
                onDecrement={() => handleDecrement(index)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={[styles.buttonContainer, { paddingHorizontal: 22 }]}>
          <Button
            label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={totalChildren === 0}
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
  spacer: {
    height: 120,
  },
  title: {
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
  },
  countersContainer: {
    marginBottom: 40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
});
