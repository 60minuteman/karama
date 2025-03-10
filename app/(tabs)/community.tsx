import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CommunityScreen() {
  return (
    <LinearGradient
      colors={['#FF8A00', '#FF4B55']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image 
          source={require('@/assets/icons/user-group.png')} 
          style={styles.icon}
        />
        <ThemedText style={styles.title}>Community</ThemedText>
        <ThemedText style={styles.subtitle}>Coming Soon</ThemedText>
        <ThemedText style={styles.description}>
        Get answers to your every question and give solutions to child related problems
        </ThemedText>
      </View>
      <View style={styles.phoneContainer}>
        <Image
          source={require('@/assets/images/xphone.png')}
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
    width: 500,
    height: 701,
    marginBottom: -300,
  },
});
