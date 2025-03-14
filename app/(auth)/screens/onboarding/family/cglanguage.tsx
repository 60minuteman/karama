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
import { ScrollView, StyleSheet, View } from 'react-native';

type Option = 'Yes, required' | 'Not required';

export default function CGLanguageScreen() {
  const router = useRouter();
  const {
    caregiver_language_required,
    setCaregiverLanguageRequired,
    setOnboardingScreen,
  } = useUserStore();

  console.log('caregiver_language_required', caregiver_language_required);

  const options: Option[] = ['Yes, required', 'Not required'];

  const handleNext = () => {
    if (caregiver_language_required) {
      setOnboardingScreen('/(auth)/screens/onboarding/family/requirements');
      router.push('/(auth)/screens/onboarding/family/requirements');
    }
  };

  const handleSkip = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/requirements');
    router.push('/(auth)/screens/onboarding/family/requirements');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.6} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <ThemedText style={styles.title}>
              Do you require{'\n'}caregivers to speak{'\n'}the same language(s)
              {'\n'}as your family?
            </ThemedText>

            <View style={styles.optionsContainer}>
              <View style={styles.pillsRow}>
                {options.map((option) => (
                  <Pill
                    key={option}
                    label={option}
                    selected={caregiver_language_required === option}
                    onPress={() => setCaregiverLanguageRequired(option)}
                  />
                ))}
              </View>
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
              disabled={!caregiver_language_required}
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
    marginBottom: 40,
    color: Colors.light.text,
    marginTop: 20,
  },
  optionsContainer: {
    alignItems: 'flex-end',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 12,
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
