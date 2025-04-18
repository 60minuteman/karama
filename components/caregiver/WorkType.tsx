import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Pill2 } from '../ui/Pill2';

interface WorkTypeOption {
  label: string;
  icon: string;
}

interface WorkTypeProps {
  workType?: WorkTypeOption[];
  workOptions?: WorkTypeOption[];
  duration?: WorkTypeOption[];
  requirements?: WorkTypeOption[];
}

export const WorkType: React.FC<WorkTypeProps> = ({
  workType = [
    { label: 'Live Out', icon: '⏰' },
  ],
  workOptions = [
    { label: 'Full Time', icon: '🕐' },
  ],
  duration = [
    { label: 'Long Term', icon: '📋' },
  ],
  requirements = [
    { label: 'First Aid', icon: '🐱' },
    { label: 'Able To Drive', icon: '🚗' },
    { label: 'Can Swim', icon: '🏊' },
    { label: 'Can Travel', icon: '🌎' },
    { label: 'COVID Vaccination', icon: '💉' },
  ],
}) => {
  const renderSection = (title: string, options: WorkTypeOption[]) => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.pillContainer}>
        {options.map((option, index) => (
          <Pill2
            key={index}
            label={option.label}
            icon={option.icon}
            style={styles.pill}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderSection('Work Type', workType)}
      {renderSection('Work Options', workOptions)}
      {renderSection('Duration', duration)}
      {renderSection('Requirements', requirements)}
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