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
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function PromptAnswer() {
  const router = useRouter();
  const { prompt } = useLocalSearchParams();
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
    },
    languages: caregiverLanguages,
    other_languages: 'French',
    ages_best_with: caregiverAgeExperience,
    children_capacity: caregiverChildrenCount,
    experience_with_disabilities: {
      disabilities: caregiverConditionExperience,
    },
    experience_with_pets: {
      pets: caregiverPetExperience,
    },
    hobbies: {
      creative_interests: caregiverCreativeInterests,
      instrument_interests: caregiverInstrumentInterests,
      sport_interests: caregiverSportInterest,
      stem_interests: caregiverStemInterests,
    },
    characteristics: {
      personalities: caregiverPersonality,
      diets: caregiverDiet,
      show_diet_on_profile: showCaregiverDiet,
      rules: caregiverRules,
      religion: caregiverReligion,
      show_religion_on_profile: showCaregiverReligion,
    },
    childcare_philosophies: caregiverPhilosophyExperience,
    family_must_speak_same_language: caregiverLanguageMatch,
    availability: (caregiverPreferredPositions || []).slice(0, 2),
    arrangement_type: caregiverPreferredArrangement,
    job_commitment: {
      commitment: caregiverCommitmentType,
      start_date: caregiverCommitmentStartDate ? formatDate(caregiverCommitmentStartDate) : getDefaultStartDate(),
      ...(caregiverCommitmentType === 'Short Term' && {
        end_date: caregiverCommitmentEndDate ? formatDate(caregiverCommitmentEndDate) : undefined
      })
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
    },
    payment_info: {
      type: caregiverPaymentType,
      hourly_min: 1,
      hourly_max: caregiverHourlyRate,
      method: caregiverPaymentMethod,
      show_method_on_profile: showCaregiverPaymentMethod,
    },
    required_benefits: caregiverRequiredBenefits,
    past_positions: [
      caregiverFirstPosition && {
        family_or_business_name: caregiverFirstPosition.familyName,
        start_date: caregiverFirstPosition.startDate ? formatDate(caregiverFirstPosition.startDate) : undefined,
        end_date: caregiverFirstPosition.endDate ? formatDate(caregiverFirstPosition.endDate) : undefined,
        position_type: caregiverFirstPosition.position,
        children_age_group: [caregiverFirstPosition.ageGroup],
        availability: caregiverFirstPosition.employmentType,
        childcare_responsibilities: ['Packing Lunch', 'Play Dates'],
        household_responsibilities: ['Property Management', 'Meal Prep'],
      },
      caregiverSecondPosition?.familyName && {
        family_or_business_name: caregiverSecondPosition.familyName,
        start_date: caregiverSecondPosition.startDate ? formatDate(caregiverSecondPosition.startDate) : undefined,
        end_date: caregiverSecondPosition.endDate ? formatDate(caregiverSecondPosition.endDate) : undefined,
        position_type: caregiverSecondPosition.position,
        children_age_group: [caregiverSecondPosition.ageGroup],
        availability: caregiverSecondPosition.employmentType,
        childcare_responsibilities: ['Packing Lunch', 'Play Dates'],
        household_responsibilities: ['Property Management', 'Meal Prep'],
      }
    ].filter(Boolean).filter(position => 
      position.start_date && position.end_date
    ),
    prompts: [
      {
        category: caregiverPromptCategory,
        title: caregiverFirstPrompt,
        answer: caregiverFirstPromptAnswer,
      },
    ],
  };
  console.log(onboadingInfo, 'TO Create PROFIELEEE');
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
  const getDefaultStartDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow) || '01/01/2025';
  };
  return (
    <ThemedView style={styles.container}>
      <Header variant='back' titleStyle={{ fontFamily: 'Bogart-Bold' }} />

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
            value={caregiverFirstPromptAnswer}
            onChangeText={setCaregiverFirstPromptAnswer}
            textAlignVertical='top'
          />
        </View>

        <View style={styles.addButtonContainer}>
          <Button
            label='Add Another Prompt'
            onPress={() => router.back()}
            variant='compact'
            style={styles.addButton}
          />
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Button
          label='Next'
          onPress={handleSubmit}
          variant='compact'
          loading={createProfile.isPending}
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
    fontFamily: 'Bogart',
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
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
