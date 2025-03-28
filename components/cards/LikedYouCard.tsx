import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { BlurView } from 'expo-blur';

interface LikedYouCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    location: string;
    salary: string;
    rating: number;
    gender: 'She / Her' | 'He / Him';
    image: string | number; // Allow both URI strings and require() image numbers
  };
  isBlurred?: boolean;
  onPress?: () => void;
}

export const LikedYouCard = ({ 
  profile, 
  isBlurred = false,
  onPress 
}: LikedYouCardProps) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.card}
    >
      <ImageBackground 
        source={typeof profile.image === 'string' ? { uri: profile.image } : profile.image}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <BlurView intensity={20} style={styles.genderPill}>
              <ThemedText style={styles.genderText}>{profile.gender}</ThemedText>
            </BlurView>
            <View style={styles.ratingPill}>
              <ThemedText style={styles.rating}>{profile.rating}</ThemedText>
              <ThemedText style={styles.starIcon}>⭐</ThemedText>
            </View>
          </View>

          <View style={styles.footer}>
            <ThemedText style={styles.name}>
              {profile.name}, {profile.age}
            </ThemedText>
            <ThemedText style={[styles.location, styles.truncate]} numberOfLines={1}>
              {profile.location}
            </ThemedText>
            <ThemedText style={styles.salary}>
              {profile.salary}
            </ThemedText>
          </View>
        </View>
        {isBlurred && (
          <BlurView 
            intensity={20}
            style={StyleSheet.absoluteFill}
          />
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 171,
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F9F2F4', // Pastel pink background
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.3)', // Add semi-transparent overlay
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genderPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    paddingHorizontal: 6,
    paddingVertical: 4,
    overflow: 'hidden'
  },
  genderText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 4,
  },
  rating: {
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 0,
    fontFamily: 'Poppins',
  },
  starIcon: {
    fontSize: 12,
  },
  footer: {
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Bogart-Bold',
  },
  location: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
    fontFamily: 'Poppins_400Regular',
  },
  truncate: {
    width: '100%',
  },
  salary: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
    fontFamily: 'Poppins_400Regular',
  },
}); 