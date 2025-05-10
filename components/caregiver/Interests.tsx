import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Pill2 } from '../ui/Pill2';

interface Interest {
  name: string;
  icon: string;
}

interface InterestsProps {
  title?: string;
  interests?: any[];
  images?: any[];
}

export const Interests: React.FC<InterestsProps> = ({
  title = "Children's Interests",
  images,
  interests = [
    { name: 'DIY', icon: '🧩' },
    { name: 'Dance', icon: '🩰' },
    { name: 'Painting', icon: '🎨' },
    { name: 'Bowling', icon: '🎳' },
    { name: 'Ice skating', icon: '⛸️' },
    { name: 'Drama', icon: '🎭' },
    { name: 'Hiking', icon: '👟' },
    { name: 'Polo', icon: '🐴' },
  ],
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: images[1]?.path,
          }}
          style={styles.image}
          resizeMode='cover'
        />
      </View>

      <ThemedText style={styles.title}>{title}</ThemedText>

      <View style={styles.interestsContainer}>
        {interests.map((interest, index) => {
          let icon = '🎯'; // Default icon

          // Match interest with appropriate icon from array
          if (interest === 'Painting') icon = '🎨';
          else if (interest === 'Singing') icon = '🎭';
          else if (interest === 'Piano' || interest === 'Guitar') icon = '🎵';
          else if (interest === 'Soccer' || interest === 'Basketball')
            icon = '⚽';
          else if (interest === 'Coding' || interest === 'Robotics')
            icon = '🤖';

          return (
            <Pill2
              key={index}
              label={interest}
              // icon={icon}
              style={styles.interestPill}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#666666',
    marginBottom: 16,
    marginLeft: 8,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginHorizontal: 4,
  },
  interestPill: {
    backgroundColor: '#F4F4F4',
    marginBottom: 8,
  },
});
