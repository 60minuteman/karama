import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface ObsessionProps {
  obsession?: string;
}

export const Obsession: React.FC<ObsessionProps> = ({
  obsession = 'Chickens! The kids love them and we just got two chicks named Bo & Sam.',
}) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Our current obsession is</ThemedText>
      <ThemedText style={styles.obsessionText}>{obsession}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#666666',
    marginBottom: 8,
  },
  obsessionText: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold',
    color: '#002140',
    lineHeight: 28,
  },
}); 