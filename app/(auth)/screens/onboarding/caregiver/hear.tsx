import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { useUserStore } from '@/services/state/user';

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
  const {caregiverReferral,setCaregiverReferral,setOnboardingScreen} = useUserStore();
  // const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  const sources: Source[] = [
    'TikTok',
    'Instagram',
    'Facebook',
    'YouTube',
    'Family & Friends',
    'Press',
    'Events',
    'App Store'
  ];

  const handleNext = () => {
    if (caregiverReferral) {
      setOnboardingScreen('/(auth)/screens/onboarding/caregiver/zipCode')
      router.push('/(auth)/screens/onboarding/caregiver/zipCode');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.8} />
        
        <ThemedText style={styles.title}>
          How did you hear{'\n'}about us?
        </ThemedText>

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
            label="Next"
            onPress={handleNext}
            variant="compact"
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
    fontFamily: 'Bogart-Bold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
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
});