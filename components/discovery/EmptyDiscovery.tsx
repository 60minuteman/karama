import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const EmptyDiscovery = ({ role }: { role: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/matches-empty.png')}
          style={styles.image}
        />
        <ThemedText style={styles.title}>
          No {role === 'FAMILY' ? 'Caregivers' : 'Families'} Yet
        </ThemedText>
        <ThemedText style={styles.description}>
          Your matches will appear here
        </ThemedText>
      </View>
    </View>
  );
};

export default EmptyDiscovery;

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
  },
});
