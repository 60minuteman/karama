import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export default function Subscribe() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }

  const features: FeatureItem[] = [
    {
      icon: '⭐',
      title: 'Unlimited stars',
      description: 'Get unlimited stars to super like your favorite profile'
    },
    {
      icon: '☁️',
      title: 'Extended matched list', 
      description: 'Get more than 3 profiles on your matched profile at a time'
    },
    {
      icon: '👀',
      title: 'See liked profiles',
      description: 'See caregivers that have interacted with your profile.'
    },
    {
      icon: '🤳🏽',
      title: 'View previous profile',
      description: 'Enable swiping backwards to view previous profiles'
    },
    {
      icon: '☁️',
      title: 'Extended matched list',
      description: 'Get more than 3 profiles on your matched profile at a time'
    },
  ];

  return (
    <ImageBackground 
      source={require('@/assets/images/subscribe-bg.png')}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Image 
                source={require('@/assets/icons/back2.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.fixedContent}>
            <Image 
              source={require('@/assets/icons/karama-plus2.png')}
              style={styles.logo}
            />
            
            <ThemedText style={styles.title}>
              Unlock exclusive features{'\n'}with Karama +
            </ThemedText>
          </View>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
              <View style={styles.features}>
                {features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <ThemedText style={styles.featureIcon}>{feature.icon}</ThemedText>
                    <View style={styles.featureText}>
                      <ThemedText style={styles.featureTitle}>
                        {feature.title}
                      </ThemedText>
                      <ThemedText style={styles.featureDescription}>
                        {feature.description}
                      </ThemedText>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={styles.nextButton}
            onPress={() => router.push('/(app)/subscription-plans')}
          >
            <LinearGradient
              colors={['#EB4430', '#FF9900']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ThemedText style={styles.nextButtonText}>Next</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginTop: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  fixedContent: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 36,
  },
  features: {
    width: '100%',
    gap: 16,
    paddingBottom: 100,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  nextButton: {
    position: 'absolute',
    bottom: 14,
    left: 16,
    right: 16,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
});