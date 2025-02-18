import { StyleSheet, View, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Pill } from '@/components/ui/Pill';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

type Availability = 
  | 'Full Time'
  | 'Part Time'
  | 'Occasionally'
  | 'Night Out'
  | 'After school Pickup';

export default function AvailabilityScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Availability | null>(null);
  const [isDealbreaker, setIsDealbreaker] = useState(false);

  const availabilityOptions: Array<{ label: Availability; icon: string }> = [
    { label: 'Full Time', icon: '⏰' },
    { label: 'Part Time', icon: '⌛' },
    { label: 'Occasionally', icon: '📅' },
    { label: 'Night Out', icon: '🌙' },
    { label: 'After school Pickup', icon: '🎒' },
  ];

  const handleNext = () => {
    router.push('/(auth)/screens/onboarding/family/arrangements');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.75} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <ThemedText style={styles.title}>
              How often do you{'\n'}need a caregiver?
            </ThemedText>

            <View style={styles.optionsContainer}>
              {availabilityOptions.map((option) => (
                <Pill
                  key={option.label}
                  label={option.label}
                  icon={option.icon}
                  selected={selected === option.label}
                  onPress={() => setSelected(option.label)}
                />
              ))}
            </View>

            <View style={styles.dealbreaker}>
              <ThemedText style={styles.dealbreakerText}>Dealbreaker</ThemedText>
              <Switch
                value={isDealbreaker}
                onValueChange={setIsDealbreaker}
                trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                thumbColor="#FFFFFF"
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
              label="Next"
              onPress={handleNext}
              variant="compact"
              disabled={!selected}
              style={styles.button}
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
    fontFamily: 'Poppins',
    fontWeight: '600',
    marginBottom: 40,
    color: Colors.light.text,
    marginTop: 20,
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
  button: {
    alignSelf: 'flex-end'
  }
});