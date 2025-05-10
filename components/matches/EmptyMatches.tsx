import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export const EmptyMatches = () => {
  const handleNavigateToDiscover = () => {
    router.push('/(tabs)/discover');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/matches-empty.png')}
          style={styles.image}
        />
        <ThemedText style={styles.title}>No Matches Yet</ThemedText>
        <ThemedText style={styles.description}>
          Your matches will appear here
        </ThemedText>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToDiscover}>
          <ThemedText style={styles.buttonText}>Start Matching</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 243,
    height: 320,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold',
    color: '#002140',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 38,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#002140',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 60,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});
