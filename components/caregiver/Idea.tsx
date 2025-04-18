import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface IdeaProps {
  title?: string;
  idea?: string;
}

export const Idea: React.FC<IdeaProps> = ({
  title = 'Our idea of a fun rainy day is',
  idea = 'Is going outside and splashing in the rain! We love jumping in puddles!',
}) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.ideaText}>{idea}</ThemedText>
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
  ideaText: {
    fontSize: 20,
    fontFamily: 'Bogart-Regular',
    color: '#002140',
    lineHeight: 32,
  },
}); 