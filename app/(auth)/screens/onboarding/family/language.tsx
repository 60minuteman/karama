import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { Language, useUserStore } from '@/services/state/user';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

const languages: Language[] = [
  'English',
  'Spanish',
  'French',
  'German',
  'Hausa',
  'Italian',
  'Russian',
  'Arabic',
  'Chinese',
  'Korean',
  'Japanese',
  'Yoruba',
  'Afrikaans',
  'Hindi',
  'Dutch',
  'Estonian',
  'Croatian',
  'Swedish',
  'Portuguese',
  'Other',
];

export default function LanguageScreen() {
  const router = useRouter();
  const { family_languages, setFamilyLanguages, setOnboardingScreen } =
    useUserStore();

  const toggleLanguage = (language: Language) => {
    if (language === 'Other') {
      setOnboardingScreen('/(auth)/screens/onboarding/family/otherLanguage');
      router.push('/(auth)/screens/onboarding/family/otherLanguage');
      return;
    }

    // Check if trying to add a new language when already at max (6)
    if (!family_languages.includes(language) && family_languages.length >= 6) {
      return; // Don't allow adding more than 6 languages
    }

    const newLanguages = family_languages.includes(language)
      ? family_languages.filter((l) => l !== language)
      : [...family_languages, language];
    setFamilyLanguages(newLanguages);
  };

  const handleNext = () => {
    if (family_languages.length > 0) {
      setOnboardingScreen('/(auth)/screens/onboarding/family/pet');
      router.push('/(auth)/screens/onboarding/family/pet');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.85} />

        <ThemedText style={styles.title}>
          What language(s){'\n'}does your family{'\n'}speak?
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          You can choose up to 6 options
        </ThemedText>

        <View style={styles.scrollViewContainer}>
          <LinearGradient
            colors={[Colors.light.background, 'rgba(255,255,255,0)']}
            style={styles.topGradient}
            pointerEvents='none'
          />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.pillsContainer}>
              {languages.map((language) => (
                <Pill
                  key={language}
                  label={`💬 ${language}`}
                  selected={family_languages.includes(language)}
                  onPress={() => toggleLanguage(language)}
                  disabled={
                    !family_languages.includes(language) &&
                    family_languages.length >= 6
                  }
                />
              ))}
            </View>
            <View style={styles.scrollBottomPadding} />
          </ScrollView>

          <LinearGradient
            colors={['rgba(255,255,255,0)', Colors.light.background]}
            style={styles.buttonGradient}
            pointerEvents='none'
          />
          <View style={styles.buttonContainer}>
            <Button
              // label='Next'
              onPress={handleNext}
              variant='compact'
              disabled={family_languages.length === 0}
            />
          </View>
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
  title: {
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 24,
    marginTop: 20,
    fontWeight: '500',
  },
  scrollViewContainer: {
    flex: 1,
    position: 'relative',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 24,
  },
  pill: {
    marginBottom: 10,
  },
  scrollBottomPadding: {
    height: 100,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    // marginBottom: 24,
    // marginTop: 10,
  },
});
