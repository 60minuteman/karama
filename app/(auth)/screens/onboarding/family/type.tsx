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

export default function TypeScreen() {
  const router = useRouter();
  const { caregiver_type, setCaregiverType, setOnboardingScreen } =
    useUserStore();
  const { selected_type, is_dealbreaker } = caregiver_type;

  const caregiverTypes = [
    { label: 'Night Nurse', icon: '🌙' },
    { label: 'Governess', icon: '👩' },
    { label: 'Babysitter', icon: '🧁' },
    { label: 'Nanny', icon: '👶' },
    { label: 'Manny', icon: '👑' },
    { label: 'Au Pair', icon: '🗽' },
    { label: 'Caregiver/Housekeeper', icon: '🥜' },
    { label: 'Caregiver/Personal Assistant', icon: '📅' },
    { label: 'Caregiver/Household Manager', icon: '🗣' },
  ];

  const handleTypeSelect = (type: string) => {
    setCaregiverType({ selected_type: type });
  };

  const handleNext = () => {
    if (selected_type) {
      setOnboardingScreen('/(auth)/screens/onboarding/family/trait');
      router.push('/(auth)/screens/onboarding/family/trait');
    }
  };

  const handleSkip = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/trait');
    router.push('/(auth)/screens/onboarding/family/trait');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />
      <Button
        label='Skip'
        onPress={handleSkip}
        variant='skip'
        style={styles.skipButton}
      />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.3} />

        <ThemedText style={styles.title}>
          What type of{'\n'}caregiver are you{'\n'}seeking?
        </ThemedText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <View style={styles.typesContainer}>
              {caregiverTypes.map((type, index) => (
                <Pill
                  key={index}
                  label={type.label}
                  icon={type.icon}
                  onPress={() => handleTypeSelect(type.label)}
                  selected={selected_type === type.label}
                  style={[
                    styles.typePill,
                    (type.label === 'Caregiver/Housekeeper' ||
                      type.label === 'Caregiver/Household Manager') &&
                      styles.highlightedPill,
                  ]}
                />
              ))}
            </View>

            <View style={styles.dealbreakerContainer}>
              <ThemedText style={styles.dealbreakerText}>
                Dealbreaker
              </ThemedText>
              <Switch
                value={is_dealbreaker}
                onValueChange={(value) =>
                  setCaregiverType({ is_dealbreaker: value })
                }
                trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                thumbColor='#FFFFFF'
              />
            </View>
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContainer}>
            <Button
              label='Next'
              onPress={handleNext}
              variant='compact'
              disabled={!selected_type}
            />
          </View>
        </LinearGradient>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  spacerTop: {
    height: 80,
  },
  bottomSpacer: {
    height: 40,
  },
  mainContent: {
    flex: 1,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    marginBottom: 30,
    color: Colors.light.text,
    marginTop: 20,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typePill: {
    marginBottom: 12,
  },
  highlightedPill: {
    backgroundColor: Colors.light.primary,
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  dealbreakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 10,
  },
  dealbreakerText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
