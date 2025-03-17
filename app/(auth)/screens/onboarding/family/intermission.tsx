import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import useAuthMutation from '@/hooks/useAuthMutation';
import customAxios from '@/services/api/envConfig';
import { useUserStore } from '@/services/state/user';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

export default function IntermissionScreen() {
  const router = useRouter();
  const {
    setOnboardingScreen,
    familyName,
    family_description,
    family_age_groups,
    family_behaviour,
    family_zipcode,
    family_languages,
    family_pets,
    family_selected_source,
    family_interests,
    family_show_diet,
    family_show_rules,
    family_show_religion,
    family_selections,
    family_show_philosophy,
    family_philosophies,
    family_allergies,
    setSteps,
  } = useUserStore();

  console.log('family_allergies', family_allergies);

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/gender');
    setSteps('intermission');
    router.push('/(auth)/screens/onboarding/family/gender');
  };

  const submit: any = useAuthMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/family-profile/create-profile`, data);
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

  console.log('family_submit', family_interests);

  const handleSubmit = () => {
    submit.mutate({
      name: familyName,
      description: {
        description: family_description?.type,
        // other: 'N/A',
        show_on_profile: family_description?.showOnProfile,
      },
      children: family_age_groups,
      behavioural_difference: {
        differences: family_behaviour?.conditions || [],
        // other: 'N/A',
      },
      zipcode: family_zipcode,
      languages: {
        languages: family_languages || [],
      },
      pets: {
        pets: family_pets || [],
        // other: 'N/A',
      },
      allergies: {
        food_allergies: family_allergies?.food,
        // other_food_allergies: 'N/A',
        environmental_allergies: family_allergies?.environmental,
        // other_environmental_allergies: 'N/A',
        other_allergies: family_allergies?.other,
        // other_other_allergies: 'N/A',
      },
      children_interests: {
        creative_interests: family_interests?.creative_interests,
        // other_creative_interest: 'N/A',
        instrument_interests: family_interests?.instrument_interests,
        // other_instrument_interest: 'N/A',
        sport_interests: family_interests?.sport_interests,
        // other_sport_interest: 'N/A',
        stem_interests: family_interests?.stem_interests,
        // other_stem_interest: 'N/A',
      },
      household_info: {
        diets: family_selections?.diets,
        // other_diets: 'N/A',
        show_diet_on_profile: family_show_diet,
        rules: family_selections?.rules,
        // other_rules: 'N/A',
        show_rules_on_profile: family_show_rules,
        religion: family_selections?.religion,
        // other_religion: 'N/A',
        show_religion_on_profile: family_show_religion,
      },
      philosophies: {
        philosophies: family_philosophies,
        // other: 'N/A',
        show_on_profile: family_show_philosophy,
      },
      aquisition_source: family_selected_source,
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacer} />
        <ProgressBar progress={0.8} />

        <View style={styles.mainContent}>
          <View style={styles.textContainer}>
            <View style={styles.lightningContainer}>
              <Image
                source={require('@/assets/onboarding/family/bolt.png')}
                style={styles.lightning}
              />
            </View>

            <ThemedText style={styles.title}>
              We're almost done.{'\n'}
              Now tell us about{'\n'}
              your dream{'\n'}
              caregiver 😇
            </ThemedText>

            <View style={styles.handContainer}>
              <Image
                source={require('@/assets/onboarding/family/hand.png')}
                style={styles.hand}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label='Next'
            onPress={handleSubmit}
            variant='compact'
            style={styles.button}
            loading={submit.isPending}
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
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    position: 'relative',
  },
  lightningContainer: {
    position: 'absolute',
    right: -40,
    top: -320,
  },
  lightning: {
    width: 162,
    height: 380,
    resizeMode: 'contain',
  },
  handContainer: {
    position: 'absolute',
    left: -20,
    bottom: -490,
  },
  hand: {
    width: 150,
    height: 390,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 38,
    color: Colors.light.text,
    fontWeight: '500',
    marginTop: 20,
  },
  buttonContainer: {
    marginBottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    alignSelf: 'flex-end',
  },
});
