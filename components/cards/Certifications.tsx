import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';

interface CertificationsProps {
  certifications?: Array<{
    icon: string;
    label: string;
  }>;
}

export const Certifications = ({
  certifications = [
    { icon: '🤲', label: 'CPR' },
    { icon: '🚨', label: 'First Aid' },
    { icon: '🚗', label: 'Able To Drive' },
    { icon: '🐓', label: 'Montesiori' },
    { icon: '🦽', label: 'Special Needs' },
    { icon: '🤟', label: 'Sign Language' },
    { icon: '💉', label: 'COVID Vaccination' },
  ]
}: CertificationsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder} />
      </View>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          My Certifications/Requirements
        </ThemedText>
        <View style={styles.pillsContainer}>
          {certifications.map((item, index) => (
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
    marginBottom: 14,
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