import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';

export default function ExperienceScreen() {
  const router = useRouter();
  const { caregiver_experience, setCaregiverExperience, setOnboardingScreen } =
    useUserStore();
  const { selected_experience, is_dealbreaker } = caregiver_experience;

  const experienceOptions = [
    '1-11 months',
    '1-5 years',
    '6-10 years',
    '11-20 years',
    '21-30 years',
    '31 years+',
  ];

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/cglanguage');
    router.push('/(auth)/screens/onboarding/family/cglanguage');
  };

  const handleSkip = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/cglanguage');
    router.push('/(auth)/screens/onboarding/family/cglanguage');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.6} />

        <ThemedText style={styles.title}>
          How many years of{'\n'}experience do you{'\n'}require your{'\n'}
          caregiver to have?
        </ThemedText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <View style={styles.optionsContainer}>
              {experienceOptions.map((option, index) => (
                <Pill
                  key={index}
                  label={option}
                  onPress={() =>
                    setCaregiverExperience({ selected_experience: option })
                  }
                  selected={selected_experience === option}
                />
              ))}
            </View>

            <View style={styles.dealbreakerContainer}>
              <ThemedText style={styles.dealbreakerText}>
                Dealbreaker
              </ThemedText>
              <Switch
                value={is_dealbreaker}
                onValueChange={(value) =>
                  setCaregiverExperience({ is_dealbreaker: value })
                }
                trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                thumbColor='#FFFFFF'
              />
            </View>
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContainer}>
            <Button label='Skip' onPress={handleSkip} variant='skip' />
            <Button
              label='Next'
              onPress={handleNext}
              variant='compact'
              disabled={!selected_experience}
            />
          </View>
        </LinearGradient>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  spacerTop: {
    height: 120,
  },
  mainContent: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    marginBottom: 20,
    color: Colors.light.text,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  dealbreakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
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
    justifyContent: 'space-between',
  },
});
