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
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { benefitsOptions } from './benefits';


// Add these type definitions at the top
type PromptCategory = 'get_to_know' | 'childcare';

type Prompts = {
  [K in PromptCategory]: string[];
};

const promptCategories = [
  {
    id: 'get_to_know' as PromptCategory,
    label: 'Get to know Me',
    primary: true,
  },
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
  ],
};

export default function Prompt() {
  const router = useRouter();
  const {
    caregiverPromptCategory,
    setCaregiverPromptCategory,
    caregiverFirstPrompt,
    setCaregiverFirstPrompt,
    setOnboardingScreen,
    setCaregiverFirstPromptAnswer,
  } = useUserStore();
  const { prompts: promptsData } = useOtherStore();
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

  useEffect(() => {
    setCaregiverFirstPromptAnswer('');
  }, []);

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
      hasNeuroDivergentExperience,
      hasPetExperience,
      hasPhilosophyExperience,
      showCaregiverDiet,
      showCaregiverPaymentMethod,
      showCaregiverPersonality,
      showCaregiverReligion,
      showCaregiverRequiredBenefit,
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
  
    console.log(
      'carePosition',
      caregiverFirstPosition,
      caregiverFirstPosition.startDate
    );
  
    const payment_info =
      caregiverPaymentType === 'Salary Base'
        ? {
            type: caregiverPaymentType,
            salary: caregiverSalaryAmount || '',
            show_method_on_profile: showCaregiverPaymentMethod,
          }
        : {
            type: caregiverPaymentType,
            hourly_min: 1,
            hourly_max: caregiverHourlyRate,
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
        pets: caregiverPetExperience,
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
        diets: caregiverDiet,
        show_diet_on_profile: showCaregiverDiet,
        rules: caregiverRules,
        religion: caregiverReligion,
        show_religion_on_profile: showCaregiverReligion,
        other_diets: otherDiet || '',
        other_rules: otherRule || '',
        other_religion: otherReligion || '',
      },
      childcare_philosophies: caregiverPhilosophyExperience,
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
      required_benefits: (caregiverRequiredBenefits || [])
        .filter(
          (benefit) =>
            benefit && benefitsOptions?.find((opt) => opt.id === benefit)
        )
        .slice(0, 10),
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
          children_age_group: [caregiverFirstPosition.ageGroup],
          availability: caregiverFirstPosition.employmentType,
          childcare_responsibilities: ['Packing Lunch', 'Play Dates'],
          household_responsibilities: ['Property Management', 'Meal Prep'],
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
          children_age_group: [caregiverSecondPosition.ageGroup],
          availability: caregiverSecondPosition.employmentType,
          childcare_responsibilities: ['Packing Lunch', 'Play Dates'],
          household_responsibilities: ['Property Management', 'Meal Prep'],
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
          children_age_group: [caregiverSecondPosition.ageGroup],
          availability: caregiverSecondPosition.employmentType,
          childcare_responsibilities: ['Packing Lunch', 'Play Dates'],
          household_responsibilities: ['Property Management', 'Meal Prep'],
        },
      ]
        .filter(Boolean)
        .filter((position) => position.start_date && position.end_date),
      prompts: promptsData,
    };

  // const handleNext = () => {
  //   setOnboardingScreen('/(auth)/screens/onboarding/caregiver/moreInfo');
  //   router.push('/(auth)/screens/onboarding/caregiver/moreInfo');
  // };

  useEffect(() => {
    if (!caregiverPromptCategory) {
      setCaregiverPromptCategory('get_to_know');
    }
  }, []);


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

  const handleCategoryPress = (categoryId: PromptCategory) => {
    setCaregiverPromptCategory(categoryId);
    setCaregiverFirstPrompt(undefined);
  };

  const currentCategory = (caregiverPromptCategory ||
    'get_to_know') as PromptCategory;
  const currentPrompts = prompts[currentCategory];

  const handleAdd = (prompt: string) => {
    setOnboardingScreen('/(auth)/screens/onboarding/caregiver/promptAnswer');
    router.push({
      pathname: '/(auth)/screens/onboarding/caregiver/promptAnswer',
      params: { prompt },
    });
  };

   const handleSubmit = async () => {
    createProfile.mutate(onboadingInfo);
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.9} />

        <ThemedText style={styles.title}>Choose your prompt</ThemedText>

        <View style={styles.categories}>
          {promptCategories?.map((category) => (
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
            {currentPrompts?.map((prompt: string, index: number) => (
              <View key={index} style={styles.pillWrapper}>
                <Pill
                  label={prompt}
                  selected={promptsData?.some((item: any) => item.title === prompt) ||
                      caregiverFirstPrompt === prompt}
                  onPress={() => handleAdd(prompt)}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        {/* <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          {promptsData?.length > 1 && (
            <View style={styles.buttonContainer}>
              <Button label='Next' onPress={handleSubmit} loading={createProfile.isPending} variant='compact' />
            </View>
          )}
        </LinearGradient> */}
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
    color: Colors.light.text,
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
