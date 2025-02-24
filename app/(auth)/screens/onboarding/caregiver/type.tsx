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

const caregiverTypes = [
  { label: 'Night Nurse', icon: '🌙' },
  { label: 'Governess', icon: '👩' },
  { label: 'Babysitter', icon: '🧁' },
  { label: 'Nanny', icon: '👶' },
  { label: 'Manny', icon: '👑' },
  { label: 'Au Pair', icon: '🗽' },
  { label: 'Caregiver/Housekeeper', icon: '🧽' },
  { label: 'Caregiver/Personal Assistant', icon: '📅' },
  { label: 'Caregiver/Household Manager', icon: '🗣' },
];

export default function Page() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <ThemedView style={styles.container}>
        <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          What type of{'\n'}caregiver are you
        </ThemedText>

        <View style={styles.optionsContainer}>
          {caregiverTypes.map((type, index) => (
            <Pill
              key={index}
              label={type.label}
              icon={type.icon}
              onPress={() => setSelectedType(type.label)}
              selected={selectedType === type.label}
              style={styles.option}
            />
          ))}
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Button
          label="Next"
          onPress={() => router.push('/(auth)/screens/onboarding/caregiver/experience')}
          variant="compact"
          style={styles.nextButton}
          disabled={!selectedType}
        />
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
    fontFamily: 'Bogart',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 40,
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  option: {
    backgroundColor: '#F8FAFC',
  },
  bottomNav: {
    padding: 20,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextButton: {
    backgroundColor: '#F45B69',
    borderRadius: 100,
  }
});
