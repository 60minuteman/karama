import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';

const ageGroups = [
  ['Newborn', 'Infant'],
  ['Toddler', 'Pre Schooler'],
  ['School Age', 'Teenager'],
];

const ageIcons = {
  'Newborn': '👶',
  'Infant': '🍼',
  'Toddler': '🧸',
  'Pre Schooler': '✏️',
  'School Age': '🛴',
  'Teenager': '🌈',
};

export default function Page() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
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
                  onPress={() => setSelectedAge(age)}
                  selected={selectedAge === age}
                  style={styles.option}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomNav}>
        <View style={styles.buttonContainer}>
          <Button
            label="Next"
            onPress={() => router.push('/(auth)/screens/onboarding/caregiver/number')}
            variant="compact"
            disabled={!selectedAge}
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
    fontFamily: 'Poppins',
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
  }
}); 