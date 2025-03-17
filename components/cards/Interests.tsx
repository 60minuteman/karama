import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from './Image';

interface InterestsProps {
  interests: string[];
  data: any;
}

export const Interests = ({
  interests = [
    'Dance',
    'DIY',
    'Magic',
    'Gaming',
    'Painting',
    'Film Making',
    'Trumpet',
    'Piano',
    'Drama',
  ],
  data,
}: InterestsProps) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf'),
  });

  const interestIcons: { [key: string]: string } = {
    Dance: '🩰',
    DIY: '✨',
    Magic: '🪄',
    Gaming: '🎮',
    Painting: '🎨',
    'Film Making': '🎬',
    Trumpet: '🎺',
    Piano: '🎹',
    Drama: '🎭',
  };

  if (!fontsLoaded) {
    return null;
  }

  console.log('data=======', data?.caregiver_profile?.pictures[3]?.path);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <View style={styles.imagePlaceholder} /> */}
        <Image
          source={{ uri: data?.caregiver_profile?.pictures[3]?.path }}
          style={styles.imagePlaceholder}
        />
      </View>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>My Interests</ThemedText>
        <View style={styles.interestsContainer}>
          {interests.map((interest, index) => (
            <Pill2
              key={index}
              icon={interestIcons[interest]}
              label={interest}
              style={styles.interestPill}
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
    backgroundColor: '#FFE5E5', // Pastel pink as placeholder
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: 'rgba(38, 29, 42, 0.4)',
    marginBottom: 12,
    marginTop: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestPill: {
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});
