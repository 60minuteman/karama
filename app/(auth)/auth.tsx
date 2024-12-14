import { useRouter } from 'expo-router';
import { StyleSheet, View, Image } from 'react-native';
import { Video } from 'expo-av';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';

export default function AuthScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/(auth)/AuthScreen');
  };

  const handleGoBack = () => {
    router.back();
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
            <ThemedText style={styles.signInWithText}>Sign in with</ThemedText>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={[styles.circleButton]} onPress={handleLogin}>
                <Image source={require('../../assets/auth/google.png')} style={styles.icon} />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.circleButton]} onPress={handleLogin}>
                <Image source={require('../../assets/auth/apple.png')} style={styles.icon} />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.circleButton]} onPress={handleLogin}>
                <Image source={require('../../assets/auth/Facebook.png')} style={styles.icon} />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.circleButton]} onPress={handleLogin}>
                <Image source={require('../../assets/auth/Phone.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <ThemedText 
              style={styles.goBackText}
              onPress={handleGoBack}
            >
              Go back
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    height: 34,
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
  signInWithText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.white,
    marginBottom: 16,
    opacity: 0.9,
    fontWeight: 'bold'
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  icon: {
    width: 28,
    height: 28,
  },
  goBackText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.white,
    marginTop: 16,
    opacity: 0.9,
    fontWeight: 'bold'
  }
});