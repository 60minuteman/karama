import React from 'react';
import { StyleSheet, View, Image as RNImage } from 'react-native';

export const Image = () => {
  return (
    <RNImage
      source={require('@/assets/images/1.png')}
      style={styles.image}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 325,
  }
}); 