import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

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
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Section title="I am">
        <Pill2
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
              <Pill2
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
              <Pill2
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
        <Pill2
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
    padding: 8,
    backgroundColor: '#ECEBEC',
    borderRadius: 10,
    alignSelf: 'flex-start',
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
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
});