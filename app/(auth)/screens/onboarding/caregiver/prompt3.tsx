import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { LinearGradient } from 'expo-linear-gradient';

const promptCategories = [
  { id: 'get_to_know', label: 'Get to know Me', primary: true },
  { id: 'childcare', label: 'Childcare' },
];

const promptOptions = [
  'We expect our caregiver to',
  'I expect families to',
  'When it comes to older children I',
  'We deal with conflicts by',
  'One thing we admire in caregivers is',
  'Our caregiver must',
  'Our dream caregiver is',
  'The top parenting tip I share with parents is',
  'Our approach to correcting children is', 
  'One thing we do not tolerate is',
  'I believe children thrive when',
  'I encourage children by',
  'My caregiving style is',
];

export default function Prompt3() {
  const router = useRouter();
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');

  const handleNext = () => {
    if (selectedPrompt) {
      router.push({
        pathname: '/(auth)/screens/onboarding/caregiver/promptAnswer',
        params: { prompt: selectedPrompt }
      });
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    if (categoryId === 'get_to_know') {
      router.push('/(auth)/screens/onboarding/caregiver/prompt');
    } else if (categoryId === 'kids_talking') {
      router.push('/(auth)/screens/onboarding/caregiver/prompt2');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" titleStyle={{ fontFamily: 'Bogart-Bold' }} />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.9} />

        <ThemedText style={styles.title}>
          Choose your prompt.
        </ThemedText>

        <View style={styles.categories}>
          {promptCategories.map((category) => (
            <View key={category.id} style={styles.pillWrapper}>
              <Pill
                label={category.label}
                selected={category.primary}
                onPress={() => handleCategoryPress(category.id)}
              />
            </View>
          ))}
        </View>

        <ThemedText style={styles.sectionHeader}>Options</ThemedText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.promptsContainer}>
            {promptOptions.map((prompt, index) => (
              <View key={index} style={styles.pillWrapper}>
                <Pill
                  label={prompt}
                  selected={selectedPrompt === prompt}
                  onPress={() => setSelectedPrompt(prompt)}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContainer}>
            <Button
              label="Next"
              onPress={handleNext}
              variant="compact"
              disabled={!selectedPrompt}
            />
          </View>
        </LinearGradient>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 24,
    marginTop: 20,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#A8A3A5',
  },
  promptsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pillWrapper: {
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingHorizontal: 20,
  }
});