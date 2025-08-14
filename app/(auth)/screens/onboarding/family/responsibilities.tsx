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
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface Responsibility {
  id: string;
  label: string;
}

const childcareResponsibilities: Responsibility[] = [
  { id: 'bathing', label: '🛁 Bathing' },
  { id: 'laundry', label: '🧺 Laundry' },
  { id: 'packingLunch', label: '🍕 Packing Lunch' },
  { id: 'driving', label: '🚗 Driving' },
  { id: 'cooking', label: '🥓 Cooking' },
  { id: 'playDates', label: '🛝 Play Dates' },
  { id: 'commuting', label: '🚆 Commuting' },
  { id: 'scheduling', label: '📅 Scheduling/ Planning' },
  { id: 'sleepScheduling', label: '⭐️ Sleep Scheduling' },
  { id: 'tutoring', label: '🍎 Tutoring' },
  { id: 'homeworkHelp', label: '📖 Homework Help' },
  { id: 'roomOrg', label: '🚂 Room organization' },
  { id: 'foodPrep', label: '🥒 Food prep' },
  { id: 'diaperChange', label: '🧷 Diaper Change' },
  { id: 'pottyTraining', label: '🚽 Potty training' },
  { id: 'organization', label: '📦 Organization' },
  { id: 'lightHouseKeeping', label: '🧹 Light house keeping' },
  { id: 'roomOrganization', label: '🧸 Room Organization' },
  { id: 'groceryShopping', label: '🥐 Grocery Shopping' },
  { id: 'childcareErrands', label: '🛍️ Childcare Errands' },
  { id: 'feeding', label: '🧑‍🍼 Feeding' },
  { id: 'pottyTraining2', label: '🚽 Potty Training' },
  // { id: 'other', label: '🧒🏽 Other' },
];

const householdResponsibilities: Responsibility[] = [
  { id: 'cooking2', label: '🍳 Cooking' },
  { id: 'laundry2', label: '👔 Laundry' },
  { id: 'mealPrep', label: '🍲 Meal Prep' },
  { id: 'ironing', label: '🧺 Ironing' },
  { id: 'errands', label: '🛒 Errands' },
  { id: 'petCare', label: '🐾 Pet Care' },
  { id: 'eventPlanning', label: '🎊 Event Planning' },
  { id: 'trashRecycling', label: '🗑️ Trash & Recycling' },
  { id: 'lightHousekeeping2', label: '🧹 Light Housekeeping' },
  { id: 'deepHousekeeping', label: '💦 Deep Housekeeping' },
  { id: 'managingProperties', label: '🗂️ Managing Properties' },
  { id: 'householdBudgeting', label: '📊 Household Budgeting' },
  { id: 'hiringStaff', label: '🗒️ Hiring & Supervising Staff' },
  { id: 'propertyManagement', label: '🏘️ Property Management' },
  { id: 'dishwasher', label: '🍽️ Loading/Unloading Dishwasher' },
  // { id: 'other2', label: '🏙️ Other' },
];

