import { StyleSheet, View, ScrollView, Switch, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Pill } from '@/components/ui/Pill';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

type Requirement = 
  | 'Can Travel'
  | 'Able To Drive'
  | 'First Aid'
  | 'Can Swim'
  | 'COVID Vaccination'
  | 'CPR'
  | 'Other';

type Certification = 
  | 'Sign Language'
  | 'Administering Medication'
  | 'Special Needs'
  | 'Condition Specific'
  | 'Feeding & Swallowing'
  | 'Registered Behaviour Technician'
  | 'Other';

export default function RequirementsScreen() {
  const router = useRouter();
  const [selectedRequirements, setSelectedRequirements] = useState<Requirement[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<Certification[]>([]);
  const [requirementsDealbreaker, setRequirementsDealbreaker] = useState(false);
  const [certificationsDealbreaker, setCertificationsDealbreaker] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const requirements: Array<{ label: Requirement; icon: string }> = [
    { label: 'Can Travel', icon: '✈️' },
    { label: 'Able To Drive', icon: '🚗' },
    { label: 'First Aid', icon: '🏥' },
    { label: 'Can Swim', icon: '🏊' },
    { label: 'COVID Vaccination', icon: '💉' },
    { label: 'CPR', icon: '🫀' },
    { label: 'Other', icon: '🎯' },
  ];

  const certifications: Array<{ label: Certification; icon: string }> = [
    { label: 'Sign Language', icon: '🤟' },
    { label: 'Administering Medication', icon: '💊' },
    { label: 'Special Needs', icon: '🦽' },
    { label: 'Condition Specific', icon: '🏥' },
    { label: 'Feeding & Swallowing', icon: '🍔' },
    { label: 'Registered Behaviour Technician', icon: '😇' },
    { label: 'Other', icon: '📄' },
  ];

  const toggleRequirement = (req: Requirement) => {
    setSelectedRequirements(prev => 
      prev.includes(req) 
        ? prev.filter(r => r !== req)
        : [...prev, req]
    );
  };

  const toggleCertification = (cert: Certification) => {
    setSelectedCertifications(prev =>
      prev.includes(cert)
        ? prev.filter(c => c !== cert)
        : [...prev, cert]
    );
  };

  const handleNext = () => {
    router.push('/(auth)/screens/onboarding/family/available');
  };

  const handleSkip = () => {
    router.push('/(auth)/screens/onboarding/family/available');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.8} />

        <ThemedText style={styles.title}>
          What requirements do you need caregivers to have?
        </ThemedText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Requirements</ThemedText>
              <View style={styles.optionsContainer}>
                {requirements.map((req) => (
                  <Pill
                    key={req.label}
                    label={req.label}
                    icon={req.icon}
                    selected={selectedRequirements.includes(req.label)}
                    onPress={() => toggleRequirement(req.label)}
                  />
                ))}
              </View>
              <View style={styles.dealbreaker}>
                <ThemedText style={styles.dealbreakerText}>Dealbreaker</ThemedText>
                <Switch
                  value={requirementsDealbreaker}
                  onValueChange={setRequirementsDealbreaker}
                  trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Certifications</ThemedText>
              <View style={styles.optionsContainer}>
                {certifications.map((cert) => (
                  <Pill
                    key={cert.label}
                    label={cert.label}
                    icon={cert.icon}
                    selected={selectedCertifications.includes(cert.label)}
                    onPress={() => toggleCertification(cert.label)}
                  />
                ))}
              </View>
              <View style={styles.dealbreaker}>
                <ThemedText style={styles.dealbreakerText}>Dealbreaker</ThemedText>
                <Switch
                  value={certificationsDealbreaker}
                  onValueChange={setCertificationsDealbreaker}
                  trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                  thumbColor="#FFFFFF"
                />
              </View>
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
              disabled={selectedRequirements.length === 0 && selectedCertifications.length === 0}
            />
          </View>
        </LinearGradient>
      </Animated.View>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#666',
    marginBottom: 16,
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
    marginTop: 16,
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
    justifyContent: 'space-between',
  },
});