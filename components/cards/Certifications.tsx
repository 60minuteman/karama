import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from './Image';

interface CertificationsProps {
  certifications?: any;
  data: any;
}

export const Certifications = ({
  certifications,
  data,
}: CertificationsProps) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: data?.caregiver_profile?.pictures[3]?.path }}
          style={styles.imagePlaceholder}
        />
      </View>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          My Certifications/Requirements
        </ThemedText>
        <View style={styles.pillsContainer}>
          {certifications.map((item: any, index: any) => (
            <Pill2
              key={index}
              icon={item.icon}
              label={item}
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
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
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
