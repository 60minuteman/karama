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
import { StyleSheet, View } from 'react-native';

type Condition =
  | 'Dyslexia'
  | 'ADHD'
  | 'Autistic Spectrum'
  | 'Tourette Syndrome'
  | 'Down Syndrome'
  | 'Schizophrenia'
  | 'Misophonia'
  | 'Hearing Impaired'
  | 'Vision Impaired'
  | 'Bipolar'
  | 'Other';

export default function FamilyBehaviourScreen() {
  const router = useRouter();
  const { family_behaviour, setFamilyBehaviour, setOnboardingScreen } =
    useUserStore();

  const conditions: Condition[] = [
    'Dyslexia',
    'ADHD',
    'Autistic Spectrum',
    'Tourette Syndrome',
    'Down Syndrome',
    'Schizophrenia',
    'Misophonia',
    'Hearing Impaired',
    'Vision Impaired',
    'Bipolar',
    'Other',
  ];

  const handleSelect = (value: 'Yes' | 'No') => {
    setFamilyBehaviour({
      has_condition: value,
      conditions: value === 'No' ? [] : family_behaviour.conditions,
    });
  };

  const handleConditionToggle = (condition: Condition) => {
    const newConditions = family_behaviour.conditions.includes(condition)
      ? family_behaviour.conditions.filter((c) => c !== condition)
      : [...family_behaviour.conditions, condition];

    setFamilyBehaviour({ conditions: newConditions });
  };

  const handleNext = () => {
    if (
      family_behaviour.has_condition === 'No' ||
      (family_behaviour.has_condition === 'Yes' &&
        family_behaviour.conditions.length > 0)
    ) {
      setOnboardingScreen('/(auth)/screens/onboarding/family/hear');
      router.push('/(auth)/screens/onboarding/family/hear');
    }
  };

  const isNextDisabled =
    !family_behaviour.has_condition ||
    (family_behaviour.has_condition === 'Yes' &&
      family_behaviour.conditions.length === 0);

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.7} />

        <ThemedText style={styles.title}>
          Are there any{'\n'}developmental,{'\n'}learning, or{'\n'}behavioural
          {'\n'}differences in your{'\n'}child?
        </ThemedText>

        <View style={styles.optionsContainer}>
          <Pill
            label='Yes'
            selected={family_behaviour.has_condition === 'Yes'}
            onPress={() => handleSelect('Yes')}
          />
          <Pill
            label='No'
            selected={family_behaviour.has_condition === 'No'}
            onPress={() => handleSelect('No')}
          />
        </View>

        {family_behaviour.has_condition === 'Yes' && (
          <View style={styles.conditionsContainer}>
            {conditions.map((condition) => (
              <Pill
                key={condition}
                label={condition}
                selected={family_behaviour.conditions.includes(condition)}
                onPress={() => handleConditionToggle(condition)}
              />
            ))}
          </View>
        )}

        <View style={styles.buttonGradientContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            style={styles.buttonGradient}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                {family_behaviour.has_condition === 'Yes' && (
                  <Button label='Skip' onPress={handleNext} variant='skip' />
                )}
              </View>
              <Button
                label='Next'
                onPress={handleNext}
                variant='compact'
                disabled={isNextDisabled}
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
  spacer: {
    height: 120,
  },
  title: {
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  conditionsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  buttonGradientContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
  },
});
