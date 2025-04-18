import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Pill2 } from '../ui/Pill2';

interface TraitItem {
  label: string;
  icon?: string;
}

interface PersonalityProps {
  personalityTitle?: string;
  personalityTraits?: TraitItem[];
  allergiesTitle?: string;
  allergies?: TraitItem[];
  experienceTitle?: string;
  experiences?: TraitItem[];
}

export const Personality: React.FC<PersonalityProps> = ({
  personalityTitle = 'Our personality is',
  personalityTraits = [
    { label: 'Wacky', icon: '😀' },
    { label: 'Animated', icon: '🤩' },
    { label: 'Chill', icon: '🧘' },
  ],
  allergiesTitle = 'Our child(ren) are allergic to',
  allergies = [
    { label: 'Nuts', icon: '🥜' },
    { label: 'Mold', icon: '🍄' },
    { label: 'Perfume', icon: '🌹' },
  ],
  experienceTitle = 'Caregiver experienced with',
  experiences = [
    { label: 'Dyslexia' },
    { label: 'ADHD' },
  ],
}) => {
  const renderSection = (title: string, items: TraitItem[]) => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.pillContainer}>
        {items.map((item, index) => (
          <Pill2
            key={index}
            label={item.label}
            icon={item.icon}
            style={styles.pill}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderSection(personalityTitle, personalityTraits)}
      {renderSection(allergiesTitle, allergies)}
      {renderSection(experienceTitle, experiences)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#666666',
    marginBottom: 12,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#F4F4F4',
    marginBottom: 4,
  },
}); 