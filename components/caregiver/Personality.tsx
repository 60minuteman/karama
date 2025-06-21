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
  personalityTraits?: any[];
  allergiesTitle?: string;
  allergies?: any[];
  experienceTitle?: string;
  experiences?: any[];
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
  experiences = [{ label: 'Dyslexia' }, { label: 'ADHD' }],
}) => {
  const renderSection = (title: string, items: TraitItem[]) => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.pillContainer}>
        {items
          .filter(
            (item: any) => item && item !== 'Other' && item !== 'undefined'
          )
          .map((item: any, index) => {
            let icon = '🎯'; // Default icon

            // Match personality traits and allergies with icons
            if (item === 'Bubbly') icon = '😊';
            else if (item === 'Patient') icon = '🧘';
            else if (item === 'No Screens-Be Kind') icon = '📱';
            else if (item === 'Vegan' || item === 'Vegetarian') icon = '🥗';
            else if (item === 'Sesame') icon = '🫘';
            else if (item === 'Animal Dander') icon = '🐾';
            else if (item === 'Perfume') icon = '🌸';
            else if (item === 'Medications') icon = '💊';

            return (
              <Pill2
                key={index}
                label={item}
                //  icon={icon}
                style={styles.pill}
              />
            );
          })}
      </View>
    </View>
  );

  console.log('personalityTraits', personalityTraits);
  console.log('allergies', allergies);
  console.log('experiences', experiences);

  return (
    <View style={styles.container}>
      {personalityTraits &&
        personalityTraits.length > 0 &&
        personalityTraits.some((item) => item !== null) &&
        renderSection(personalityTitle, personalityTraits)}
      {allergies &&
        allergies.length > 0 &&
        allergies.some((item) => item !== null) &&
        renderSection(allergiesTitle, allergies)}
      {experiences &&
        experiences.length > 0 &&
        experiences.some((item) => item !== null) &&
        renderSection(experienceTitle, experiences)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
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
