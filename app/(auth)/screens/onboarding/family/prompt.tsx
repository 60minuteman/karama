import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const promptCategories = [
  { id: 'get_to_know', label: 'Get to know Us', primary: true },
  { id: 'kids_talking', label: 'Kids Talking' },
  { id: 'childcare', label: 'Childcare' },
];

const promptOptions = [
  'We enjoy',
  'We try to instill',
  'Our children are',
  'We are very good at',
  'We consider our household a',
  'On our chill day we usually',
  'Our favorite holiday tradition is',
  'Our idea of an amazing Saturday \nmorning is',
  'if our family was a sitcom,it would be called',
  'Three words to describe our family is',
  'One thing you definitely have to know \n about us is',
];

export default function Prompt() {
  const router = useRouter();
  const {
    family_prompt,
    setFamilyPrompt,
    setOnboardingScreen,
    family_prompt_category,
    setFamilyPromptCategory,
  } = useUserStore();

  console.log('family_prompt', family_prompt);

  const handleNext = () => {
    if (family_prompt) {
      setOnboardingScreen('/(auth)/screens/onboarding/family/promptAnswer');
      router.push({
        pathname: '/(auth)/screens/onboarding/family/promptAnswer',
        params: { prompt: family_prompt },
      });
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    setFamilyPromptCategory(categoryId);
    if (categoryId === 'kids_talking') {
      setOnboardingScreen('/(auth)/screens/onboarding/family/prompt2');
      router.push('/(auth)/screens/onboarding/family/prompt2');
    } else if (categoryId === 'childcare') {
      setOnboardingScreen('/(auth)/screens/onboarding/family/prompt3');
      router.push('/(auth)/screens/onboarding/family/prompt3');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.9} />

        <ThemedText style={styles.title}>Choose your prompt.</ThemedText>

        <View style={styles.categories}>
          {promptCategories.map((category) => (
            <View key={category.id} style={styles.pillWrapper}>
              <Pill
                label={category.label}
                selected={category.id === family_prompt_category}
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
                  selected={family_prompt === prompt}
                  onPress={() => setFamilyPrompt(prompt)}
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
              label='Next'
              onPress={handleNext}
              variant='compact'
              disabled={!family_prompt}
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
    fontFamily: 'Bogart-Semibold',
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
  },
});
