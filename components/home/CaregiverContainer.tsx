import { Benefits } from '@/components/caregiver/Benefits';
import { CaregiverImage } from '@/components/caregiver/CaregiverImage';
import { CaregiverProfileCard } from '@/components/caregiver/CaregiverProfileCard';
import { ChildCare } from '@/components/caregiver/ChildCare';
import { Diets } from '@/components/caregiver/Diets';
import { Idea } from '@/components/caregiver/Idea';
import { Interests } from '@/components/caregiver/Interests';
import { LookingFor } from '@/components/caregiver/LookingFor';
import { Obsession } from '@/components/caregiver/Obsession';
import { OneThing } from '@/components/caregiver/OneThing';
import { Personality } from '@/components/caregiver/Personality';
import { Schedule } from '@/components/caregiver/Schedule';
import { We } from '@/components/caregiver/We';
import { WorkType } from '@/components/caregiver/WorkType';
import { ThemedText } from '@/components/ThemedText';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

interface CaregiverContainerProps {
  profileData: {
    image?: string;
    name?: string;
    age?: number;
    location?: string;
    pronouns?: string;
    rating?: number;
    role?: string;
    experience?: string[];
    availability?: string[];
    hourlyRate?: string;
    languages?: string[];
    interests?: string[];
    specialties?: string[];
    religion?: string;
    personality?: string[];
    certifications?: string[];
    address?: string;
  } | null;
  data?: any;
  onLike?: () => void;
  onReject?: () => void;
}

export interface CaregiverContainerRef {
  swipeRight: () => void;
  swipeLeft: () => void;
  scrollToTop: () => void;
}

const CaregiverContainer = forwardRef<
  CaregiverContainerRef,
  CaregiverContainerProps
