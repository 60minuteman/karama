import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import useAuthMutation from '@/hooks/useAuthMutation';
import customAxios from '@/services/api/envConfig';
import { useUserStore } from '@/services/state/user';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function MoreInfo() {
  const router = useRouter();
  const {
    family_more_info,
    setFamilyMoreInfo,
    setOnboardingScreen,
    family_payment,
    family_payment_method,
    family_benefits,
    family_prompt,
    family_prompt_category,
    family_prompt_answer,
    setSteps,
  } = useUserStore();

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/upload');
    setSteps('more-info');
    router.push('/(auth)/screens/onboarding/family/upload');
  };

  const submit: any = useAuthMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/family-profile/extra-info`, data);
    },
    onSuccess: async (data: any) => {
      handleNext();
    },
    onError: (error: any) => {
      console.log('error', error['response'].data);
      // router.push('/phoneNumber');
      // Toast.show({
      //   type: 'problem',
      //   text1: 'Something went wrong',
      //   text2: error['response'].data?.message,
      // });
    },
  });

  const handleSubmit = () => {
    submit.mutate({
      payment_info: {
        type: family_payment?.selected_type,
        hourly_min: 15,
        hourly_max: family_payment?.hourly_rate,
        method: family_payment_method?.selected_method,
        show_method_on_profile: family_payment_method?.show_on_profile,
      },
      prompts: [
        {
          category: family_prompt_category,
          title: family_prompt,
          answer: family_prompt_answer,
        },
      ],
      more_information: family_more_info,
      benefits: {
        benefits: family_benefits?.selected_benefits,
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.9} />

        <ThemedText style={styles.title}>
          Is there anything{'\n'}else you'd like{'\n'}caregivers to know?
        </ThemedText>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline
            placeholder='Write your answer here...'
            placeholderTextColor='#A8A3A5'
            value={family_more_info}
            onChangeText={setFamilyMoreInfo}
            textAlignVertical='top'
          />
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Button label='Skip' onPress={() => router.back()} variant='skip' />
        <Button
          label='Next'
          onPress={handleSubmit}
          variant='compact'
          loading={submit.isPending}
        />
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
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bogart-Semibold',
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 24,
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#F4F2ED',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    maxHeight: 200,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
    padding: 0,
    textAlignVertical: 'top',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
});
