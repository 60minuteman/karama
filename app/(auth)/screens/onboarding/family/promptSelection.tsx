import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import { useOtherStore } from '@/services/state/other';
import { router } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const PromptSelection = () => {
  const { prompts } = useOtherStore();

  const handleNext = () => {
    // setOnboardingScreen('/(auth)/screens/onboarding/family/prompt');
    router.push('/(auth)/screens/onboarding/family/moreInfo');
  };

  const handleSelectPrompt = (index: number) => {
    router.push({
      pathname: '/(auth)/screens/onboarding/family/prompt',
      params: { selectedIndex: index.toString() },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.2} />

        <ThemedText style={styles.title}>
          We want to know {'\n'}more about you.
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Choose at least 3 prompts
        </ThemedText>

        <View style={styles.promptContainer}>
          <TouchableOpacity
            onPress={() => handleSelectPrompt(0)}
            style={styles.promptInput}
          >
            <View style={{ flex: 1, paddingTop: 10 }}>
              <ThemedText style={styles.promptTitle}>
                {prompts.length > 0
                  ? prompts[0].title
                  : 'Click to select a prompt'}
              </ThemedText>
              <View style={styles.textInput}>
                <ThemedText style={styles.inputText}>
                  {prompts.length > 0
                    ? prompts[0].answer
                    : 'Click to select a prompt'}
                </ThemedText>
              </View>
            </View>
            <View style={styles.addButtonContainer}>
              <View style={styles.addButton}>
                <ThemedText style={styles.plusSign}>+</ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.promptContainer}>
          <TouchableOpacity
            onPress={() => handleSelectPrompt(1)}
            style={styles.promptInput}
          >
            <View style={{ flex: 1, paddingTop: 10 }}>
              <ThemedText style={styles.promptTitle}>
                {prompts.length > 1
                  ? prompts[1].title
                  : 'Click to select a prompt'}
              </ThemedText>
              <View style={styles.textInput}>
                <ThemedText style={styles.inputText}>
                  {prompts.length > 1
                    ? prompts[1].answer
                    : 'Click to select a prompt'}
                </ThemedText>
              </View>
            </View>
            <View style={styles.addButtonContainer}>
              <View style={styles.addButton}>
                <ThemedText style={styles.plusSign}>+</ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.promptContainer}>
          <TouchableOpacity
            onPress={() => handleSelectPrompt(2)}
            style={styles.promptInput}
          >
            <View style={{ flex: 1, paddingTop: 10 }}>
              <ThemedText style={styles.promptTitle}>
                {prompts.length > 2
                  ? prompts[2].title
                  : 'Click to select a prompt'}
              </ThemedText>
              <View style={styles.textInput}>
                <ThemedText style={styles.inputText}>
                  {prompts.length > 2
                    ? prompts[2].answer
                    : 'Click to select a prompt'}
                </ThemedText>
              </View>
            </View>
            <View style={styles.addButtonContainer}>
              <View style={styles.addButton}>
                <ThemedText style={styles.plusSign}>+</ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {/* <Button label='Skip' onPress={handleNext} variant='skip' /> */}
        <Button
          // label='Next'
          onPress={handleNext}
          variant='compact'
          disabled={prompts.length < 3}
        />
      </View>
    </ThemedView>
  );
};

export default PromptSelection;

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
  spacerBottom: {
    height: 40,
  },
  title: {
    fontSize: 32,
    lineHeight: 44,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    color: Colors.light.text,
    // marginBottom: 40,
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  conditionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 40,
    backgroundColor: Colors.light.background,
  },

  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    marginBottom: 24,
    marginTop: 16,
  },
  promptContainer: {
    marginTop: 20,
  },
  promptInput: {
    backgroundColor: '#261D2A0D',
    borderRadius: 20,
    paddingHorizontal: 24,
    // paddingVertical: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 80,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#00000017',
    // backgroundColor: 'red',
  },
  placeholderText: {
    flex: 1,
  },
  placeholderLine1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#999999',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  placeholderLine2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#999999',
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: '#FF4444',
    width: 22.65,
    height: 22.65,
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusSign: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  inputText: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontStyle: 'italic',
    fontSize: 16,
    letterSpacing: 0,
    color: '#261D2A80',
  },
  promptTitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontStyle: 'italic',
    fontSize: 14,
    // lineHeight: 14,
    letterSpacing: 0,
    color: '#999999',
    // marginTop: 5,
    // marginBottom: 4,
  },
  addButtonContainer: {
    // backgroundColor: 'red',
    position: 'absolute',
    right: 5,
    top: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
    backgroundColor: Colors.light.background,
  },
});
