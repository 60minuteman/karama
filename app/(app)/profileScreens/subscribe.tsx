import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export default function Subscribe() {
  const features: Feature[] = [
    {
      icon: '⭐',
      title: 'Unlimited stars',
      description: 'Get unlimited likes to your favorite profiles'
    },
    {
      icon: '👥',
      title: 'Extended matched list',
      description: 'Get more than 3 profiles on your matched profile at a time'
    },
    {
      icon: '👀',
      title: 'See liked profiles',
      description: 'See caregivers that have interacted with your profile.'
    },
    {
      icon: '⏮️',
      title: 'View previous profile',
      description: 'Enable swiping backwards to view previous profiles'
    },
    {
      icon: '✅',
      title: 'Verified User',
      description: 'Become a verify user and get matched with verified users'
    }
  ];

  return (
    <ImageBackground 
      source={require('@/assets/images/subscribe-bg.png')}
      style={styles.backgroundImage}
    >
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton}
            onPress={() => router.push('/profile')}
        >
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/logo/karama-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <ThemedText style={styles.title}>
            Unlock exclusive features with Karama +
          </ThemedText>
        </View>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.planContainer}>
          <View style={styles.planHeader}>
            <ThemedText style={styles.planTitle}>Standard plan</ThemedText>
            <MaterialIcons name="check-circle" size={24} color="#FF6B00" />
          </View>
          <ThemedText style={styles.planDescription}>
            1 week free then, Pay $14.99 / month{'\n'}
            to enjoy our premium plan features
          </ThemedText>
        </View>

        <View style={styles.divider}>
            <View style={styles.dividerLine} />
          <ThemedText style={styles.dividerText}>What you get</ThemedText>
            <View style={styles.dividerLine} />
        </View>

          <View style={styles.featuresContent}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
                <ThemedText style={styles.featureIcon}>{feature.icon}</ThemedText>
              <View style={styles.featureContent}>
                <ThemedText style={styles.featureTitle}>{feature.title}</ThemedText>
                <ThemedText style={styles.featureDescription}>
                  {feature.description}
                </ThemedText>
              </View>
            </View>
          ))}
          </View>
        </ScrollView>

        <BlurView intensity={20} tint="dark" style={styles.footer}>
          <TouchableOpacity style={styles.subscribeButton}>
            <LinearGradient
              colors={['#FF6B00', '#FF3F00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <ThemedText style={styles.buttonText}>Get 1 month for $14.99</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
          <ThemedText style={styles.disclaimer}>
            You will be charged, your subscription will auto-renew for the same price and package length until you cancel via app store settings, and you agree to our terms
          </ThemedText>
        </BlurView>
    </SafeAreaView>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    paddingTop: 10,
    paddingHorizontal: 12,
    zIndex: 1,
    marginBottom: -40,
  },
  container: {
    flex: 1,
  },
  backButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Bogart-Bold',
    lineHeight: 36,

  },
  planContainer: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B00',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  planDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Poppins',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    marginHorizontal: 16,
  },
  featuresContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Poppins',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  subscribeButton: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Poppins',
    paddingHorizontal: 20,
    lineHeight: 15.6,
  },
});
