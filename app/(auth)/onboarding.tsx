import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useUserStore } from '@/services/state/user';
import { Video } from 'expo-av';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function OnboardingScreen() {
  const router = useRouter();
  const { user, onboarding_screen, steps, selectedType } = useUserStore();
  const { completeOnboarding } = useOnboarding();

  console.log('onboarding_screen', onboarding_screen);

  const handleGetStarted = async () => {
    await completeOnboarding();

    if (onboarding_screen) {
      // return router.push(onboarding_screen);
      return router.push('/(auth)/screens/onboarding/family/benefits');
    }
    // Always go to phone number screen first
    router.push('/(auth)/phoneNumber');
  };

  const handleSignIn = () => {
    // router.push('/(auth)/pet');
    router.push('/(auth)/signInPhone');
  };

  const handlePreview = () => {
    router.push('/preview');
  };

  const isDev = __DEV__ || Constants.expoConfig?.extra?.development;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.pageContainer}>
        <Video
          source={require('../../assets/videos/onboarding.mp4')}
          style={styles.backgroundVideo}
          resizeMode='cover'
          shouldPlay
          isLooping
          isMuted
        />
        <View style={styles.overlay} />

        {/* Dev Only Preview Button */}
        {isDev && (
          <TouchableOpacity style={styles.devButton} onPress={handlePreview}>
            <ThemedText style={styles.devButtonText}>DEV: Preview</ThemedText>
          </TouchableOpacity>
        )}

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Image
              source={require('../../assets/logo/logo2.png')}
              style={styles.logo}
            />
            <ThemedText style={styles.subtitle}>
              Childcare just got personalized
            </ThemedText>
          </View>
          <View style={styles.buttonContainer}>
            <ThemedText style={styles.termsText}>
              By tapping 'Sign in' / 'Create account' you agree to our terms and
              services. Learn how we process your data in our privacy policy and
              cookies policy.
            </ThemedText>
            <Button
              label='Get Started'
              onPress={handleGetStarted}
              variant='primary'
            />
            <ThemedText style={styles.signInText} onPress={handleSignIn}>
              Sign in
            </ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Overlay control
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40,
  },
  textContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  logo: {
    width: 209,
    height: 36,
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.light.white,
    opacity: 0.9,
  },
  termsText: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.light.white,
    opacity: 0.8,
    marginBottom: 16,
    lineHeight: 16,
  },
  signInText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.white,
    marginTop: 16,
    opacity: 0.9,
    fontWeight: 'bold',
  },
  devButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(235, 68, 48, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 10,
  },
  devButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
