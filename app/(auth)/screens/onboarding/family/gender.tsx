import { useRouter } from 'expo-router';
import { StyleSheet, View, Switch, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Pill } from '@/components/ui/Pill';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function GenderScreen() {
  const router = useRouter();
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<'yes' | 'no' | null>(null);
  const [isDealbreaker, setIsDealbreaker] = useState(false);

  const genderOptions = [
    'Male',
    'Female', 
    'Non Binary',
    'Transgender',
    'Gender Nutual',
    'Gender Queer',
    'Cisgender Male',
    'Cisgender Female',
    'Gender Fluid',
    'Other'
  ];

  const handleResponse = (response: 'yes' | 'no') => {
    setSelectedResponse(response);
    if (response === 'yes') {
      setShowGenderOptions(true);
    } else {
      router.push('/(auth)/screens/onboarding/family/type');
    }
  };

  const handleGenderSelect = (gender: string) => {
    // Handle gender selection here
    router.push('/(auth)/screens/onboarding/family/next-screen');
  };

  const handleSkip = () => {
    router.push('/(auth)/screens/onboarding/family/type');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.spacerTop} />
          <ProgressBar progress={0.3} />

          <View style={styles.mainContent}>
            <ThemedText style={styles.title}>
              Do you have a preference when it comes to the gender of your caregiver?
            </ThemedText>
            
            <ThemedText style={styles.subtitle}>
              (This will not be visible on your profile)
            </ThemedText>

            <View style={[styles.optionsContainer, { justifyContent: 'flex-end' }]}>
              <Pill
                label="Yes"
                onPress={() => handleResponse('yes')}
                selected={selectedResponse === 'yes'}
              />
              <Pill
                label="No"
                onPress={() => handleResponse('no')}
                selected={selectedResponse === 'no'}
              />
            </View>
          </View>

          {showGenderOptions && (
            <>
              <View style={styles.genderOptionsContainer}>
                {genderOptions.map((gender, index) => (
                  <Pill
                    key={index}
                    label={gender}
                    onPress={() => handleGenderSelect(gender)}
                  />
                ))}
              </View>

              <View style={styles.dealbreakerContainer}>
                <ThemedText style={styles.dealbreakerText}>Dealbreaker</ThemedText>
                <Switch
                  value={isDealbreaker}
                  onValueChange={setIsDealbreaker}
                  trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </>
          )}
          <View style={styles.bottomSpacer} />
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
        </View>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  spacerTop: {
    height: 120,
  },
  bottomSpacer: {
    height: 100,
  },
  mainContent: {
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Poppins',
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.light.text,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  genderOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  }
});