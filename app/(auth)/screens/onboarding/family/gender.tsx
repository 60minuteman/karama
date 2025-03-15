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

export default function GenderScreen() {
  const router = useRouter();
  const {
    family_gender_preference,
    setFamilyGenderPreference,
    setOnboardingScreen,
  } = useUserStore();
  const [showGenderOptions, setShowGenderOptions] = useState(false);

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
    'Other',
  ];

  console.log('family_gender_preference', family_gender_preference);

  const handleResponse = (response: 'yes' | 'no') => {
    setFamilyGenderPreference({ has_preference: response });
    if (response === 'yes') {
      setShowGenderOptions(true);
    } else {
      setOnboardingScreen('/(auth)/screens/onboarding/family/type');
      router.push('/(auth)/screens/onboarding/family/type');
    }
  };

  const handleGenderSelect = (gender: string) => {
    setFamilyGenderPreference({ selected_gender: gender });
    setOnboardingScreen('/(auth)/screens/onboarding/family/type');
    router.push('/(auth)/screens/onboarding/family/type');
  };

  const handleSkip = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/type');
    router.push('/(auth)/screens/onboarding/family/type');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />
      <View style={styles.titleContainer}>
        <ProgressBar progress={0.3} />
        <ThemedText style={[styles.title, { fontFamily: 'Bogart-Semibold' }]}>
          Do you have a preference when it comes to the gender of your
          caregiver?
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          (This will not be visible on your profile)
        </ThemedText>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.mainContent}>
            <View
              style={[styles.optionsContainer, { justifyContent: 'flex-end' }]}
            >
              <Pill
                label='Yes'
                onPress={() => handleResponse('yes')}
                selected={family_gender_preference?.has_preference === 'yes'}
              />
              <Pill
                label='No'
                onPress={() => handleResponse('no')}
                selected={family_gender_preference?.has_preference === 'no'}
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
                <ThemedText style={styles.dealbreakerText}>
                  Dealbreaker
                </ThemedText>
                <Switch
                  value={family_gender_preference?.is_dealbreaker}
                  onValueChange={(value) =>
                    setFamilyGenderPreference({ is_dealbreaker: value })
                  }
                  trackColor={{ false: '#E8E8E8', true: Colors.light.primary }}
                  thumbColor='#FFFFFF'
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
          <Button label='Skip' onPress={handleSkip} variant='skip' />
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
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 120,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
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
  },
});
