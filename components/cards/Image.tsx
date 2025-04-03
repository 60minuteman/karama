import React from 'react';
import { Image as RNImage, StyleSheet, View } from 'react-native';

export const Image = ({ data }: any) => {
  const imageSource = data
    ? { uri: data }
    : require('@/assets/icons/fallback.png');

  return (
    <RNImage source={imageSource} style={styles.image} resizeMode='cover' />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 325,
  },
});
