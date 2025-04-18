import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Pill2 } from '../ui/Pill2';

interface CategoryItem {
  label: string;
  icon?: string;
}

interface DietsProps {
  familyImage?: string;
  diets?: CategoryItem[];
  householdRules?: CategoryItem[];
  childcarePhilosophy?: CategoryItem[];
}

export const Diets: React.FC<DietsProps> = ({
  familyImage = 'https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=2940&auto=format&fit=crop',
  diets = [
    { label: 'Sugar Free', icon: '🍉' },
    { label: 'Meat Eater', icon: '🍗' },
  ],
  householdRules = [
    { label: 'No Screens', icon: '🚫' },
    { label: 'No Hitting', icon: '👋' },
    { label: 'No Bullying', icon: '🐂' },
  ],
  childcarePhilosophy = [
    { label: 'Montesiori', icon: '🌈' },
  ],
}) => {
  const renderSection = (title: string, items: CategoryItem[]) => (
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
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: familyImage }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      {renderSection("Diets", diets)}
      {renderSection("Household Rules", householdRules)}
      {renderSection("Childcare Philosophy", childcarePhilosophy)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF'
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#666666',
    marginBottom: 16,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pill: {
    backgroundColor: '#F4F4F4',
    marginBottom: 8,
  },
}); 