import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

interface ExperienceAndLanguagesProps {
  yearsOfExperience: string;
  languages: string[];
}

export const ExperienceAndLanguages = ({
  yearsOfExperience = "11-20 years",
  languages = ["Hausa", "Arbic", "Hindu"]
}: ExperienceAndLanguagesProps) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Section title="With an experience of">
        <Pill2
          label={yearsOfExperience}
          style={styles.experiencePill}
        />
      </Section>

      <Section title="I speak">
        <View style={styles.languagesContainer}>
          {languages.map((language, index) => (
            <Pill2
              key={index}
              icon="💬"
              label={language}
              style={styles.languagePill}
            />
          ))}
        </View>
      </Section>
    </View>
  );
};

const Section = ({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: 'rgba(38, 29, 42, 0.4)',
    marginBottom: 12,
  },
  experiencePill: {
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languagePill: {
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
}); 