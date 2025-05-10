import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface OneThingProps {
  title?: string;
  description?: string;
}

export const OneThing: React.FC<OneThingProps> = ({
  title = 'One thing you have to know about us is',
  description = 'We love nature and we go hiking every Friday before dinner!',
}) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.description}>{description}</ThemedText>
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
  description: {
    fontSize: 20,
    fontFamily: 'Bogart-Regular',
    color: '#002140',
    lineHeight: 32,
  },
}); 