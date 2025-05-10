import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface CaregiverImageProps {
  data?: string;
}

export const CaregiverImage: React.FC<CaregiverImageProps> = ({ 
  data
}) => {
  const imageSource = data
    ? { uri: data }
    : require('@/assets/icons/fallback.png');

  return (
    <View style={styles.container}>
      <Image 
        source={imageSource} 
        style={styles.image} 
        resizeMode='cover' 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 16,
  },
  image: {
    width: '100%',
    height: 325,
  },
});