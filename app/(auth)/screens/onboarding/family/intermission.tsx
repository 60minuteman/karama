import { useRouter } from 'expo-router';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function IntermissionScreen() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/(auth)/screens/onboarding/family/gender');
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.8} />

        <View style={styles.mainContent}>
          <View style={styles.textContainer}>
            <View style={styles.lightningContainer}>
              <Image 
                source={require('@/assets/onboarding/family/bolt.png')}
                style={styles.lightning}
              />
            </View>

            <ThemedText style={styles.title}>
              We're almost done.{'\n'}
              Now tell us about{'\n'}
              your dream{'\n'}
              caregiver 😇
            </ThemedText>

            <View style={styles.handContainer}>
              <Image
                source={require('@/assets/onboarding/family/hand.png')}
                style={styles.hand}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Next"
            onPress={handleNext}
            variant="compact"
            style={styles.button}
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
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    position: 'relative',
  },
  lightningContainer: {
    position: 'absolute',
    right: -40,
    top: -320,
  },
  lightning: {
    width: 162,
    height: 380,
    resizeMode: 'contain',
  },
  handContainer: {
    position: 'absolute',
    left: -20,
    bottom: -490,
  },
  hand: {
    width: 150,
    height: 390,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 38,
    color: Colors.light.text,
    fontWeight: '500',
    marginTop: 20,
  },
  buttonContainer: {
    marginBottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    alignSelf: 'flex-end',
  },
});