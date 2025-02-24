import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { LinearGradient } from 'expo-linear-gradient';

type Condition = 
  | 'Dyslexia' 
  | 'ADHD' 
  | 'Autistic Spectrum'
  | 'Tourette Syndrome'
  | 'Down Syndrome'
  | 'Schizophrenia'
  | 'Misophonia'
  | 'Hearing Impaired'
  | 'Vision Impaired'
  | 'Bipolar'
  | 'Other';

export default function BehaviourScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<'Yes' | 'No' | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>([]);

  const conditions: Condition[] = [
    'Dyslexia',
    'ADHD',
    'Autistic Spectrum',
    'Tourette Syndrome',
    'Down Syndrome',
    'Schizophrenia',
    'Misophonia',
    'Hearing Impaired',
    'Vision Impaired',
    'Bipolar',
    'Other'
  ];

  const handleNext = () => {
    if (selected === 'No' || (selected === 'Yes' && selectedConditions.length > 0)) {
      router.push('/(auth)/screens/onboarding/family/hear');
    }
  };

  const toggleCondition = (condition: Condition) => {
    setSelectedConditions(prev => 
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const isNextDisabled = !selected || (selected === 'Yes' && selectedConditions.length === 0);

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.7} />
        
        <ThemedText style={styles.title}>
          Are there any{'\n'}developmental,{'\n'}learning, or{'\n'}behavioural{'\n'}differences in your{'\n'}child?
        </ThemedText>

        <View style={styles.optionsContainer}>
          <Pill
            label="Yes"
            selected={selected === 'Yes'}
            onPress={() => setSelected('Yes')}
          />
          <Pill
            label="No"
            selected={selected === 'No'}
            onPress={() => setSelected('No')}
          />
        </View>

        {selected === 'Yes' && (
          <View style={styles.conditionsContainer}>
            {conditions.map((condition) => (
              <Pill
                key={condition}
                label={condition}
                selected={selectedConditions.includes(condition)}
                onPress={() => toggleCondition(condition)}
              />
            ))}
          </View>
        )}

        <View style={styles.buttonGradientContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            style={styles.buttonGradient}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                {selected === 'Yes' && (
                  <Button
                    label="Skip"
                    onPress={handleNext}
                    variant="skip"
                  />
                )}
              </View>
              <Button
                label="Next"
                onPress={handleNext}
                variant="compact"
                disabled={isNextDisabled}
              />
            </View>
          </LinearGradient>
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
    fontFamily: 'Bogart-Bold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  conditionsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  buttonGradientContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
  },
});