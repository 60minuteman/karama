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
  interests?: Interest[];
}

export const Interests: React.FC<InterestsProps> = ({
  title = "Children's Interests",
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
          source={{ uri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2920&auto=format&fit=crop' }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <ThemedText style={styles.title}>{title}</ThemedText>
      
      <View style={styles.interestsContainer}>
        {interests.map((interest, index) => (
          <Pill2
            key={index}
            label={interest.name}
            icon={interest.icon}
            style={styles.interestPill}
          />
        ))}
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