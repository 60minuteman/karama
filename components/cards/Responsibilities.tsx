import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';

interface ResponsibilitiesProps {
  childcareResponsibilities?: Array<{
    icon: string;
    label: string;
  }>;
  householdResponsibilities?: Array<{
    icon: string;
    label: string;
  }>;
}

export const Responsibilities = ({
  childcareResponsibilities = [
    { icon: '🛁', label: 'Bathing' },
    { icon: '🍎', label: 'Tutoring' },
    { icon: '📊', label: 'Play Dates' },
    { icon: '🚂', label: 'Commuting' },
    { icon: '🍕', label: 'Packing Lunch' },
    { icon: '🍼', label: 'Bottle Feeding' },
    { icon: '📝', label: 'Diaper Change' },
    { icon: '📖', label: 'Homework Help' },
  ],
  householdResponsibilities = [
    { icon: '🔍', label: 'Cooking' },
    { icon: '🐾', label: 'Pet Care' },
    { icon: '🥗', label: 'Meal Prep' },
    { icon: '👕', label: 'Laundry' },
    { icon: '🧹', label: 'Deep Housekeeping' },
    { icon: '📊', label: 'Household Budgeting' },
    { icon: '🏠', label: 'Vendor/ Services Management' },
  ]
}: ResponsibilitiesProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder} />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          Childcare Responsibilities
        </ThemedText>
        <View style={styles.pillsContainer}>
          {childcareResponsibilities.map((item, index) => (
            <Pill2
              key={index}
              icon={item.icon}
              label={item.label}
              style={styles.pill}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          Household Responsibilities
        </ThemedText>
        <View style={styles.pillsContainer}>
          {householdResponsibilities.map((item, index) => (
            <Pill2
              key={index}
              icon={item.icon}
              label={item.label}
              style={styles.pill}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  imageContainer: {
    marginHorizontal: -26,
    marginTop: -26,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: 325,
    backgroundColor: '#E8F3F3', // Pastel blue-green color
  },
  section: {
    marginBottom: 14, // Changed from 8 to 10
    marginTop: 24
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
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
    paddingHorizontal: 20,
  },
});