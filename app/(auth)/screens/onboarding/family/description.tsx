import { useRouter } from 'expo-router';
import { StyleSheet, View, Switch } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';

type FamilyType = 'Mom' | 'Dad' | 'Mom & Dad' | 'Moms' | 'Dads' | 'Guardian' | 'Other';

export default function FamilyDescriptionScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<FamilyType | null>(null);
  const [showOnProfile, setShowOnProfile] = useState(false);

  const familyTypes: { type: FamilyType; icon: string }[] = [
    { type: 'Mom', icon: '👩' },
    { type: 'Mom & Dad', icon: '👨‍👩' },
    { type: 'Dad', icon: '👨' },
    { type: 'Moms', icon: '👩👩' },
    { type: 'Dads', icon: '👨👨' },
    { type: 'Guardian', icon: '🦹' },
    { type: 'Other', icon: '💝' },
  ];

  const handleNext = () => {
    if (selectedType) {
      router.push('/(auth)/screens/onboarding/family/number');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.5} />
        
        <ThemedText style={styles.title}>
          Which best{'\n'}describes your{'\n'}family?
        </ThemedText>

        <View style={styles.pillsContainer}>
          {familyTypes.map((item) => (
            <Pill
              key={item.type}
              icon={item.icon}
              label={item.type}
              selected={selectedType === item.type}
              onPress={() => setSelectedType(item.type)}
            />
          ))}
        </View>

        <View style={styles.toggleContainer}>
          <ThemedText style={styles.toggleText}>Show on profile</ThemedText>
          <Switch
            value={showOnProfile}
            onValueChange={setShowOnProfile}
            trackColor={{ false: '#E5E5E5', true: Colors.light.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Next"
            onPress={handleNext}
            variant="compact"
            disabled={!selectedType}
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
  pillsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: '500',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 20,
  }
});