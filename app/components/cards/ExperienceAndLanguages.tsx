import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Pill } from '@/components/ui/Pill';

interface ExperienceAndLanguagesProps {
  yearsOfExperience: string;
  languages: string[];
}

export const ExperienceAndLanguages = ({
  yearsOfExperience = "11-20 years",
  languages = ["Hausa", "Arbic", "Hindu"]
}: ExperienceAndLanguagesProps) => {
  return (
    <View style={styles.container}>
      <Section title="With an experience of">
        <Pill
          label={yearsOfExperience}
          style={styles.experiencePill}
        />
      </Section>

      <Section title="I speak">
        <View style={styles.languagesContainer}>
          {languages.map((language, index) => (
            <Pill
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
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 32,
    fontFamily: 'Poppins',
    color: '#666666',
    marginBottom: 16,
  },
  experiencePill: {
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  languagePill: {
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
}); 