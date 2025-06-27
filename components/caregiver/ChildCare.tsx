import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Pill2 } from '../ui/Pill2';

interface ResponsibilityItem {
  label: string;
  icon: string;
}

interface ChildCareProps {
  childcareResponsibilities?: any[];
  householdResponsibilities?: any[];
}

export const ChildCare: React.FC<ChildCareProps> = ({
  childcareResponsibilities,
  householdResponsibilities,
}) => {
  console.log('householdResponsibilities', householdResponsibilities);
  const renderSection = (title: string, items: ResponsibilityItem[]) => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.pillContainer}>
        {items
          .filter(
            (item: any) =>
              item && item !== 'Other' && item !== undefined && item !== null
          )
          .map((item: any, index) => {
            let icon = '📝'; // Default icon

            // Match icons from sample data
            if (item === 'Bathing') icon = '🛁';
            if (item === 'Feeding' || item === 'Bottle Feeding') icon = '🍼';
            if (item === 'Homework Help') icon = '📖';
            if (item === 'Cooking') icon = '🔍';
            if (item === 'Light Housekeeping') icon = '💦';
            if (item === 'Help with grocery shopping') icon = '🛒';
            if (item === 'Assist with bedtime routines') icon = '🌙';

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
      {childcareResponsibilities?.length > 0 &&
        renderSection('Childcare Responsibilities', childcareResponsibilities)}
      {householdResponsibilities?.length > 0 &&
        renderSection('Household Responsibilities', householdResponsibilities)}
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
    gap: 12,
  },
  pill: {
    backgroundColor: '#F4F4F4',
    marginBottom: 8,
  },
});
