import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Pill } from '@/components/ui/Pill';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Colors } from '@/constants/Colors';
import useAuthMutation from '@/hooks/useAuthMutation';
import customAxios from '@/services/api/envConfig';
import { useOtherStore } from '@/services/state/other';
import { useUserStore } from '@/services/state/user';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const PromptSelection = () => {
  const { prompts } = useOtherStore();
  const router = useRouter();
  const { prompt, selectedIndex } = useLocalSearchParams();
  const { addPrompts, updatePromptAtIndex } = useOtherStore();

  const getDefaultStartDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow) || '01/01/2025';
  };

  const formatDate = (date: string | Date | undefined | null) => {
    if (!date) return undefined;

    let dateObj: Date;
    if (typeof date === 'string') {
      const [month, day, year] = date.split('/');
      dateObj = new Date(`${year}-${month}-${day}`);
    } else {
      dateObj = new Date(date);
    }

    if (isNaN(dateObj.getTime())) return undefined;

    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const {
    caregiverAbilities,
    caregiverAgeExperience,
    caregiverCertifications,
    caregiverChildcareResponsibilities,
    caregiverChildrenCount,
    caregiverCommitmentEndDate,
    caregiverCommitmentStartDate,
    caregiverCommitmentType,
    caregiverConditionExperience,
    caregiverCreativeInterests,
    caregiverDiet,
    caregiverDob,
    caregiverEducation,
    caregiverExperienceDuration,
    caregiverFirstPosition,
    caregiverFirstPrompt,
    caregiverGender,
    caregiverHourlyRate,
    caregiverHouseholdResponsibilities,
    caregiverImages,
    caregiverInstrumentInterests,
    caregiverLanguageMatch,
    caregiverLanguages,
    caregiverLocation,
    caregiverMoreInfo,
    caregiverName,
    caregiverPaymentMethod,
    caregiverPaymentType,
    caregiverPersonality,
    caregiverPetExperience,
    caregiverPhilosophyExperience,
    caregiverPositionType,
    caregiverPreferredArrangement,
    caregiverPreferredPositions,
    caregiverPronouns,
    caregiverReferral,
    caregiverReligion,
    caregiverRequiredBenefits,
    caregiverRules,
    caregiverSalaryAmount,
    caregiverSchedule,
    caregiverSecondPosition,
    caregiverShowEducation,
    caregiverShowPronouns,
    caregiverSportInterest,
    caregiverStemInterests,
    caregiverFirstPromptAnswer,
    caregiverPromptCategory,
    hasNeuroDivergentExperience,
    hasPetExperience,
    hasPhilosophyExperience,
    showCaregiverDiet,
    showCaregiverPaymentMethod,
    showCaregiverPersonality,
    showCaregiverReligion,
    showCaregiverRequiredBenefit,
    setCaregiverFirstPromptAnswer,
    setOnboardingScreen,
  } = useUserStore();

  const {
    otherRequirement,
    otherCertifications,
    otherLanguage,
    otherPet,
    otherCreativeActivity,
    otherSport,
    otherStem,
    otherInstument,
    otherDiet,
    otherRule,
    otherReligion,
    otherHouseholdResponsibilities,
    otherChildResponsibilities,
    caregiverThirdPosition,
  } = useOtherStore();

  console.log('prompts', prompts);

  const payment_info =
    caregiverPaymentType === 'Salary Base'
      ? {
          type: caregiverPaymentType,
          salary: Number(caregiverSalaryAmount?.replace(/,/g, '')) || 0,
          show_method_on_profile: showCaregiverPaymentMethod,
        }
      : {
          type: caregiverPaymentType,
          hourly_min: caregiverHourlyRate?.[0],
          hourly_max: caregiverHourlyRate?.[1],
          method: caregiverPaymentMethod,
          show_method_on_profile: showCaregiverPaymentMethod,
        };

  const onboadingInfo = {
    name: caregiverName,
    date_of_birth: caregiverDob,
    gender: caregiverGender,
    pronouns: caregiverPronouns,
    aquisition_source: caregiverReferral,
    zipcode: caregiverLocation,
    caregiver_type: caregiverPositionType,
    years_of_experience: caregiverExperienceDuration,
    education_level: caregiverEducation,
    show_edu_level_on_profile: caregiverShowEducation,
    abilities_and_certifications: {
      abilities: caregiverAbilities,
      certifications: caregiverCertifications,
      other_ability: otherRequirement || '',
      other_certification: otherCertifications || '',
    },
    languages: caregiverLanguages,
    other_languages: otherLanguage || '',
    ages_best_with: caregiverAgeExperience,
    children_capacity: caregiverChildrenCount,
    experience_with_disabilities: {
      disabilities: caregiverConditionExperience,
    },
    experience_with_pets: {
      pets:
        caregiverPetExperience?.filter((pet: any) => pet !== '🚫 None') || [],
      other: otherPet || '',
    },
    hobbies: {
      creative_interests: caregiverCreativeInterests,
      instrument_interests: caregiverInstrumentInterests,
      sport_interests: caregiverSportInterest,
      stem_interests: caregiverStemInterests,
      other_creative_interest: otherCreativeActivity || '',
      other_instrument_interest: otherInstument || '',
      other_sport_interest: otherSport || '',
      other_stem_interest: otherStem || '',
    },
    characteristics: {
      personalities: caregiverPersonality,
      diets: caregiverDiet?.filter((diet: any) => diet !== '🚫 None') || [],
      show_diet_on_profile: showCaregiverDiet,
      rules: caregiverRules,
      religion: caregiverReligion,
      show_religion_on_profile: showCaregiverReligion,
      other_diets: otherDiet || '',
      other_rules: otherRule || '',
      other_religion: otherReligion || '',
    },
    childcare_philosophies:
      caregiverPhilosophyExperience?.filter(
        (philosophy: any) => philosophy !== '🚫 None'
      ) || [],
    family_must_speak_same_language: caregiverLanguageMatch,
    availability: (caregiverPreferredPositions || []).slice(0, 2),
    arrangement_type: caregiverPreferredArrangement,
    job_commitment: {
      commitment: caregiverCommitmentType,
      start_date:
        formatDate(caregiverCommitmentStartDate) || getDefaultStartDate(),
      ...(caregiverCommitmentType === 'Short Term' && {
        end_date: formatDate(caregiverCommitmentEndDate),
      }),
    },
    service_days: caregiverSchedule?.map((schedule) => {
      return {
        day: schedule.day,
        begin: schedule.timeSlot.begin,
        end: schedule.timeSlot.end,
      };
    }),
    responsibilities: {
      childcare_responsibilities: caregiverChildcareResponsibilities,
      household_responsibilities: caregiverHouseholdResponsibilities,
      other_childcare_responsibilities: otherChildResponsibilities || '',
      other_household_responsibilities: otherHouseholdResponsibilities || '',
    },
    payment_info,
    required_benefits: caregiverRequiredBenefits?.slice(0, 10) || [],
    past_positions: [
      caregiverFirstPosition && {
        family_or_business_name: caregiverFirstPosition.familyName,
        start_date: caregiverFirstPosition.startDate
          ? formatDate(caregiverFirstPosition.startDate)
          : undefined,
        end_date: caregiverFirstPosition.endDate
          ? formatDate(caregiverFirstPosition.endDate)
          : undefined,
        position_type: caregiverFirstPosition.position,
        children_age_group: caregiverFirstPosition.ageGroups || [],
        availability: caregiverFirstPosition.employmentType,
        childcare_responsibilities: caregiverFirstPosition.childCare,
        household_responsibilities: caregiverFirstPosition.household,
      },
      caregiverSecondPosition?.familyName && {
        family_or_business_name: caregiverSecondPosition.familyName,
        start_date: caregiverSecondPosition.startDate
          ? formatDate(caregiverSecondPosition.startDate)
          : undefined,
        end_date: caregiverSecondPosition.endDate
          ? formatDate(caregiverSecondPosition.endDate)
          : undefined,
        position_type: caregiverSecondPosition.position,
        children_age_group: caregiverSecondPosition.ageGroups || [],
        availability: caregiverSecondPosition.employmentType,
        childcare_responsibilities: caregiverSecondPosition.childCare,
        household_responsibilities: caregiverSecondPosition.household,
      },
      caregiverThirdPosition?.familyName && {
        family_or_business_name: caregiverSecondPosition.familyName,
        start_date: caregiverSecondPosition.startDate
          ? formatDate(caregiverSecondPosition.startDate)
          : undefined,
        end_date: caregiverSecondPosition.endDate
          ? formatDate(caregiverSecondPosition.endDate)
          : undefined,
        position_type: caregiverSecondPosition.position,
        children_age_group: caregiverSecondPosition.ageGroups || [],
        availability: caregiverSecondPosition.employmentType,
        childcare_responsibilities: caregiverThirdPosition.childCare,
        household_responsibilities: caregiverThirdPosition.household,
      },
    ]
      .filter(Boolean)
      .filter((position) => position.start_date && position.end_date),
    prompts: prompts?.slice(-2) || [],
  };

  const createProfile: any = useAuthMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/caregiver-profile/create-profile`, data);
    },
    onSuccess: async (data: any) => {
      console.log('CAREGIVER PROFILE CREATED');
      handleNext();
    },
    onError: (error: any) => {
      console.log('COULD NOR CREATEEE');
      console.log('error', error['response'].data);
      if (
        error['response'].data?.message ==
        'This stage of onboarding is complete'
      ) {
        return handleNext();
      }
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error['response'].data?.message,
      });
    },
  });

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/moreInfo');
    router.push('/(auth)/screens/onboarding/caregiver/moreInfo');
  };
  const handleSubmit = async () => {
    createProfile.mutate(onboadingInfo);
  };

  const handleSelectPrompt = (index: number) => {
    router.push({
      pathname: '/(auth)/screens/onboarding/caregiver/prompt',
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
          onPress={handleSubmit}
          variant='compact'
          disabled={prompts.length < 2}
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
