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

const genderOptions = [
  ['Cisgender Female', 'Non Binary'],
  ['Gender Nutual', 'Gender Queer'],
  ['Transgender', 'Male'],
  ['Female', 'Prefer not to say'],
  ['Cisgender Male', 'Gender Fluid'],
  ['Other']
];

export default function Page() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          What best describes{'\n'}your gender?
        </ThemedText>

        <View style={styles.optionsContainer}>
          {genderOptions.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((option) => (
                <Pill
                  key={option}
                  label={option}
                  onPress={() => setSelectedGender(option)}
                  selected={selectedGender === option}
                  variant={selectedGender === option ? 'highlighted' : undefined}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Button
          label="Skip"
          onPress={() => router.push('/(auth)/screens/onboarding/caregiver/pronouns')}
          variant="skip"
        />
        <Button
          label="Next"
          onPress={() => router.push('/(auth)/screens/onboarding/caregiver/pronouns')}
          variant="compact"
          disabled={!selectedGender}
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
    justifyContent: 'flex-start',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  }
}); 