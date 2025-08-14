import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

type Source =
  | 'TikTok'
  | 'Instagram'
  | 'Facebook'
  | 'YouTube'
  | 'Family & Friends'
  | 'Press'
  | 'Events'
  | 'App Store';

export default function HearScreen() {
  const router = useRouter();
  const { caregiverReferral, setCaregiverReferral, setOnboardingScreen } =
    useUserStore();
  // const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  const sources: Source[] = [
    'TikTok',
    'Instagram',
    'Facebook',
    'YouTube',
    'Family & Friends',
    'Press',
    'Events',
    'App Store',
  ];

  const handleNext = () => {
    if (caregiverReferral) {
      setOnboardingScreen('/(auth)/screens/onboarding/caregiver/zipCode');
      router.push('/(auth)/screens/onboarding/caregiver/zipCode');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' titleStyle={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.8} />

        <ThemedText style={styles.title}>
          How did you hear{'\n'}about us?
        </ThemedText>

        <ThemedText style={styles.subtitle}>Choose just one option</ThemedText>

        <View style={styles.pillsContainer}>
          {sources.map((source) => (
            <Pill
              key={source}
              label={source}
              selected={caregiverReferral === source}
              onPress={() => setCaregiverReferral(source)}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            // label='Next'
            onPress={handleNext}
            variant='compact'
            disabled={!caregiverReferral}
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
  spacer: {
    height: 120,
  },
  title: {
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    // marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    marginBottom: 38,
    marginTop: 38,
  },
});
