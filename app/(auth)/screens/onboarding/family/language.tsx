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

type Language = 
  | 'Spanish' | 'French' | 'English' | 'German' | 'Hausa' | 'Italian'
  | 'Russian' | 'Arabic' | 'Chinese' | 'Korean' | 'Japanese' | 'Yoruba'
  | 'Afrikaans' | 'Hindi' | 'Dutch' | 'Estonian' | 'Croatian' | 'Swedish'
  | 'Portugese' | 'Other';

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);

  const languages: Language[] = [
    'Spanish', 'French', 'English', 'German', 'Hausa', 'Italian',
    'Russian', 'Arabic', 'Chinese', 'Korean', 'Japanese', 'Yoruba',
    'Afrikaans', 'Hindi', 'Dutch', 'Estonian', 'Croatian', 'Swedish',
    'Portugese', 'Other'
  ];

  const toggleLanguage = (language: Language) => {
    setSelectedLanguages(prev => 
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleNext = () => {
    if (selectedLanguages.length > 0) {
      router.push('/(auth)/screens/onboarding/family/pet');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.85} />
        
        <View style={styles.scrollViewContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
            style={styles.topGradient}
          />
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <ThemedText style={styles.title}>
              What language(s){'\n'}does your family{'\n'}speak?
            </ThemedText>

            <View style={styles.pillsContainer}>
              {languages.map((language) => (
                <Pill
                  key={language}
                  label={language}
                  icon="💬"
                  selected={selectedLanguages.includes(language)}
                  onPress={() => toggleLanguage(language)}
                />
              ))}
            </View>
          </ScrollView>

          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            style={styles.buttonGradient}
          >
            <View style={styles.buttonContainer}>
              <Button
                label="Next"
                onPress={handleNext}
                variant="compact"
                disabled={selectedLanguages.length === 0}
              />
            </View>
          </LinearGradient>
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
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});