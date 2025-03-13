import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';

type Philosophy =
  | 'Montessori'
  | 'Waldorf/ Steiner'
  | 'Harkness'
  | 'Sudbury'
  | 'Reggio Emillia'
  | 'Gentle Parenting'
  | 'Permissive Parenting'
  | 'Authoritative Parenting'
  | 'Baby Led-Weaning'
  | 'Authoritarian Parenting'
  | 'Other'
  | 'None';

export default function PhilosophyScreen() {
  const router = useRouter();
  const {
    family_philosophies,
    setFamilyPhilosophies,
    family_show_philosophy,
    setFamilyShowPhilosophy,
    setOnboardingScreen,
  } = useUserStore();

  const philosophies: { type: Philosophy; icon: string }[] = [
    { type: 'Montessori', icon: '🌈' },
    { type: 'Waldorf/ Steiner', icon: '🌈' },
    { type: 'Harkness', icon: '🌈' },
    { type: 'Sudbury', icon: '🌈' },
    { type: 'Reggio Emillia', icon: '🌈' },
    { type: 'Gentle Parenting', icon: '🌈' },
    { type: 'Permissive Parenting', icon: '🌈' },
    { type: 'Authoritative Parenting', icon: '🌈' },
    { type: 'Baby Led-Weaning', icon: '🌈' },
    { type: 'Authoritarian Parenting', icon: '🌈' },
    { type: 'Other', icon: '🌈' },
    { type: 'None', icon: '⛔' },
  ];

  const togglePhilosophy = (philo: Philosophy) => {
    if (philo === 'None') {
      setFamilyPhilosophies(['None']);
    } else {
      const newPhilos = family_philosophies.includes('None')
        ? [philo]
        : family_philosophies.includes(philo)
        ? family_philosophies.filter((p) => p !== philo)
        : [...family_philosophies, philo];
      setFamilyPhilosophies(newPhilos);
    }
  };

  const handleNext = () => {
    if (family_philosophies.includes('Other')) {
      setOnboardingScreen('/(auth)/screens/onboarding/family/otherPhilo');
      router.push('/(auth)/screens/onboarding/family/otherPhilo');
    } else {
      setOnboardingScreen('/(auth)/screens/onboarding/family/Allergies');
      router.push('/(auth)/screens/onboarding/family/Allergies');
    }
  };

  const handleOther = () => {
    router.push('/(auth)/screens/onboarding/family/otherPhilo');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.95} />

        <ThemedText style={styles.title}>
          Do you practice any{'\n'}educational or{'\n'}parenting{'\n'}
          philosophies?
        </ThemedText>

        <View style={styles.scrollViewContainer}>
          <LinearGradient
            colors={[Colors.light.background, `${Colors.light.background}00`]}
            style={styles.topGradient}
          />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.pillsContainer}>
              {philosophies.map(({ type, icon }) => (
                <Pill
                  key={type}
                  label={type}
                  icon={icon}
                  selected={family_philosophies.includes(type)}
                  onPress={() =>
                    type === 'Other' ? handleOther() : togglePhilosophy(type)
                  }
                />
              ))}
            </View>

            <View style={styles.toggleContainer}>
              <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
              <Switch
                value={family_show_philosophy}
                onValueChange={setFamilyShowPhilosophy}
                trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                thumbColor='#FFFFFF'
              />
            </View>

            <View style={styles.spacerBottom} />
          </ScrollView>

          <LinearGradient
            colors={[`${Colors.light.background}00`, Colors.light.background]}
            style={styles.buttonGradient}
          >
            <View style={styles.buttonContainer}>
              <Button label='Skip' onPress={handleNext} variant='compact' />
              <Button
                label='Next'
                onPress={handleNext}
                variant='compact'
                disabled={family_philosophies.length === 0}
              />
            </View>
          </LinearGradient>
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
  spacerBottom: {
    height: 100,
  },
  scrollViewContainer: {
    flex: 1,
    position: 'relative',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    marginTop: 20,
    fontWeight: '500',
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  toggleText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: Colors.light.text,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
