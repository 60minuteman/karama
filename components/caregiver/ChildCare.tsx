import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Pill2 } from '../ui/Pill2';

interface ResponsibilityItem {
  label: string;
  icon: string;
}

interface ChildCareProps {
  childcareResponsibilities?: ResponsibilityItem[];
  householdResponsibilities?: ResponsibilityItem[];
}

export const ChildCare: React.FC<ChildCareProps> = ({
  childcareResponsibilities = [
    { label: 'Bathing', icon: '🛁' },
    { label: 'Tutoring', icon: '👨‍🏫' },
    { label: 'Play Dates', icon: '📈' },
    { label: 'Commuting', icon: '🚆' },
    { label: 'Packing Lunch', icon: '🍕' },
    { label: 'Bottle Feeding', icon: '🍼' },
    { label: 'Diaper Change', icon: '📎' },
    { label: 'Homework Help', icon: '📖' },
  ],
  householdResponsibilities = [
    { label: 'Cooking', icon: '🔍' },
    { label: 'Pet Care', icon: '🐾' },
    { label: 'Meal Prep', icon: '🥣' },
    { label: 'Laundry', icon: '🧺' },
    { label: 'Deep Housekeeping', icon: '💦' },
    { label: 'Household Budgeting', icon: '📊' },
    { label: 'Vendor/ Services Management', icon: '👨‍💼' },
  ],
}) => {
  const renderSection = (title: string, items: ResponsibilityItem[]) => (
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
      {renderSection('Childcare Responsibilities', childcareResponsibilities)}
      {renderSection('Household Responsibilities', householdResponsibilities)}
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
    gap: 12,
  },
  pill: {
    backgroundColor: '#F4F4F4',
    marginBottom: 8,
  },
}); 