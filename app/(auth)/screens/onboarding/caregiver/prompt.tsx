import React, { useState, useEffect } from 'react';
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
import { useUserStore } from '@/services/state/user';

// Add these type definitions at the top
type PromptCategory = 'get_to_know' | 'childcare';

type Prompts = {
  [K in PromptCategory]: string[];
};

const promptCategories = [
  { id: 'get_to_know' as PromptCategory, label: 'Get to know Me', primary: true },
  { id: 'childcare' as PromptCategory, label: 'Childcare' },
];

// Type the prompts object
const prompts: Prompts = {
  get_to_know: [
    'I enjoy',
    'I am very good at',
    'On my chill day I usually',
    'My favorite holiday tradition is',
    'My idea of an amazing Saturday morning is',
    'Three words to describe me are',
    'One thing you definitely have to know about me is',
  ],
  childcare: [
    'My childcare philosophy is',
    'My approach to discipline is',
    'What I love most about working with children is',
    'My experience with special needs includes',
    'My favorite age group to work with is',
    'My teaching style can be described as',
  ]
};

export default function Prompt() {
  const router = useRouter();
  const {
    caregiverPromptCategory,
    setCaregiverPromptCategory,
    caregiverFirstPrompt,
    setCaregiverFirstPrompt,
    setOnboardingScreen
  } = useUserStore();

  // Initialize with default category if not set
  useEffect(() => {
    if (!caregiverPromptCategory) {
      setCaregiverPromptCategory('get_to_know');
    }
  }, []);

  const handleNext = () => {
    if (caregiverFirstPrompt) {
      setOnboardingScreen('/(auth)/screens/onboarding/caregiver/promptAnswer');
      router.push({
        pathname: '/(auth)/screens/onboarding/caregiver/promptAnswer',
        params: { prompt: caregiverFirstPrompt }
      });
    }
  };

  const handleCategoryPress = (categoryId: PromptCategory) => {
    setCaregiverPromptCategory(categoryId);
    // Clear previous prompt selection when changing categories
    setCaregiverFirstPrompt(null);
  };

  // Now TypeScript knows this is safe
  const currentPrompts = prompts[caregiverPromptCategory || 'get_to_know'];

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.9} />

        <ThemedText style={styles.title}>
          Choose your prompt
        </ThemedText>

        <View style={styles.categories}>
          {promptCategories.map((category) => (
            <View key={category.id} style={styles.pillWrapper}>
              <Pill
                label={category.label}
                selected={caregiverPromptCategory === category.id}
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
            {currentPrompts.map((prompt, index) => (
              <View key={index} style={styles.pillWrapper}>
                <Pill
                  label={prompt}
                  selected={caregiverFirstPrompt === prompt}
                  onPress={() => setCaregiverFirstPrompt(prompt)}
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
              disabled={!caregiverFirstPrompt}
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