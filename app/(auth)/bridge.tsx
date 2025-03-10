import { useRouter } from 'expo-router';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function BridgeScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'family' | 'caregiver' | null>(null);

  const handleSelection = (type: 'family' | 'caregiver') => {
    setSelectedType(type);
    setTimeout(() => {
      if (type === 'family') {
        router.push('/(auth)/screens/onboarding/family/name');
      } else {
        router.push('/(auth)/screens/onboarding/caregiver/name');
      }
    }, 300);
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.33} />
        <ThemedText style={styles.title}>
          Hi there, let us begin.{'\n'}Are you a
        </ThemedText>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              selectedType === 'family' ? styles.selectedOption : styles.unselectedOption
            ]}
            onPress={() => handleSelection('family')}
          >
            <ThemedText 
              style={[
                styles.optionText,
                selectedType === 'family' ? styles.selectedText : styles.unselectedText
              ]}
            >
              👨‍👩‍👧 Family
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              selectedType === 'caregiver' ? styles.selectedOption : styles.unselectedOption
            ]}
            onPress={() => handleSelection('caregiver')}
          >
            <ThemedText 
              style={[
                styles.optionText,
                selectedType === 'caregiver' ? styles.selectedText : styles.unselectedText
              ]}
            >
              💝 Caregiver
            </ThemedText>
          </TouchableOpacity>
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
    height: 140,
  },
  title: {
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 44,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: Colors.light.primary,
  },
  unselectedOption: {
    backgroundColor: 'rgba(38, 29, 42, 0.05)',
  },
  optionText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedText: {
    color: Colors.light.background,
  },
  unselectedText: {
    color: Colors.light.text,
  },
});