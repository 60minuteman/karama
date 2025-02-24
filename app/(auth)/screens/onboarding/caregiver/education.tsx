import React, { useState } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';

const educationOptions = [
  { label: 'High School', icon: '🎓' },
  { label: 'In College', icon: '📚' },
  { label: 'Undergraduate Degree', icon: '🎓' },
  { label: 'In Grad School', icon: '📘' },
  { label: 'Graduate Degree', icon: '🎓' },
  { label: 'No Prefrence' },
];

export default function Page() {
  const [selectedEducation, setSelectedEducation] = useState<string | null>(null);
  const [showOnProfile, setShowOnProfile] = useState(false);

  return (
    <ThemedView style={styles.container}>
        <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          What is your highest{'\n'}level of education?
        </ThemedText>

        <View style={styles.optionsContainer}>
          {educationOptions.map((option) => (
            <Pill
              key={option.label}
              label={option.label}
              icon={option.icon}
              onPress={() => setSelectedEducation(option.label)}
              selected={selectedEducation === option.label}
              style={styles.option}
            />
          ))}
        </View>

        <View style={styles.toggleContainer}>
          <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
          <Switch
            value={showOnProfile}
            onValueChange={setShowOnProfile}
            trackColor={{ false: '#E2E8F0', true: '#F45B69' }}
            thumbColor={'#FFFFFF'}
          />
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Button
          label="Next"
          onPress={() => router.push('/(auth)/screens/onboarding/caregiver/abilities')}
          variant="compact"
          style={styles.nextButton}
          disabled={!selectedEducation}
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
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  toggleText: {
    fontSize: 16,
    color: '#0F172A',
    fontFamily: 'Poppins',
  },
  bottomNav: {
    padding: 20,
    paddingBottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextButton: {
    backgroundColor: '#F45B69',
    borderRadius: 100,
  }
}); 