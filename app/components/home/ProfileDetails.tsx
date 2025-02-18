import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Pill } from '@/components/ui/Pill';

interface ProfileDetailsProps {
  role: string;
  experience: string[];
  lookingFor: string[];
  hourlyRate: string;
}

export const ProfileDetails = ({
  role = "Caregiver/Household Manager",
  experience = ["School Age", "Toddler", "Pre Schooler"],
  lookingFor = ["Full Time", "Long Term", "Live In"],
  hourlyRate = "$20 - $35"
}: ProfileDetailsProps) => {
  return (
    <View style={styles.container}>
      <Section title="I am">
        <Pill
          label={role}
          icon="👩"
          style={styles.pill}
        />
      </Section>

      <Section title="I have experience with">
        <View style={styles.pillsContainer}>
          {experience.map((exp, index) => {
            const icons = {
              "School Age": "🛴",
              "Toddler": "🧸", 
              "Pre Schooler": "✏️"
            };
            return (
              <Pill
                key={index}
                label={exp}
                icon={icons[exp as keyof typeof icons]}
                style={styles.pill}
              />
            );
          })}
        </View>
      </Section>

      <Section title="I'm Looking For">
        <View style={styles.pillsContainer}>
          {lookingFor.map((item, index) => {
            const icons = {
              "Full Time": "⏰",
              "Long Term": "📋",
              "Live In": "💤"
            };
            return (
              <Pill
                key={index}
                label={item}
                icon={icons[item as keyof typeof icons]}
                style={styles.pill}
              />
            );
          })}
        </View>
      </Section>

      <Section title="My Hourly Rate">
        <Pill
          label={hourlyRate}
          icon="⌛"
          style={styles.pill}
        />
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#666666',
    marginBottom: 16,
    fontFamily: 'Poppins',
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
});