>(({ profileData, data, onLike, onReject }, ref) => {
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 768;
  const containerWidth = Math.min(windowWidth * 0.9, 500);

  console.log('profileData==========', profileData);

  // Add animation values
  const slideAnim = new Animated.Value(0);
  const rotateAnim = slideAnim.interpolate({
    inputRange: [-windowWidth, 0, windowWidth],
    outputRange: ['-15deg', '0deg', '15deg'],
  });
  const opacityAnim = slideAnim.interpolate({
    inputRange: [-windowWidth / 2, 0, windowWidth / 2],
    outputRange: [0.5, 1, 0.5],
  });

  const swipeThreshold = windowWidth * 0.25;

  // Setup PanResponder for swipe gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      slideAnim.setValue(gesture.dx);
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > swipeThreshold) {
        // Swiped right - like
        swipeRight();
      } else if (gesture.dx < -swipeThreshold) {
        // Swiped left - reject
        swipeLeft();
      } else {
        // Reset position
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const swipeRight = () => {
    Animated.timing(slideAnim, {
      toValue: windowWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(0);
      onLike?.();
    });
  };

  const swipeLeft = () => {
    Animated.timing(slideAnim, {
      toValue: -windowWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(0);
      onReject?.();
    });
  };

  const scrollViewRef = useRef<ScrollView>(null);

  console.log('profileData=====', profileData?.experience);

  useImperativeHandle(ref, () => ({
    swipeRight,
    swipeLeft,
    scrollToTop: () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    },
  }));

  if (!profileData || !data) {
    return (
      <View style={[styles.container, { width: containerWidth }]}>
        <View style={styles.emptyStateContainer}>
          <ThemedText style={styles.emptyStateText}>
            No caregiver profiles available
          </ThemedText>
          <ThemedText style={styles.emptyStateSubText}>
            Check back later for new caregivers
          </ThemedText>
        </View>
      </View>
    );
  }

  // Prepare profile card props to ensure required props are provided
  const profileCardProps = {
    familyName: profileData?.name || 'Family',
    location: profileData?.location || 'Location not provided',
    salary:
      profileData?.extra_info?.payment_info?.type === '🤑 Hourly'
        ? `$${profileData?.extra_info?.payment_info?.hourly_min} - $${profileData?.extra_info?.payment_info?.hourly_max}/hour`
        : `${profileData?.extra_info?.payment_info?.salary}/year`,
    familyType: profileData?.description, // This could be made dynamic based on data
    rating: profileData?.rating || 4.5,
    image:
      profileData?.image?.[0]?.path ||
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2920&auto=format&fit=crop',
    profileData: profileData,
  };

  console.log('images======', profileData);

  return (
    <ScrollView ref={scrollViewRef}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.container,
          {
            width: containerWidth,
            transform: [{ translateX: slideAnim }, { rotate: rotateAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <CaregiverProfileCard {...profileCardProps} />
      </Animated.View>

      <View
        style={[styles.container, { width: containerWidth, marginTop: 16 }]}
      >
        <We
          children={profileData?.children}
          pets={profileData?.pets}
          languages={profileData?.languages}
        />
      </View>

      <View
        style={[styles.container, { width: containerWidth, marginTop: 16 }]}
      >
        <Interests
          interests={profileData?.interests}
          images={profileData?.image}
        />
      </View>

      <View
        style={[styles.container, { width: containerWidth, marginTop: 16 }]}
      >
        <Personality
          personalityTraits={profileData?.personality}
          experiences={profileData?.experience}
          allergies={[
            ...(profileData?.allergies?.food_allergies || []),
            profileData?.allergies?.other_food_allergies,
            ...(profileData?.allergies?.environmental_allergies || []),
            profileData?.allergies?.other_environtal_allergies,
            ...(profileData?.allergies?.other_allergies || []),
            profileData?.allergies?.other_other_allergies,
          ].filter(Boolean)}
        />
      </View>

      <View
        style={[styles.container, { width: containerWidth, marginTop: 16 }]}
      >
        <Diets
          diets={profileData?.diets}
          householdRules={profileData?.rules}
          images={profileData?.image}
        />
      </View>

      <View
        style={[styles.container, { width: containerWidth, marginTop: 16 }]}
      >
        <CaregiverImage data={profileData?.image?.[3]?.path} />
      </View>

      <View
        style={[styles.container, { width: containerWidth, marginTop: 16 }]}
      >
        <LookingFor
          title='We are looking for ..'
          jobType={profileData?.caregiver_preference?.caregiver_types || []}
          startDate={
            profileData?.caregiver_preference?.job_commitment?.start_date
          }
          hourlyRate={`$${profileData?.extra_info?.payment_info?.hourly_min} - $${profileData?.extra_info?.payment_info?.hourly_max}`}
          education={
            profileData?.caregiver_preference?.requirements?.certifications ||
            []
          }
          otherEducation={
            profileData?.caregiver_preference?.requirements?.other_certification
          }
        />
      </View>

      <View
        style={[styles.container, { width: containerWidth, marginTop: 16 }]}
      >
        <WorkType
          workType={[profileData?.caregiver_preference?.arrangement_type]}
          workOptions={[profileData?.caregiver_preference?.availability]}
          duration={[
            profileData?.caregiver_preference?.job_commitment?.commitment,
          ]}
          requirements={[
            ...(profileData?.caregiver_preference?.requirements?.requirements ||
              []),
            profileData?.caregiver_preference?.requirements?.other_requirement,
          ].filter(Boolean)}
          // OtherRequirements={}
        />
      </View>

      {/* <View
        style={[styles.container, { width: containerWidth, marginTop: 16 }]}
      >
        <ChildCare
          childcareResponsibilities={[
            ...(profileData?.caregiver_preference?.responsibilities
              ?.childcare_responsibilities || []),
            profileData?.caregiver_preference?.responsibilities
              ?.other_childcare_responsibilities,
          ].filter(Boolean)}
          householdResponsibilities={[
            ...(profileData?.caregiver_preference?.responsibilities
              ?.household_responsibilities || []),
            profileData?.caregiver_preference?.responsibilities
              ?.other_household_responsibilities,
          ].filter(Boolean)}
        />
      </View>

      <View
        style={[styles.container, { width: containerWidth, marginTop: 16 }]}
      >
        <Benefits benefits={profileData?.extra_info?.benefits?.benefits} />
      </View> */}
    </ScrollView>
  );
});

export { CaregiverContainer };

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    overflow: 'hidden',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold',
    color: '#002140',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    textAlign: 'center',
  },
});
