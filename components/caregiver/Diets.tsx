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
  images?: any[];
}

export const Diets: React.FC<DietsProps> = ({
  familyImage = 'https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=2940&auto=format&fit=crop',
  images,
  diets,
  householdRules,
  childcarePhilosophy,
}) => {
  const renderSection = (title: string, items: CategoryItem[]) => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.pillContainer}>
        {items.map((item: any, index) => {
          let icon = '🎯'; // Default icon

          // Match diet/rule with appropriate icon
          if (item === 'No Screens-Be Kind') icon = '📱';
          else if (item === 'Vegan' || item === 'Vegetarian') icon = '🥗';
          else if (item === 'Bubbly') icon = '😊';
          else if (item === 'Patient') icon = '🧘';

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

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: images?.[2]?.path }}
          style={styles.image}
          resizeMode='cover'
        />
      </View>

      {renderSection('Diets', diets || [])}
      {renderSection('Household Rules', householdRules || [])}
      {/* {renderSection("Childcare Philosophy", childcarePhilosophy)} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
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
