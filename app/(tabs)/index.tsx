import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ForYouScreen() {
  return (
    <LinearGradient
      colors={['#FF8A00', '#FF4B55']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image 
          source={require('@/assets/icons/check-badge.png')} 
          style={styles.icon}
        />
        <ThemedText style={styles.title}>For You</ThemedText>
        <ThemedText style={styles.subtitle}>Coming Soon</ThemedText>
        <ThemedText style={styles.description}>
          Here you get top recommendations based on your profile
        </ThemedText>
      </View>
      <View style={styles.phoneContainer}>
        <Image
          source={require('@/assets/images/phone.png')}
          style={styles.phoneImage}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'Poppin',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
  },
  phoneContainer: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: -40,
  },
  phoneImage: {
    width: 342,
    height: 701,
    marginBottom: -300,
  },
});