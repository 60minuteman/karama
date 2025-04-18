import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Pill2 } from '../ui/Pill2';

interface WeProps {
  children?: {
    infant?: boolean;
    schoolAge?: boolean;
  };
  pets?: {
    cat?: boolean;
    chicken?: boolean;
    smallDog?: boolean;
  };
  languages?: {
    hausa?: boolean;
    french?: boolean;
    yoruba?: boolean;
  };
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
          <Pill2
            label="Infant"
            icon="👶"
            style={children.infant ? styles.selectedPill : undefined}
            onPress={onToggle ? () => onToggle('children', 'infant', !children.infant) : undefined}
          />
          <Pill2
            label="School Age"
            icon="🏫"
            style={children.schoolAge ? styles.selectedPill : undefined}
            onPress={onToggle ? () => onToggle('children', 'schoolAge', !children.schoolAge) : undefined}
          />
        </View>
      </View>

      {/* Pets section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>We have</ThemedText>
        <View style={styles.optionsContainer}>
          <Pill2
            label="Cat"
            icon="😺"
            style={pets.cat ? styles.selectedPill : undefined}
            onPress={onToggle ? () => onToggle('pets', 'cat', !pets.cat) : undefined}
          />
          <Pill2
            label="Chicken"
            icon="🐔"
            style={pets.chicken ? styles.selectedPill : undefined}
            onPress={onToggle ? () => onToggle('pets', 'chicken', !pets.chicken) : undefined}
          />
          <Pill2
            label="Small Dog"
            icon="🐕"
            style={pets.smallDog ? styles.selectedPill : undefined}
            onPress={onToggle ? () => onToggle('pets', 'smallDog', !pets.smallDog) : undefined}
          />
        </View>
      </View>

      {/* Languages section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>We speak</ThemedText>
        <View style={styles.optionsContainer}>
          <Pill2
            label="Hausa"
            icon="💬"
            style={languages.hausa ? styles.selectedPill : undefined}
            onPress={onToggle ? () => onToggle('languages', 'hausa', !languages.hausa) : undefined}
          />
          <Pill2
            label="French"
            icon="💬"
            style={languages.french ? styles.selectedPill : undefined}
            onPress={onToggle ? () => onToggle('languages', 'french', !languages.french) : undefined}
          />
          <Pill2
            label="Yoruba"
            icon="💬"
            style={languages.yoruba ? styles.selectedPill : undefined}
            onPress={onToggle ? () => onToggle('languages', 'yoruba', !languages.yoruba) : undefined}
          />
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
    setState(prev => ({
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