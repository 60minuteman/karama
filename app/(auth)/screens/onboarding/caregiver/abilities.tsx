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
import { CaregiverAbilities, CaregiverCertification, useUserStore } from '@/services/state/user';

const abilities = [
  { label: 'Can Travel' as const, icon: '✈️' },
  { label: 'Able To Drive' as const, icon: '🚗' },
  { label: 'First Aid' as const, icon: '🏥' },
  { label: 'Can Swim' as const, icon: '🏊' },
  { label: 'COVID Vaccination' as const, icon: '💉' },
  { label: 'CPR' as const, icon: '🫀' },
  { label: 'Other' as const, icon: '🎪' },
];

const certifications = [
  { label: 'Sign Language' as const, icon: '🤟' },
  { label: 'Administering Medication' as const, icon: '💊' },
  { label: 'Special Needs' as const, icon: '👨‍🦽' },
  { label: 'Condition Specific' as const, icon: '🧹' },
  { label: 'Feeding & Swallowing' as const, icon: '🍔' },
  { label: 'Registered Behaviour Technician' as const, icon: '😇' },
  { label: 'Other' as const, icon: '📄' },
];

export default function Page() {
  const {
    caregiverAbilities,
    setCaregiverAbilities,
    caregiverCertifications,
    setCaregiverCertification,
    setOnboardingScreen
  } = useUserStore()
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleAbilitiesSelection = (label: CaregiverAbilities) => {
    const prev = caregiverAbilities ?? [];
    const updatedAbilities = prev.includes(label)
      ? prev.filter((item) => item !== label) 
      : [...prev, label];
    setCaregiverAbilities(updatedAbilities); 
  };
  const toggleCertificationSelection = (label: CaregiverCertification) => {
    const prev = caregiverCertifications ?? [];
    const updatedCertification = prev.includes(label)
      ? prev.filter((item) => item !== label)
      : [...prev, label];
    setCaregiverCertification(updatedCertification);
  };
  const handleNext = ()=>{
     setOnboardingScreen('/(auth)/screens/onboarding/caregiver/language')
        router.push('/(auth)/screens/onboarding/caregiver/language')
  }
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
          <ThemedText style={styles.sectionTitle}>Abilities</ThemedText>
          <View style={styles.optionsContainer}>
            {abilities.map((option) => (
              <Pill
                key={option.label}
                label={option.label}
                icon={option.icon}
                onPress={() => toggleAbilitiesSelection(option.label)}
                selected={caregiverAbilities?.includes(option.label)}
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
                onPress={() => toggleCertificationSelection(option.label)}
                selected={caregiverCertifications?.includes(option.label)}
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
            onPress={handleNext}
            variant="skip"
          />
          <Button
            label="Next"
            onPress={handleNext}
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
    fontFamily: 'Bogart-Bold', // Changed to 'Bogart-Bold' for the header text
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