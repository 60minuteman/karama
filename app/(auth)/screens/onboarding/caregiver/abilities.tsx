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
import { LinearGradient } from 'expo-linear-gradient';

const requirements = [
  { label: 'Can Travel', icon: '✈️' },
  { label: 'Able To Drive', icon: '🚗' },
  { label: 'First Aid', icon: '🏥' },
  { label: 'Can Swim', icon: '🏊' },
  { label: 'COVID Vaccination', icon: '💉' },
  { label: 'CPR', icon: '🫀' },
  { label: 'Other', icon: '🎪' },
];

const certifications = [
  { label: 'Sign Language', icon: '🤟' },
  { label: 'Administering Medication', icon: '💊' },
  { label: 'Special Needs', icon: '👨‍🦽' },
  { label: 'Condition Specific', icon: '🧹' },
  { label: 'Feeding & Swallowing', icon: '🍔' },
  { label: 'Registered Behaviour Technician', icon: '😇' },
  { label: 'Other', icon: '📄' },
];

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelection = (label: string) => {
    setSelectedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          What are your{'\n'}abilities and{'\n'}certifications?
        </ThemedText>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedText style={styles.sectionTitle}>Requirements</ThemedText>
          <View style={styles.optionsContainer}>
            {requirements.map((option) => (
              <Pill
                key={option.label}
                label={option.label}
                icon={option.icon}
                onPress={() => toggleSelection(option.label)}
                selected={selectedItems.includes(option.label)}
              />
            ))}
          </View>

          <ThemedText style={styles.sectionTitle}>Certifications</ThemedText>
          <View style={styles.optionsContainer}>
            {certifications.map((option) => (
              <Pill
                key={option.label}
                label={option.label}
                icon={option.icon}
                onPress={() => toggleSelection(option.label)}
                selected={selectedItems.includes(option.label)}
              />
            ))}
          </View>
          <View style={styles.scrollEndSpacer} />
        </ScrollView>
      </View>

      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
          pointerEvents="none"
        />
        <View style={styles.bottomNav}>
          <Button
            label="Skip"
            onPress={() => router.push('/(auth)/screens/onboarding/caregiver/language')}
            variant="skip"
          />
          <Button
            label="Next"
            onPress={() => router.push('/(auth)/screens/onboarding/caregiver/language')}
            variant="compact"
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  scrollEndSpacer: {
    height: 20,
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
  sectionTitle: {
    fontSize: 16,
    color: '#BEBAB9',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  gradientContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonGradient: {
    height: 120,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40,
  }
}); 