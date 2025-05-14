import { ThemedText } from '@/components/ThemedText';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View,  } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../ui/Button';


const EmptyDiscovery = ({ role }: { role: string }) => {
   const handleNavigateToDiscover = () => {
      router.push('itsAmatch');
    };
  
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
        
        <Button
          onPress={handleNavigateToDiscover}
          label='Start Matching'
        />
        
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
