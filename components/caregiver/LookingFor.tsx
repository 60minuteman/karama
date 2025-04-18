import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Pill2 } from '../ui/Pill2';

interface LookingForProps {
  title?: string;
  jobType?: {
    label: string;
    icon: string;
  };
  startDate?: string;
  hourlyRate?: string;
  education?: {
    label: string;
    icon: string;
  };
}

export const LookingFor: React.FC<LookingForProps> = ({
  title = 'We are looking for ..',
  jobType = { label: 'Nanny', icon: '👨‍⚕️' },
  startDate = '06/26/2024',
  hourlyRate = '$20 - $35',
  education = { label: 'Bachelors Degree', icon: '🎓' },
}) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      
      <View style={styles.section}>
        <Pill2
          label={jobType.label}
          icon={jobType.icon}
          style={styles.pill}
        />
      </View>
      
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Start Date</ThemedText>
        <Pill2
          label={startDate}
          style={styles.pill}
        />
      </View>
      
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Hourly Pay Rate</ThemedText>
        <Pill2
          label={hourlyRate}
          icon="💰"
          style={styles.pill}
        />
      </View>
      
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Education Level</ThemedText>
        <Pill2
          label={education.label}
          icon={education.icon}
          style={styles.pill}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 20,
    fontFamily: 'Bogart-Regular',
    color: '#002140',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#666666',
    marginBottom: 12,
  },
  pill: {
    backgroundColor: '#F4F4F4',
    alignSelf: 'flex-start',
  },
}); 