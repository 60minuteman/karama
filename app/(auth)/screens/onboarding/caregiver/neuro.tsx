import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';

const CONDITIONS = [
  'Dyslexia',
  'ADHD',
  'Autistic Spectrum',
  'Tourette Syndrome',
  'Down Syndrome',
  'Schizophrenia',
  'Misophonia',
  'Hearing Impaired',
  'Vision Impaired',
  'Biapolar',
];

export default function Page() {
  const [selection, setSelection] = useState<'yes' | 'no' | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" style={{ fontFamily: 'Bogart-Bold' }} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          Do you have experience working with neurodivergent or impaired children?
        </ThemedText>

        <View style={[styles.optionsContainer, { justifyContent: 'flex-end' }]}>
          <Pill
            label="Yes"
            onPress={() => setSelection('yes')}
            selected={selection === 'yes'}
          />
          <Pill
            label="No"
            onPress={() => setSelection('no')}
            selected={selection === 'no'}
          />
        </View>

        {selection === 'yes' && (
          <View style={styles.conditionsContainer}>
            {CONDITIONS.map((condition) => (
              <Pill
                key={condition}
                label={condition}
                onPress={() => toggleCondition(condition)}
                selected={selectedConditions.includes(condition)}
              />
            ))}
          </View>
        )}
        
        <View style={styles.spacerBottom} />
      </ScrollView>

      <View style={styles.bottomNav}>
        <Button
          label="Skip"
          onPress={() => router.push('/(auth)/screens/onboarding/caregiver/pet')}
          variant="skip"
        />
        <Button
          label="Next"
          onPress={() => router.push('/(auth)/screens/onboarding/caregiver/pet')}
          variant="compact"
          disabled={!selection}
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
  spacerBottom: {
    height: 40,
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
    gap: 12,
    marginBottom: 24,
  },
  conditionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40,
    backgroundColor: Colors.light.background,
  }
}); 