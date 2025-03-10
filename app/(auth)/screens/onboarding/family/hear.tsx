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

type Source = 
  | 'TikTok'
  | 'Instagram'
  | 'Facebook'
  | 'YouTube'
  | 'Family & Friends'
  | 'Press'
  | 'Events'
  | 'App Store'
  | 'Other';

export default function HearScreen() {
  const router = useRouter();
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  const sources: Source[] = [
    'TikTok',
    'Instagram',
    'Facebook',
    'YouTube',
    'Family & Friends',
    'Press',
    'Events',
    'App Store',
    'Other'
  ];

  const handleNext = () => {
    if (selectedSource) {
      router.push('/(auth)/screens/onboarding/family/zipCode');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

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
              selected={selectedSource === source}
              onPress={() => setSelectedSource(source)}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Next"
            onPress={handleNext}
            variant="compact"
            disabled={!selectedSource}
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