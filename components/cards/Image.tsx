import React from 'react';
import { Image as RNImage, StyleSheet, View } from 'react-native';

export const Image = ({ data }: any) => {
  return (
    <RNImage source={{ uri: data }} style={styles.image} resizeMode='cover' />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 325,
  },
});