export default function ResponsibilitiesScreen() {
  const router = useRouter();
  const {
    family_responsibilities,
    setFamilyResponsibilities,
    setOnboardingScreen,
    onboarding_screen,
    family_gender_preference,
    caregiver_type,
    caregiver_traits,
    caregiver_age,
    caregiver_experience,
    caregiver_language_required,
    caregiver_requirements,
    family_availability,
    family_arrangement,
    family_commitment,
    family_schedule,
    setSteps,
    steps,
  } = useUserStore();
  const { familyEducation } = useOtherStore();

  console.log('onboarding_screen', onboarding_screen);
  console.log('family_responsibilities', family_responsibilities);

  const MIN_RESPONSIBILITIES = 3;
  const MAX_RESPONSIBILITIES = 10;

  const toggleResponsibility = (id: string, label: string) => {
    if (id === 'other') {
      setOnboardingScreen(
        '/(auth)/screens/onboarding/family/otherChildResponsibilities'
      );
      router.push(
        '/(auth)/screens/onboarding/family/otherChildResponsibilities'
      );
      return;
    } else if (id === 'other2') {
      setOnboardingScreen(
        '/(auth)/screens/onboarding/family/otherHouseholdResponsibilities'
      );
      router.push(
        '/(auth)/screens/onboarding/family/otherHouseholdResponsibilities'
      );
      return;
    }

    if (family_responsibilities.includes(label)) {
      // Allow removing if we have more than minimum
      if (family_responsibilities.length > MIN_RESPONSIBILITIES) {
        setFamilyResponsibilities(
          family_responsibilities.filter((item) => item !== label)
        );
      }
    } else {
      // Allow adding if we haven't reached maximum
      if (family_responsibilities.length < MAX_RESPONSIBILITIES) {
        setFamilyResponsibilities([...family_responsibilities, label]);
      } else {
        Toast.show({
          type: 'info',
          text1: 'Maximum limit reached',
          text2: `You can select up to ${MAX_RESPONSIBILITIES} responsibilities`,
        });
      }
    }
  };

  const handleNext = () => {
    setOnboardingScreen('/(auth)/screens/onboarding/family/payment');
    setSteps('responsibilities');
    router.push('/(auth)/screens/onboarding/family/payment');
  };

  const submit: any = useAuthMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/family-profile/create-preference`, data);
    },
    onSuccess: async (data: any) => {
      handleNext();
    },
    onError: (error: any) => {
      console.log('error', error['response'].data);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error['response'].data?.message,
      });
      // router.push('/phoneNumber');
      // Toast.show({
      //   type: 'problem',
      //   text1: 'Something went wrong',
      //   text2: error['response'].data?.message,
      // });
    },
  });

  const {
    otherGender,
    otherRequirement,
    otherCertifications,
    otherHouseholdResponsibilities,
    otherChildResponsibilities,
  } = useOtherStore();

  const handleSubmit = () => {
    if (steps === 'responsibilities') {
      handleNext();
      return;
    }

    if (onboarding_screen === '/(auth)/screens/onboarding/family/payment') {
      return router.push('/(auth)/screens/onboarding/family/payment');
    }
    const childcareIds = childcareResponsibilities.map((r) => r.id);
    const householdIds = householdResponsibilities.map((r) => r.id);

    const selectedChildcareResponsibilities = family_responsibilities.filter(
      (label) => childcareResponsibilities.some((r) => r.label === label)
    );

    const selectedHouseholdResponsibilities = family_responsibilities.filter(
      (label) => householdResponsibilities.some((r) => r.label === label)
    );

    submit.mutate({
      gender_preference: {
        genders:
          family_gender_preference?.has_preference === 'yes'
            ? [family_gender_preference?.selected_gender]
            : [],
        // "other": "Prefer female caregivers",
        other: otherGender,
        dealbreaker: family_gender_preference?.is_dealbreaker,
      },
      caregiver_types: caregiver_type?.selected_types || [],
      caregiver_type_is_dealbreaker: caregiver_type?.is_dealbreaker,
      personalities: caregiver_traits?.selected_traits || [],
      personality_is_dealbreaker: caregiver_traits?.is_dealbreaker,
      age_preference: {
        age_group: caregiver_age?.selected_age_range,
        is_dealbreaker: caregiver_age?.is_dealbreaker,
      },
      experience: caregiver_experience?.selected_experience,
      must_speak_same_language:
        caregiver_language_required === 'Yes, required' ? true : false,
      education_level: familyEducation,
      show_education_level_on_profile: true,
      requirements: {
        requirements: caregiver_requirements?.selected_requirements || [],
        other_requirement: otherRequirement,
        // other_requirement: caregiver_requirements?.other_requirement,
        requirements_are_dealbreaker:
          caregiver_requirements?.requirements_dealbreaker,
        certifications: caregiver_requirements?.selected_certifications || [],
        // other_certification: caregiver_requirements?.other_certification,
        other_certification: otherCertifications,
        certificates_are_dealbreaker:
          caregiver_requirements?.certifications_dealbreaker,
      },
      availability: family_availability?.selected_availability,
      availability_is_dealbreaker: family_availability?.is_dealbreaker,
      arrangement_type: family_arrangement?.selected_arrangement,
      arrangement_type_is_dealbreaker: family_arrangement?.is_dealbreaker,
      job_commitment: {
        commitment: family_commitment?.selected_commitment,
        start_date: family_commitment?.start_date
          ? new Date(family_commitment.start_date).toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            })
          : null,
        end_date: family_commitment?.end_date
          ? new Date(family_commitment.end_date).toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            })
          : null,
        is_dealbreaker: family_commitment?.is_dealbreaker,
      },
      service_days: family_schedule.map((day) => ({
        day: day.day,
        begin: day.timeSlot?.begin,
        end: day.timeSlot?.end,
      })),
      responsibilities: {
        childcare_responsibilities: selectedChildcareResponsibilities,
        // other_childcare_responsibilities: '',
        other_childcare_responsibilities: otherChildResponsibilities,
        household_responsibilities: selectedHouseholdResponsibilities,
        // other_household_responsibilities: '',
        other_household_responsibilities: otherHouseholdResponsibilities,
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
          What responsibilities{'\n'}do you require your{'\n'}caregiver to
          fulfill?
        </ThemedText>

        <ThemedText style={styles.subtitle2}>
          You can choose up to 10 options and minimum of 3
        </ThemedText>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText style={styles.subtitle}>
            Please select between {MIN_RESPONSIBILITIES} and{' '}
            {MAX_RESPONSIBILITIES} responsibilities. More responsibilities may
            result in higher service rates.
          </ThemedText>

          <View style={styles.selectionCount}>
            <ThemedText style={styles.selectionCountText}>
              Selected: {family_responsibilities.length}/{MAX_RESPONSIBILITIES}
            </ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Childcare Responsibilities
            </ThemedText>
            <View style={styles.pillsContainer}>
              {childcareResponsibilities.map((item) => (
                <Pill
                  key={item.id}
                  label={item.label}
                  selected={family_responsibilities.includes(item.label)}
                  onPress={() => toggleResponsibility(item.id, item.label)}
                  disabled={
                    !family_responsibilities.includes(item.label) &&
                    family_responsibilities.length >= MAX_RESPONSIBILITIES
                  }
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Household Responsibilities
            </ThemedText>
            <View style={styles.pillsContainer}>
              {householdResponsibilities.map((item) => (
                <Pill
                  key={item.id}
                  label={item.label}
                  selected={family_responsibilities.includes(item.label)}
                  onPress={() => toggleResponsibility(item.id, item.label)}
                  disabled={
                    !family_responsibilities.includes(item.label) &&
                    family_responsibilities.length >= MAX_RESPONSIBILITIES
                  }
                />
              ))}
            </View>
          </View>
        </ScrollView>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContainer}>
            <Button
              // label='Next'
              onPress={handleSubmit}
              variant='compact'
              disabled={
                family_responsibilities.length < MIN_RESPONSIBILITIES ||
                family_responsibilities.length > MAX_RESPONSIBILITIES
              }
              loading={submit.isPending}
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
    // marginBottom: 16,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 16,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  selectionCount: {
    marginBottom: 16,
  },
  selectionCountText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },

  subtitle2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
    marginBottom: 24,
    marginTop: 24,
  },
});
