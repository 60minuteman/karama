import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Pill2 } from '../ui/Pill2';

interface BenefitItem {
  label: string;
  icon: string;
}

interface BenefitsProps {
  benefits?: BenefitItem[];
  youShouldKnowTitle?: string;
  youShouldKnowText?: string;
}

export const Benefits: React.FC<BenefitsProps> = ({
  benefits = [
    { label: 'Yearly Raise', icon: '💸' },
    { label: 'Maternity Leave', icon: '🤰' },
    { label: 'Health Insurance', icon: '🏥' },
    { label: 'Retirment Account', icon: '😲' },
    { label: 'Monthly Metro Card', icon: '🚇' },
  ],
  youShouldKnowTitle = 'You Should Know',
  youShouldKnowText = 'We are very outdoorsy and having a caregiver that shares the same love would be a huge plus!',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Benefits</ThemedText>
        <View style={styles.pillContainer}>
          {benefits.map((benefit, index) => (
            <Pill2
              key={index}
              label={benefit.label}
              icon={benefit.icon}
              style={styles.pill}
            />
          ))}
        </View>
      </View>

      <View style={styles.youShouldKnowSection}>
        <ThemedText style={styles.youShouldKnowTitle}>{youShouldKnowTitle}</ThemedText>
        <ThemedText style={styles.youShouldKnowText}>{youShouldKnowText}</ThemedText>
      </View>
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
    lineHeight: 32,
    color: '#666666',
    marginBottom: 12,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pill: {
    marginBottom: 8,
  },
  youShouldKnowSection: {
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 16,
    marginTop: 8,
  },
  youShouldKnowTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#EB4430',
    marginBottom: 8,
  },
  youShouldKnowText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#333333',
    lineHeight: 26,
  },
}); 