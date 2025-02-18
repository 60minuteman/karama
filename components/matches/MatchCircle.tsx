import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

interface MatchCircleProps {
  imageUrl?: string; // Made optional since we'll use placeholder
  isActive?: boolean;
  onPress?: () => void;
}

export const MatchCircle = ({ imageUrl, isActive = false, onPress }: MatchCircleProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.container, isActive && styles.activeContainer]}>
        <Image 
          source={imageUrl ? { uri: imageUrl } : require('@/assets/images/profile-placeholder.png')} 
          style={styles.image} 
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FF4B55',
    overflow: 'hidden',
  },
  activeContainer: {
    borderWidth: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
}); 