import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

type PlanType = 'monthly' | 'yearly';

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('monthly');
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground 
      source={require('@/assets/images/subscribe-bg.png')}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Image 
              source={require('@/assets/icons/back-white.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <View style={styles.content}>
            <Image 
              source={require('@/assets/icons/karama-plus2.png')}
              style={styles.logo}
            />
            
            <ThemedText style={styles.title}>
              Unlock exclusive features{'\n'}with Karama +
            </ThemedText>

            <View style={styles.plans}>
              <TouchableOpacity 
                style={[
                  styles.planCard,
                  selectedPlan === 'monthly' && styles.selectedPlan
                ]}
                onPress={() => setSelectedPlan('monthly')}
              >
                <View style={styles.planInfo}>
                  <ThemedText style={styles.planTitle}>Monthly plan</ThemedText>
                  <ThemedText style={styles.planDescription}>
                    1 week free then, Pay $19.99 / month{'\n'}
                    for a total of $240 per year to enjoy{'\n'}
                    our premium plan features
                  </ThemedText>
                </View>
                <View style={[
                  styles.checkCircle,
                  selectedPlan === 'monthly' && styles.selectedCheckCircle
                ]}>
                  {selectedPlan === 'monthly' && (
                    <Image 
                      source={require('@/assets/icons/check.png')}
                      style={styles.checkIcon}
                    />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.planCard,
                  selectedPlan === 'yearly' && styles.selectedPlan
                ]}
                onPress={() => setSelectedPlan('yearly')}
              >
                <View style={styles.planInfo}>
                  <View style={styles.yearlyTitleContainer}>
                    <ThemedText style={styles.planTitle}>Yearly plan</ThemedText>
                    <View style={styles.discountBadge}>
                      <LinearGradient
                        colors={['#EB4430', '#FF9900']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.discountGradient}
                      >
                        <ThemedText style={styles.discountText}>50% Off</ThemedText>
                      </LinearGradient>
                    </View>
                  </View>
                  <ThemedText style={styles.planDescription}>
                    1 week free then, Pay $119.88 / year{'\n'}
                    to enjoy our premium plan features
                  </ThemedText>
                </View>
                <View style={[
                  styles.checkCircle,
                  selectedPlan === 'yearly' && styles.selectedCheckCircle
                ]}>
                  {selectedPlan === 'yearly' && (
                    <Image 
                      source={require('@/assets/icons/check.png')}
                      style={styles.checkIcon}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.subscribeButton}>
              <LinearGradient
                colors={['#EB4430', '#FF9900']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                <ThemedText style={styles.subscribeButtonText}>
                  Get 1 month for $19.99
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>
            <ThemedText style={styles.termsText}>
              You will be charged, your subscription will auto-renew for the same price and package length until you cancel via app store settings, and you agree to our terms
            </ThemedText>
          </View>
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
    padding: 16,
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
    tintColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 36,
  },
  plans: {
    width: '100%',
    gap: 16,
  },
  planCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedPlan: {
    borderColor: '#FF4B55',
  },
  planInfo: {
    flex: 1,
  },
  yearlyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  planTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  discountBadge: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  discountGradient: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  planDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckCircle: {
    borderColor: '#FF4B55',
    backgroundColor: '#FF4B55',
  },
  checkIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  subscribeButton: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 18,
  },
}); 