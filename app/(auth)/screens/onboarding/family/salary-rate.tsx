import { StyleSheet, View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';

export default function SalaryRateScreen() {
  const router = useRouter();
  const [salary, setSalary] = useState('');

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.98} />

        <View style={styles.mainContent}>
          <ThemedText style={styles.title}>
            What annual salary{'\n'}are you willing to pay?
          </ThemedText>

          <View style={styles.inputContainer}>
            <View style={[styles.inputBorder, salary.length > 0 && styles.inputBorderActive]}>
              <TextInput
                style={styles.input}
                placeholder="Enter annual salary"
                placeholderTextColor="#999"
                value={salary}
                onChangeText={setSalary}
                autoFocus
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Next"
            onPress={() => router.push('/(auth)/screens/onboarding/family/nextScreen')}
            variant={salary ? "primary" : "disabled"}
            disabled={!salary}
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
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 40,
  },
  inputContainer: {
    marginTop: 20,
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
    right: 20,
    left: 20,
  },
});