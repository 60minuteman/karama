import { useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { Language, useUserStore } from '@/services/state/user';

// type Language = 
//   | 'Spanish' | 'French' | 'English' | 'German' | 'Hausa' | 'Italian'
//   | 'Russian' | 'Arabic' | 'Chinese' | 'Korean' | 'Japanese' | 'Yoruba'
//   | 'Afrikaans' | 'Hindi' | 'Dutch' | 'Estonian' | 'Croatian' | 'Swedish'
//   | 'Portugese' | 'Other';

export default function LanguageScreen() {
  const router = useRouter();
  const { caregiverLanguages, setCaregiverLanguages, setOnboardingScreen } = useUserStore()
  // const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);

  const languages: Language[] = [
    'English', 'Spanish', 'French', 'German', 'Hausa', 'Italian',
    'Russian', 'Arabic', 'Chinese', 'Korean', 'Japanese', 'Yoruba',
    'Afrikaans', 'Hindi', 'Dutch', 'Estonian', 'Croatian', 'Swedish',
    'Portuguese', 'Other'
  ];

  const toggleLanguageSelection = (label: Language) => {
    const prev = caregiverLanguages ?? [];
    const updatedLanguages = prev.includes(label)
      ? prev.filter((item) => item !== label)
      : [...prev, label];
    setCaregiverLanguages(updatedLanguages);
  };

  const handleNext = () => {
    if ((caregiverLanguages ?? [])?.length > 0) {
      setOnboardingScreen('/(auth)/screens/onboarding/caregiver/age');
      router.push('/(auth)/screens/onboarding/caregiver/age');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.85} />

        <ThemedText style={styles.title}>
          What language(s){'\n'}does your family{'\n'}speak?
        </ThemedText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pillsContainer}>
            {languages.map((language) => (
              <Pill
                key={language}
                label={language}
                icon="💬"
                selected={caregiverLanguages?.includes(language)}
                onPress={() => toggleLanguageSelection(language)}
              />
            ))}
          </View>

          <View style={styles.buttonSpacer} />
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            style={styles.buttonGradient}
          />
          <View style={styles.buttonContainer}>
            <Button
              label="Next"
              onPress={handleNext}
              variant="compact"
              disabled={caregiverLanguages?.length === 0}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  title: {
    fontFamily: 'Bogart',
    fontSize: 32,
    lineHeight: 40,
    color: '#002140',
    marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  buttonSpacer: {
    height: 100,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  buttonGradient: {
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    paddingBottom: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});