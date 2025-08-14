import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Switch, View } from 'react-native';

type Requirement =
  | '✈️ Can Travel'
  | '🚗 Able To Drive'
  | '⛑️ First Aid'
  | '🏊 Can Swim'
  | '💉 COVID Vaccination'
  | '👐 CPR';
// | '🏕️ Other';

type Certification =
  | '🤟 Sign Language'
  | '💊 Administering Medication'
  | '🦽 Special Needs'
  | '🦼 Condition Specific'
  | '🍔 Feeding & Swallowing'
  | '😇 Registered Behaviour Technician';
// | '📄 Other';

export default function RequirementsScreen() {
  const router = useRouter();
  const {
    caregiver_requirements,
    setCaregiverRequirements,
    setOnboardingScreen,
  } = useUserStore();
  const {
    selected_requirements,
    selected_certifications,
    requirements_dealbreaker,
    certifications_dealbreaker,
  } = caregiver_requirements;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  console.log(selected_requirements);
  console.log(selected_certifications);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const requirements: Array<{ label: Requirement }> = [
    { label: '✈️ Can Travel' },
    { label: '🚗 Able To Drive' },
    { label: '⛑️ First Aid' },
    { label: '🏊 Can Swim' },
    { label: '💉 COVID Vaccination' },
    { label: '👐 CPR' },
    // { label: '🏕️ Other' },
  ];

  const certifications: Array<{ label: Certification }> = [
    { label: '🤟 Sign Language' },
    { label: '💊 Administering Medication' },
    { label: '🦽 Special Needs' },
    { label: '🦼 Condition Specific' },
    { label: '🍔 Feeding & Swallowing' },
    { label: '😇 Registered Behaviour Technician' },
    // { label: '📄 Other' },
  ];

  const toggleRequirement = (req: Requirement) => {
    if (req === '🏕️ Other') {
      setOnboardingScreen('/(auth)/screens/onboarding/family/otherRequirement');
      router.push('/(auth)/screens/onboarding/family/otherRequirement');
      return;
    }

    if (selected_requirements.includes(req)) {
      const newRequirements = selected_requirements.filter((r) => r !== req);
      setCaregiverRequirements({ selected_requirements: newRequirements });
      return;
    }

    const totalSelections =
      selected_requirements.length + selected_certifications.length;
    if (totalSelections >= 6) {
      return;
    }

    const newRequirements = [...selected_requirements, req];
    setCaregiverRequirements({ selected_requirements: newRequirements });
  };

  const toggleCertification = (cert: Certification) => {
    if (cert === '📄 Other') {
      setOnboardingScreen(
        '/(auth)/screens/onboarding/family/otherCertification'
      );
      router.push('/(auth)/screens/onboarding/family/otherCertification');
      return;
    }

    if (selected_certifications.includes(cert)) {
      const newCertifications = selected_certifications.filter(
        (c) => c !== cert
      );
      setCaregiverRequirements({ selected_certifications: newCertifications });
      return;
    }

    const totalSelections =
      selected_requirements.length + selected_certifications.length;
    if (totalSelections >= 6) {
      return;
    }

    const newCertifications = [...selected_certifications, cert];
    setCaregiverRequirements({ selected_certifications: newCertifications });
  };

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/available');
    router.push('/(auth)/screens/onboarding/family/available');
  };

  const handleSkip = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/available');
    router.push('/(auth)/screens/onboarding/family/available');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.8} />

        <ThemedText style={[styles.title, { fontFamily: 'Bogart-Semibold' }]}>
          What requirements do you need caregivers to have?
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          You can choose up to 6 options
        </ThemedText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Requirements</ThemedText>
              <View style={styles.optionsContainer}>
                {requirements.map((req) => (
                  <Pill
                    key={req.label}
                    label={req.label}
                    selected={selected_requirements.includes(req.label)}
                    onPress={() => toggleRequirement(req.label)}
                  />
                ))}
              </View>
              <View style={styles.dealbreaker}>
                <ThemedText style={styles.dealbreakerText}>
                  Dealbreaker
                </ThemedText>
                <Switch
                  value={requirements_dealbreaker}
                  onValueChange={(value) =>
                    setCaregiverRequirements({
                      requirements_dealbreaker: value,
                    })
                  }
                  trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                  thumbColor='#FFFFFF'
                />
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>
                Certifications
              </ThemedText>
              <View style={styles.optionsContainer}>
                {certifications.map((cert) => (
                  <Pill
                    key={cert.label}
                    label={cert.label}
                    selected={selected_certifications.includes(cert.label)}
                    onPress={() => toggleCertification(cert.label)}
                  />
                ))}
              </View>
              <View style={styles.dealbreaker}>
                <ThemedText style={styles.dealbreakerText}>
                  Dealbreaker
                </ThemedText>
                <Switch
                  value={certifications_dealbreaker}
                  onValueChange={(value) =>
                    setCaregiverRequirements({
                      certifications_dealbreaker: value,
                    })
                  }
                  trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                  thumbColor='#FFFFFF'
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContainer}>
            {/* <Button label='Skip' onPress={handleSkip} variant='skip' /> */}
            <Button
              // label='Next'
              onPress={handleNext}
              variant='compact'
              disabled={
                selected_requirements.length === 0 &&
                selected_certifications.length === 0
              }
            />
          </View>
        </LinearGradient>
      </Animated.View>
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
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Poppins',
    fontWeight: '600',
    // marginBottom: 40,
    color: Colors.light.text,
    marginTop: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#666',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dealbreaker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingVertical: 10,
  },
  dealbreakerText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    marginBottom: 24,
    marginTop: 24,
  },
});
