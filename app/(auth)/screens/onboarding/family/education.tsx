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

type Education = 
  | 'High School'
  | 'In College'
  | 'Undergraduate Degree'
  | 'In Grad School'
  | 'Graduate Degree'
  | 'No Preference';

export default function EducationScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Education | null>(null);
  const [showOnProfile, setShowOnProfile] = useState(false);

  const educationOptions: Array<{ label: Education; icon?: string }> = [
    { label: 'High School', icon: '🎓' },
    { label: 'In College', icon: '📚' },
    { label: 'Undergraduate Degree', icon: '🎓' },
    { label: 'In Grad School', icon: '📘' },
    { label: 'Graduate Degree', icon: '🎓' },
    { label: 'No Preference' },
  ];

  const handleNext = () => {
    router.push('/(auth)/screens/onboarding/family/requirements');
  };

  const handleSkip = () => {
    router.push('/(auth)/screens/onboarding/family/requirements');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.7} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <ThemedText style={styles.title}>
              What level of{'\n'}education do you{'\n'}require your{'\n'}caregiver to have?
            </ThemedText>

            <View style={styles.optionsContainer}>
              {educationOptions.map((option) => (
                <View key={option.label} style={styles.pillWrapper}>
                  <Pill
                    label={option.label}
                    icon={option.icon}
                    selected={selected === option.label}
                    onPress={() => setSelected(option.label)}
                  />
                </View>
              ))}
            </View>

            <View style={styles.profileToggle}>
              <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
              <Switch
                value={showOnProfile}
                onValueChange={setShowOnProfile}
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
              label="Skip"
              onPress={handleSkip}
              variant="skip"
            />
            <Button
              label="Next"
              onPress={handleNext}
              variant="compact"
              disabled={!selected}
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
    fontFamily: 'Bogart-Bold',
    fontWeight: '600',
    marginBottom: 40,
    color: Colors.light.text,
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  pillWrapper: {
    alignItems: 'flex-start',
  },
  profileToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    paddingVertical: 10,
  },
  toggleText: {
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
    justifyContent: 'space-between',
  },
});