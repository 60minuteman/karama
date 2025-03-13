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

export default function AgeScreen() {
  const router = useRouter();
  const { caregiver_age, setCaregiverAge, setOnboardingScreen } =
    useUserStore();
  const { has_preference, selected_age_range, is_dealbreaker } = caregiver_age;
  const [showAgeRanges, setShowAgeRanges] = useState(has_preference === 'yes');

  const ageRanges = [
    '18 - 25 years old',
    '26 - 30 years old',
    '31 - 40 years old',
    '41 - 50 years old',
    '50 years+',
  ];

  const handleInitialChoice = (choice: 'yes' | 'no') => {
    setCaregiverAge({ has_preference: choice });
    if (choice === 'yes') {
      setShowAgeRanges(true);
    } else {
      setOnboardingScreen('/(auth)/screens/onboarding/family/experience');
      router.push('/(auth)/screens/onboarding/family/experience');
    }
  };

  const handleAgeSelect = (range: string) => {
    setCaregiverAge({ selected_age_range: range });
  };

  const handleNext = () => {
    if (showAgeRanges && selected_age_range) {
      setOnboardingScreen('/(auth)/screens/onboarding/family/experience');
      router.push('/(auth)/screens/onboarding/family/experience');
    }
  };

  const handleSkip = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/experience');
    router.push('/(auth)/screens/onboarding/family/experience');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.4} />

        <ThemedText style={styles.title}>
          Do you require your{'\n'}caregiver to be{'\n'}within a certain age
          {'\n'}range?
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          (This will not be visible on your profile)
        </ThemedText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <View style={styles.initialChoiceContainer}>
              <View style={styles.spacer} />
              <Pill
                label='Yes'
                onPress={() => handleInitialChoice('yes')}
                selected={has_preference === 'yes'}
              />
              <Pill
                label='No Preference'
                onPress={() => handleInitialChoice('no')}
                selected={has_preference === 'no'}
              />
            </View>

            {showAgeRanges && (
              <View style={styles.ageRangesContainer}>
                <View style={styles.ageRangesGrid}>
                  {ageRanges.map((range, index) => (
                    <View key={index} style={styles.ageRangeWrapper}>
                      <Pill
                        label={range}
                        onPress={() => handleAgeSelect(range)}
                        selected={selected_age_range === range}
                      />
                    </View>
                  ))}
                </View>

                <View style={styles.dealbreakerContainer}>
                  <ThemedText style={styles.dealbreakerText}>
                    Dealbreaker
                  </ThemedText>
                  <Switch
                    value={is_dealbreaker}
                    onValueChange={(value) =>
                      setCaregiverAge({ is_dealbreaker: value })
                    }
                    trackColor={{
                      false: '#E8E8E8',
                      true: Colors.light.primary,
                    }}
                    thumbColor='#FFFFFF'
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContainer}>
            <Button label='Skip' onPress={handleSkip} variant='skip' />
            {showAgeRanges && (
              <Button
                label='Next'
                onPress={handleNext}
                variant='compact'
                disabled={!selected_age_range}
              />
            )}
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
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.light.text,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  initialChoiceContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    justifyContent: 'flex-end',
  },
  spacer: {
    flex: 1,
  },
  ageRangesContainer: {
    gap: 24,
  },
  ageRangesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  ageRangeWrapper: {
    flexGrow: 0,
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
