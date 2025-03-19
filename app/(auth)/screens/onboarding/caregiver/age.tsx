import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const ageGroups = [
  ['Newborn', 'Infant'],
  ['Toddler', 'Pre Schooler'],
  ['School Age', 'Teenager'],
] as const;

const ageIcons = {
  Newborn: '👶',
  Infant: '🍼',
  Toddler: '🧸',
  'Pre Schooler': '✏️',
  'School Age': '🛴',
  Teenager: '🌈',
};

export default function Page() {
  const {caregiverAgeExperience,setCaregiverAgeExperience,setOnboardingScreen}=useUserStore()
  // const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [fontsLoaded] = useFonts({
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
  });
   const toggleAgesSelection = (label: string) => {
      const prev = caregiverAgeExperience?? [];
      const updatedAges = prev.includes(label)
        ? prev.filter((item) => item !== label) 
        : [...prev, label];
      setCaregiverAgeExperience(updatedAges); 
    };
  const handleNext = ()=>{
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/number')
    router.push('/(auth)/screens/onboarding/caregiver/number')
  }
  console.log(caregiverAgeExperience)

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={[styles.title, { fontFamily: 'Bogart-Bold' }]}>
          What ages do you{'\n'}have the most{'\n'}experience working{'\n'}with?
        </ThemedText>

        <View style={styles.optionsContainer}>
          {ageGroups.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((age) => (
                <Pill
                  key={age}
                  label={age}
                  icon={ageIcons[age as keyof typeof ageIcons]}
                  onPress={() => toggleAgesSelection(age)}
                  selected={caregiverAgeExperience?.includes(age)}
                  disabled ={caregiverAgeExperience?.length === 3} 
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomNav}>
        <View style={styles.buttonContainer}>
          <Button
            label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={!caregiverAgeExperience}
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
    fontSize: 32,
    lineHeight: 44,
    fontWeight: '600',
    color: '#002140',
    marginBottom: 40,
    marginTop: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  bottomNav: {
    padding: 20,
    paddingBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
