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
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

const pronounOptions = [
  {
    label: 'She/Her',
    emoji: '👱‍♀️'
  },
  {
    label: 'He/Him',
    emoji: '👨🏽'
  },
  {
    label: 'They/Them',
    emoji: '∞'
  }
];

export default function Page() {
  const [selectedPronouns, setSelectedPronouns] = useState<string | null>(null);
  const [showOnProfile, setShowOnProfile] = useState(false);
  const [fontsLoaded] = useFonts({
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
  });

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={[styles.title, { fontFamily: 'Bogart-Bold' }]}>
          What are your{'\n'}pronouns?
        </ThemedText>

        <View style={styles.optionsContainer}>
          {pronounOptions.map((option) => (
            <Pill
              key={option.label}
              label={`${option.emoji} ${option.label}`}
              onPress={() => setSelectedPronouns(option.label)}
              selected={selectedPronouns === option.label}
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
          label="Skip"
          onPress={() => router.push('/(auth)/screens/onboarding/caregiver/hear')}
          variant="skip"
        />
        <Button
          label="Next"
          onPress={() => router.push('/(auth)/screens/onboarding/caregiver/hear')}
          variant="compact"
          disabled={!selectedPronouns}
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
  pill: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  }
}); 