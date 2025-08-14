import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import {
  CaregiverPreferredArrangement,
  useUserStore,
} from '@/services/state/user';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';

export default function ArrangementsScreen() {
  const router = useRouter();
  // const [selected, setSelected] = useState<CaregiverPreferredArrangement | null>(null);
  // const [isDealbreaker, setIsDealbreaker] = useState(false);
  const {
    caregiverPreferredArrangement,
    setCaregiverPreferredArrangement,
    isDealBreaker,
    setIsDealBreaker,
    setOnboardingScreen,
  } = useUserStore();

  const arrangementOptions: Array<{ label: string }> = [
    { label: '💤 Live In' },
    { label: '⏰ Live Out' },
    { label: '🔗 Hybrid' },
  ];

  const handleNext = () => {
    if (caregiverPreferredArrangement) {
      setOnboardingScreen('/(auth)/screens/onboarding/caregiver/commitment');
      router.push('/(auth)/screens/onboarding/caregiver/commitment');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' style={{ fontFamily: 'Bogart-Bold' }} />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.65} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <ThemedText style={styles.title}>
              What type of{'\n'}arrangement do you{'\n'}prefer?
            </ThemedText>

            <ThemedText style={styles.subtitle}>
              Choose just one option
            </ThemedText>

            <View style={styles.optionsContainer}>
              {arrangementOptions.map((option) => (
                <Pill
                  key={option.label}
                  label={option.label}
                  selected={caregiverPreferredArrangement === option.label}
                  onPress={() =>
                    setCaregiverPreferredArrangement(
                      option.label as CaregiverPreferredArrangement
                    )
                  }
                />
              ))}
            </View>

            <View style={styles.dealbreaker}>
              <ThemedText style={styles.dealbreakerText}>
                Dealbreaker
              </ThemedText>
              <Switch
                value={isDealBreaker}
                onValueChange={setIsDealBreaker}
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
              // label='Next'
              onPress={handleNext}
              variant='compact'
              disabled={!caregiverPreferredArrangement}
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
  spacerTop: {
    height: 120,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    // marginBottom: 40,
    color: Colors.light.text,
    // marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dealbreaker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
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

  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    marginBottom: 24,
    marginTop: 24,
  },
});
