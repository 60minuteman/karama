import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Pill2 } from '../ui/Pill2';

interface WeProps {
  children?: any;
  pets?: any;
  languages?: any;
  onToggle?: (section: string, item: string, value: boolean) => void;
}

export const We: React.FC<WeProps> = ({
  children = {},
  pets = {},
  languages = {},
  onToggle,
}) => {
  return (
    <View style={styles.container}>
      {/* Children section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>We have</ThemedText>
        <View style={styles.optionsContainer}>
          {children?.map((child: any, index: number) => (
            <Pill2
              key={index}
              label={child?.age_group}
              icon={
                child?.age_group == 'Pre Schooler' ||
                child?.age_group == 'Infant'
                  ? '👶'
                  : '🏫'
              }
              // style={styles.selectedPill}
            />
          ))}
        </View>
      </View>

      {/* Pets section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>We have</ThemedText>
        <View style={styles.optionsContainer}>
          {pets?.map((pet: any, index: number) => (
            <Pill2
              key={index}
              label={pet}
              icon={
                pet.toLowerCase().split(' ').includes('cat')
                  ? '😺'
                  : pet.toLowerCase().split(' ').includes('chicken')
                  ? '🐔'
                  : pet.toLowerCase().split(' ').includes('dog')
                  ? '🐕'
                  : '🐾'
              }
              style={pets.cat ? styles.selectedPill : undefined}
              onPress={
                onToggle ? () => onToggle('pets', 'cat', !pets.cat) : undefined
              }
            />
          ))}
        </View>
      </View>

      {/* Languages section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>We speak</ThemedText>
        <View style={styles.optionsContainer}>
          {languages?.map((language: any, index: number) => (
            <Pill2
              key={index}
              label={language}
              icon='💬'
              // style={languages.hausa ? styles.selectedPill : undefined}
              // onPress={
              //   onToggle
              //     ? () => onToggle('languages', 'hausa', !languages.hausa)
              //     : undefined
              // }
            />
          ))}
        </View>
      </View>
    </View>
  );
};

// Example usage
export const WeExample: React.FC = () => {
  const [state, setState] = useState({
    children: {
      infant: true,
      schoolAge: true,
    },
    pets: {
      cat: false,
      chicken: false,
      smallDog: false,
    },
    languages: {
      hausa: false,
      french: false,
      yoruba: false,
    },
  });

  const handleToggle = (section: string, item: string, value: boolean) => {
    setState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [item]: value,
      },
    }));
  };

  return (
    <We
      children={state.children}
      pets={state.pets}
      languages={state.languages}
      onToggle={handleToggle}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#666666',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedPill: {
    backgroundColor: '#E6F7FF',
    borderWidth: 1,
    borderColor: '#1890FF',
  },
});
