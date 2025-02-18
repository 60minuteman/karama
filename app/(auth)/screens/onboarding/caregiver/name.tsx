import { useRouter } from 'expo-router';
import { StyleSheet, View, TextInput } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';

export default function CaregiverNameScreen() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleNext = () => {
    if (name.trim()) {
      // Navigate to next screen in caregiver flow
      router.push('/(auth)/screens/onboarding/caregiver/dob'); // Update with actual next screen
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.4} />
        
        <ThemedText style={styles.title}>
          What's your{'\n'}name?
        </ThemedText>

        <View style={styles.inputContainer}>
          <View style={[styles.inputBorder, name.length > 0 && styles.inputBorderActive]}>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoFocus
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Next"
            onPress={handleNext}
            variant={name.trim() ? "primary" : "disabled"}
            disabled={!name.trim()}
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
  title: {
    fontFamily: 'Poppins',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 40,
  },
  inputBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
  },
  inputBorderActive: {
    borderBottomColor: Colors.light.primary,
  },
  input: {
    fontFamily: 'Poppins',
    fontSize: 24,
    color: Colors.light.text,
    paddingVertical: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
});