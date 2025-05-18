import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useOtherStore } from '@/services/state/other';
import { useUserStore } from '@/services/state/user';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function PromptAnswer() {
  const router = useRouter();
  const { prompt } = useLocalSearchParams();
   const { 
      prompts,
      addPrompts
    } = useOtherStore();
  const {
    family_prompt_answer,
    family_prompt,
    setFamilyPromptAnswer,
    setOnboardingScreen,
    family_prompt_category
  } = useUserStore();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    setFamilyPromptAnswer('');

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/moreInfo');
    router.push('/(auth)/screens/onboarding/family/moreInfo');
  };

  const handleAddPrompt = (answer: string) => {
    if (answer) {
      addPrompts({
        category: family_prompt_category,
        title: prompt,
        answer: answer,
      });
      setFamilyPromptAnswer('');
      setOnboardingScreen('/(auth)/screens/onboarding/family/prompt');
      router.push('/(auth)/screens/onboarding/family/prompt');
    }
  }
  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 10}
        >
          <View style={styles.content}>
            <View style={styles.spacerTop} />
            <ProgressBar progress={0.9} />

            <ThemedText style={styles.title}>{prompt}</ThemedText>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                multiline
                placeholder='Type prompt answer here...'
                placeholderTextColor='#A8A3A5'
                value={family_prompt_answer}
                onChangeText={setFamilyPromptAnswer}
                textAlignVertical='top'
              />
            </View>

            <View style={styles.addButtonContainer}>
              <Button
                label='Add Another Prompt'
                onPress={() => handleAddPrompt(family_prompt_answer)}
                variant='compact'
                // style={styles.addButton}
              />
            </View>
          </View>
          {
            prompts.length > 1 && (
              <View
            style={[
              styles.bottomNav,
              isKeyboardVisible ? { marginBottom: 10 } : { marginBottom: 40 },
            ]}
          >
            <Button label='Next' onPress={handleNext} variant='compact' />
          </View>
            )
          }
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  spacerTop: {
    height: 120,
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
  inputContainer: {
    flex: 1,
    backgroundColor: 'rgba(38, 29, 42, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    maxHeight: 200,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#0F172A',
    padding: 0,
    textAlignVertical: 'top',
  },
  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  bottomNav: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
