import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { useUserStore } from '@/services/state/user';

export default function Page() {
  const { caregiverChildrenCount, setCaregiverChildrenCount, setOnboardingScreen } = useUserStore()
  // const [count, setCount] = useState(0);

  const increment = () => setCaregiverChildrenCount(caregiverChildrenCount + 1);
  const decrement = () => setCaregiverChildrenCount(Math.max(0, caregiverChildrenCount - 1));
  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/neuro')
    router.push('/(auth)/screens/onboarding/caregiver/neuro')
  }
  useEffect(()=>{console.log(caregiverChildrenCount)},[caregiverChildrenCount])
  return (
    <ThemedView style={styles.container}>
      <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          How many children{'\n'}are you willing to{'\n'}care for?
        </ThemedText>

        <View style={styles.counterContainer}>
          <Pill
            label="−"
            onPress={decrement}
            variant="counter"
          />

          <ThemedText style={styles.counterValue}>
            {caregiverChildrenCount}
          </ThemedText>

          <Pill
            label="+"
            onPress={increment}
            variant="counter" 
            disabled={caregiverChildrenCount === 4}

          />
        </View>
      </View>

      <View style={styles.bottomNav}>
        <View style={styles.buttonContainer}>
          <Button
            label="Next"
            onPress={handleNext}
            variant="compact"
            disabled={caregiverChildrenCount === 0}
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
  title: {
    fontSize: 32,
    lineHeight: 44,
    fontFamily: 'Bogart',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 40,
    marginTop: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  counterValue: {
    fontSize: 32,
    fontWeight: '600',
    color: '#0F172A',
    minWidth: 48,
    textAlign: 'center',
    fontFamily: 'Poppins',
    lineHeight: 44,
  },
  bottomNav: {
    padding: 20,
    paddingBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
}); 