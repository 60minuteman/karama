import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';

export default function Page() {
  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.9} />

        <View style={styles.mainContent}>
          <ThemedText style={styles.title}>
            Let's explore amazing{'\n'}caregivers! 🤩
          </ThemedText>
        </View>

        <Image 
          source={require('@/assets/images/heart-pink.png')}
          style={styles.heartImageTop}
        />
        <Image 
          source={require('@/assets/images/heart-yellow.png')}
          style={styles.heartImageBottom}
        />
      </View>

      <View style={styles.bottomNav}>
        <View style={styles.buttonContainer}>
          <Button
            label="Finish"
            onPress={() => router.push('/(tabs)/discover')}
            variant="compact"
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  spacerTop: {
    height: 120,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 36,
    lineHeight: 44,
    fontFamily: 'Bogart-Bold',
    fontWeight: '600',
    color: '#002140',
    textAlign: 'left',
  },
  heartImageTop: {
    position: 'absolute',
    right: -60,
    top: 150,
    width: 164,
    height: 145,
    resizeMode: 'contain',
  },
  heartImageBottom: {
    position: 'absolute',
    left: -50,
    bottom: -50,
    width: 178,
    height: 178,
    resizeMode: 'contain',
  },
  bottomNav: {
    padding: 20,
    paddingBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
