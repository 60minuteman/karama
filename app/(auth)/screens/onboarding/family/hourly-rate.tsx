import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { TextInput } from '@/components/ui/TextInput';
import { Colors } from '@/constants/Colors';

export default function HourlyRateScreen() {
  const router = useRouter();
  const [rate, setRate] = useState('');

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.98} />

        <View style={styles.mainContent}>
          <ThemedText style={styles.title}>
            What hourly rate are{'\n'}you willing to pay?
          </ThemedText>

          <View style={styles.inputContainer}>
            <TextInput
              value={rate}
              onChangeText={setRate}
              placeholder="Enter hourly rate"
              keyboardType="numeric"
              prefix="$"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Next"
            onPress={() => router.push('/(auth)/screens/onboarding/family/nextScreen')}
            variant="compact"
            disabled={!rate}
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
  spacerTop: {
    height: 120,
  },
  mainContent: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Bold',
    color: '#002140',
    marginBottom: 40,
  },
  inputContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    left: 20,
  },
}); 