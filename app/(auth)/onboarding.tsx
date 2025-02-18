import { useRouter } from 'expo-router';
import { StyleSheet, View, Image } from 'react-native';
import { Video } from 'expo-av';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();

  const handleGetStarted = async () => {
    await completeOnboarding();
    router.push('/(auth)/phoneNumber');
  };

  const handleSignIn = () => {
    router.push('/(app)/discover');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.pageContainer}>
        <Video
          source={require('../../assets/videos/onboarding.mp4')}
          style={styles.backgroundVideo}
          resizeMode="cover"
          shouldPlay
          isLooping
          isMuted
        />
        <View style={styles.overlay} />
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Image 
              source={require('../../assets/logo/logo2.png')}
              style={styles.logo}
            />
            <ThemedText style={styles.subtitle}>Childcare just got personalized</ThemedText>
          </View>
          <View style={styles.buttonContainer}>
            <ThemedText style={styles.termsText}>
              By tapping 'Sign in' / 'Create account' you agree to our terms and services. Learn how we process your data in our privacy policy and cookies policy.
            </ThemedText>
            <Button 
              label="Get Started"
              onPress={handleGetStarted}
              variant="primary"
            />
            <ThemedText 
              style={styles.signInText}
              onPress={handleSignIn}
            >
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Made the overlay darker by increasing opacity from 0.4 to 0.6
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
    width: 178,
    height: 36,
    marginBottom: 24
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
    fontWeight: 'bold'
  }
});