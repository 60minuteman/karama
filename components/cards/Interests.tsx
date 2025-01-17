import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Pill2 } from '@/components/ui/Pill2';

interface InterestsProps {
  interests: string[];
}

export const Interests = ({
  interests = [
    "Dance",
    "DIY", 
    "Magic",
    "Gaming",
    "Painting",
    "Film Making",
    "Trumpet",
    "Piano",
    "Drama"
  ]
}: InterestsProps) => {
  const interestIcons: {[key: string]: string} = {
    "Dance": "🩰",
    "DIY": "✨",
    "Magic": "🪄", 
    "Gaming": "🎮",
    "Painting": "🎨",
    "Film Making": "🎬",
    "Trumpet": "🎺",
    "Piano": "🎹",
    "Drama": "🎭"
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder} />
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
    fontFamily: 'Poppins',
    fontWeight: '400',
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