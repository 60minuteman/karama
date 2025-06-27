import ProfileCardLoader from '@/components/cards/ProfileCardLoader';
import EmptyDiscovery from '@/components/discovery/EmptyDiscovery';
import Skip from '@/components/discovery/Skip';
import {
  CaregiverContainer,
  CaregiverContainerRef,
} from '@/components/home/CaregiverContainer';
import { Container, ContainerRef } from '@/components/home/Container';
import {
  ContainerTwo,
  ContainerRef as ContainerTwoRef,
} from '@/components/home/ContainerTwo';
// import ContainerTwo from '@/components/home/ContainerTwo';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HomeNav } from '@/components/home/HomeNav';
import { FloatingButton } from '@/components/ui/FloatingButton';
import useAuthMutation from '@/hooks/useAuthMutation';
import {
  fetchCurrentUser,
  fetchMatchingCaregiversInfinity,
  useCurrentUser,
  useMatchingCaregivers,
} from '@/services/api/api';
import customAxios from '@/services/api/envConfig';
import { useStore } from '@/services/state/State';
import { useUserStore } from '@/services/state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

interface Profile {
  caregiver_profile?: {
    id: string;
    name: string;
    date_of_birth: string;
    caregiver_type: string;
    pronouns: string;
    gender: string;
    zipcode: string;
    years_of_experience: string;
    education_level: string;
    show_edu_level_on_profile: boolean;
    ages_best_with: string[];
    children_capacity: number;
    childcare_philosophies: string[];
    availability: string[];
    arrangement_type: string;
    required_benfits: string[];
    other_required_benefits: string;
    location: string;
    payment_info: {
      type: string;
      hourly_min: number;
      hourly_max: number;
      salary: number;
    };
    prompts: Array<{
      answer: string;
      title: string;
    }>;
    language: {
      languages: string[];
      other: string;
    };
    hobbies: {
      creative_interests: string[];
      instrument_interests: string[];
      sport_interests: string[];
      stem_interests: string[];
    };
    characteristics: {
      religion: string;
      personalities: string[];
    };
    experience_with_disabilities: {
      disabilities: string[];
    };
    pictures?: { path: string }[];
  };
  family_profile?: {
    id: string;
    name: string;
    location: string;
    description: { description: string };
    children: Array<{ age_group: string; count: number }>;
    pictures: Array<{ path: string; type: string }>;
    household_info: { religion: string; diets: string[]; rules: string[] };
    languages: string[];
    other_languages: string;
    children_interests: {
      creative_interests: string[];
      instrument_interests: string[];
      sport_interests: string[];
      stem_interests: string[];
    };
    caregiver_preference: { personalities: string[] };
    behavioural_differences: string[];
    pets: any;
    extra_info: {
      payment_info: {
        type: string;
        hourly_min: number;
        hourly_max: number;
        salary: number;
      };
    };
    allergies: any;
  };
  payment_info?: {
    hourly_min: number;
    hourly_max: number;
  };
  score?: string;
}

interface User {
  role?: string;
  plan?: string;
}

// Add interface for family profile
interface FamilyProfile {
  id: string;
  name: string;
  zipcode: string;
  description: {
    description: string;
  };
  pictures: Array<{
    path: string;
    type: string;
  }>;
  children: Array<{
    age_group: string;
    count: number;
  }>;
  household_info: {
    religion: string;
    diets: string[];
    rules: string[];
  };
}

interface UserData {
  data?: {
    role?: 'FAMILY' | 'CAREGIVER';
    plan?: string;
  };
  role?: 'FAMILY' | 'CAREGIVER';
  plan?: string;
  // Add other properties that you use from userData
}

export default function DiscoverScreen() {
  const router = useRouter();
  const { token, user: storedUser } = useUserStore();
  const { width: windowWidth } = useWindowDimensions();
  const buttonWidth = (windowWidth - 100) / 2;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursor, setCursor] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [nextCursor, setNextCursor] = useState('');
  // Removed swipedProfileIds tracking for simplicity
  const [showingSkippedProfiles, setShowingSkippedProfiles] = useState(false);
  const [skippedProfiles, setSkippedProfiles] = useState<Profile[]>([]);
  const [hasCheckedSkippedProfiles, setHasCheckedSkippedProfiles] =
    useState(false);
  const [hasSkippedProfiles, setHasSkippedProfiles] = useState(false);
  const [isRefetchingProfiles, setIsRefetchingProfiles] = useState(false);
  const containerTwoRef = useRef<ContainerTwoRef>(null);
  const caregiverContainerRef = useRef<CaregiverContainerRef>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { setMatchComplete, match_complete } = useStore();
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useCurrentUser() as {
      data: { data: { role: string } } | null;
      isLoading: boolean;
    };

  useEffect(() => {
    if (!token) {
      router.replace('/(auth)/signInPhone');
      return;
    }
  }, [token]);

  const { data: userData, isLoading: isLoadingUser } = useQuery<UserData>({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    enabled: !!token,
    staleTime: 30000,
    retry: false,
  });

    const { data, isLoading, error, refetch } = useMatchingCaregivers(
    cursor,
    userData?.data?.role === 'FAMILY'
      ? '/family-discovery/get-matching-caregivers'
      : '/caregiver-discovery/get-matching-families',
    {
      enabled: !!token && !!userData?.data?.role,
      onSuccess: (response: any) => {
        console.log('=== Discovery API Success ===');
        console.log('Response:', response);
        console.log('User role:', userData?.data?.role);
        
        // Handle both caregiver and family data
        const profiles =
          userData?.data?.role === 'FAMILY'
            ? response.data?.scored_caregivers
            : response.data?.scored_families;

        console.log('Extracted profiles:', profiles);
        console.log('Profiles length:', profiles?.length);

        if (profiles) {
          // If cursor is empty, it's the first batch - replace profiles
          // If cursor exists, it's a new batch - replace profiles with new batch
          setProfiles(profiles);
          
          if (profiles.length > 0) {
            // Set current profile to first profile of the batch
            console.log('Setting currentProfile:', profiles[0]);
            setCurrentProfile(profiles[0]);
            setCurrentIndex(0); // Always start from first profile of new batch
          } else {
            // Empty batch returned - no more profiles available
            setCurrentProfile(null);
          }
        }
        
        // Reset refetching state
        setIsRefetchingProfiles(false);
      },
      onError: (error: any) => {
        console.error('Discovery fetch error:', error);
        setIsRefetchingProfiles(false);
      },
    }
  );

  // Periodic profile checking
  useEffect(() => {
    if (!token || !userData?.data?.role) return;

    // Set up interval to check for new profiles every 3 minutes
    const REFETCH_INTERVAL = 3 * 60 * 1000; // 3 minutes

    intervalRef.current = setInterval(() => {
      console.log('=== Periodic Profile Check ===');
      setIsRefetchingProfiles(true);
      refetch();
    }, REFETCH_INTERVAL);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [token, userData?.role, refetch]);

  // Removed profile filtering for simplicity

  // Function to check if skipped profiles exist
  const checkSkippedProfiles = useAuthMutation({
    mutationFn: () => {
      const endpoint =
        userData?.data?.role === 'FAMILY'
          ? '/family-discovery/skipped-profiles-enquiry'
          : '/caregiver-discovery/skipped-profiles-enquiry';
      return customAxios.get(endpoint);
    },
    onSuccess: (response: any) => {
      console.log('Skipped profiles enquiry:', response.data);
      setHasCheckedSkippedProfiles(true);
      const hasSkipped = response.data?.data?.hasSkippedProfiles || false;
      setHasSkippedProfiles(hasSkipped);

      // If user has skipped profiles, automatically fetch them
      if (hasSkipped) {
        fetchSkippedProfiles.mutate();
      }
      // If no skipped profiles, currentProfile stays null and shows EmptyDiscovery
    },
    onError: (error: any) => {
      console.error('Error checking skipped profiles:', error);
      setHasCheckedSkippedProfiles(true);
      setHasSkippedProfiles(false); // Default to false on error
    },
  });

  // Function to fetch skipped profiles
  const fetchSkippedProfiles = useAuthMutation({
    mutationFn: () => {
      const endpoint =
        userData?.data?.role === 'FAMILY'
          ? '/family-discovery/get-skipped-profiles'
          : '/caregiver-discovery/get-skipped-profiles';
      return customAxios.get(endpoint);
    },
    onSuccess: (response: any) => {
      console.log('=== Skipped Profiles Fetch Success ===');
      console.log('Response structure:', {
        statusCode: response.data.statusCode,
        hasData: !!response.data.data,
        dataKeys: response.data.data ? Object.keys(response.data.data) : [],
      });
      
      const skippedData =
        userData?.data?.role === 'FAMILY'
          ? response.data?.data?.scored_caregivers || []
          : response.data?.data?.scored_families || [];

      console.log('Extracted skipped profiles:', skippedData.length, 'profiles');
      console.log('User role:', userData?.data?.role);
      console.log('Looking for:', userData?.data?.role === 'FAMILY' ? 'scored_caregivers' : 'scored_families');

      setSkippedProfiles(skippedData);
      setShowingSkippedProfiles(true);
      setHasCheckedSkippedProfiles(true);
      setCurrentIndex(0);

      if (skippedData.length > 0) {
        console.log('Setting first skipped profile:', {
          name: userData?.data?.role === 'FAMILY' 
            ? skippedData[0].caregiver_profile?.name 
            : skippedData[0].family_profile?.name,
          score: skippedData[0].score
        });
        setCurrentProfile(skippedData[0]);
      } else {
        console.log('No skipped profiles found - showing empty state');
        setCurrentProfile(null); // No skipped profiles, will show empty state
      }
    },
    onError: (error: any) => {
      console.error('Error fetching skipped profiles:', error);

      // For 504 timeout errors or any error, show empty state
      if (error.response?.status === 504 || error.code === 'ECONNABORTED') {
        console.log('Server timeout - showing empty state');
      }

      setHasCheckedSkippedProfiles(true);
      setShowingSkippedProfiles(false); // Reset skipped profiles mode
      setCurrentProfile(null); // Show empty state on error
    },
  });

  // console.log('currentUser', currentUser?.data?.role, data);

  // console.log('currentProfilecaregiver see===', data);

  useEffect(() => {
    console.log('=== Discovery useEffect ===');
    console.log('showingSkippedProfiles:', showingSkippedProfiles);
    console.log('currentUser:', currentUser);
    console.log('currentUser role:', currentUser?.data?.role);
    console.log('userData:', userData);
    console.log('userData role:', userData?.role);
    console.log('userData.data.role:', userData?.data?.role);
    console.log('token:', !!token);
    console.log('isLoading:', isLoading);
    console.log('data available:', !!data);
    console.log('data structure:', data);

    if (showingSkippedProfiles) {
      // Handle skipped profiles
      if (skippedProfiles.length > 0 && currentIndex < skippedProfiles.length) {
        setCurrentProfile(skippedProfiles[currentIndex]);
      } else {
        setCurrentProfile(null); // No more skipped profiles
      }
    } else if (userData?.data?.role) {
      // Handle regular profiles
      if (
        userData?.data?.role === 'FAMILY' &&
        (data as any)?.data?.scored_caregivers
      ) {
        console.log('Processing FAMILY user with caregivers');
        const caregivers = (data as any)?.data?.scored_caregivers;
        setProfiles(caregivers);
        setFilteredProfiles(caregivers);

        if (caregivers.length > 0 && currentIndex < caregivers.length) {
          console.log(
            'Setting currentProfile from useEffect:',
            caregivers[currentIndex]
          );
          setCurrentProfile(caregivers[currentIndex]);
        } else if (caregivers.length === 0) {
          // Empty batch returned - check for skipped profiles
          setCurrentProfile(null);
        }
      } else if (
        userData?.data?.role === 'CAREGIVER' &&
        (data as any)?.data?.scored_families
      ) {
        console.log('Processing CAREGIVER user with families');
        const families = (data as any)?.data?.scored_families;
        setProfiles(families);
        setFilteredProfiles(families);

        if (families.length > 0 && currentIndex < families.length) {
          console.log(
            'Setting currentProfile from useEffect:',
            families[currentIndex]
          );
          setCurrentProfile(families[currentIndex]);
        } else if (families.length === 0) {
          // Empty batch returned - check for skipped profiles
          setCurrentProfile(null);
        }
      } else {
        console.log(
          'No matching condition - Role:',
          userData?.data?.role,
          'Data keys:',
          Object.keys(data || {})
        );
      }
    }
  }, [
    data,
    currentIndex,
    userData?.data?.role,
    showingSkippedProfiles,
    skippedProfiles,
  ]);

  const moveToNextProfile = useCallback(() => {
    // Reset scroll position to top based on user role
    if (userData?.data?.role === 'FAMILY') {
      containerTwoRef.current?.scrollToTop();
    } else {
      caregiverContainerRef.current?.scrollToTop();
    }

    if (showingSkippedProfiles) {
      // Handle skipped profiles navigation
      if (currentIndex < skippedProfiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // No more skipped profiles - show empty state
        setCurrentProfile(null);
      }
    } else {
      // Handle regular profiles navigation
      if (currentIndex < profiles.length - 1) {
        // Move to next profile in current batch
        setCurrentIndex(currentIndex + 1);
      } else {
        // Reached end of current batch - check if we can fetch more
        const nextCursorFromData = (data as any)?.data?.next_cursor;
        
        if (nextCursorFromData) {
          // There are more profiles available - fetch next batch
          console.log('Fetching next batch with cursor:', nextCursorFromData);
          setIsRefetchingProfiles(true);
          setCursor(nextCursorFromData);
          setCurrentIndex(0); // Reset index for new batch
        } else {
          // No more profiles available from backend - show skip state
          setCurrentProfile(null);
        }
      }
    }
  }, [
    currentIndex,
    profiles.length,
    data,
    showingSkippedProfiles,
    skippedProfiles.length,
    userData?.data?.role,
  ]);

  const submitLike: any = useAuthMutation({
    mutationFn: (data: any) => {
      const endpoint =
        userData?.data?.role === 'FAMILY'
          ? `/family-discovery/like-caregiver`
          : `/caregiver-discovery/like-family`;
      return customAxios.patch(endpoint, data);
    },
    onSuccess: (data: any) => {
      console.log('like data', data?.data);
      moveToNextProfile();
      if (
        userData?.data?.role === 'FAMILY' &&
        data?.data?.match.match_status === 'COMPLETED'
      ) {
        setMatchComplete(data?.data);
        router.push('/(app)/itsAmatch');
        return;
      }

      if (
        userData?.data?.role === 'CAREGIVER' &&
        data?.data?.match.match_status === 'COMPLETED'
      ) {
        setMatchComplete(data?.data);
        router.push('/(app)/profileScreens/caregiverItsAmatch');
        return;
      }
    },
    onError: (error: any) => {
      if (
        error['response'].data?.message == 'Caregiver already liked' ||
        error['response'].data?.message == 'Family already liked'
      ) {
        return moveToNextProfile();
      }
      setCurrentIndex(Math.max(0, currentIndex - 1));
      console.log(
        'error["response"].data?.message',
        error['response'].data?.message
      );
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error['response'].data?.message,
      });
    },
  });

  const submitReject: any = useAuthMutation({
    mutationFn: (data: any) => {
      const endpoint =
        userData?.data?.role === 'FAMILY'
          ? `/family-discovery/reject-caregiver/${currentProfile?.caregiver_profile?.id}`
          : `/caregiver-discovery/reject-families/${currentProfile?.family_profile?.id}`;
      return customAxios.patch(endpoint);
    },
    onSuccess: (data: any) => {
      moveToNextProfile();
    },
    onError: (error: any) => {
      setCurrentIndex(Math.max(0, currentIndex - 1));
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error['response'].data?.message,
      });
    },
  });

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  // console.log('currentProfile', currentProfile);

  const profileDataFamily = currentProfile
    ? {
        image:
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.pictures?.[0]?.path || ''
            : currentProfile?.family_profile?.pictures?.find(
                (pic) => pic.type === 'PROFILE_PICTURE'
              )?.path || '',
        name:
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.name || ''
            : currentProfile?.family_profile?.name || '',
        description:
          userData?.data?.role === 'FAMILY'
            ? ''
            : currentProfile?.family_profile?.description?.description || '',
        children:
          userData?.data?.role === 'FAMILY'
            ? ''
            : currentProfile?.family_profile?.children
                ?.map(
                  (child) =>
                    `${child.count} ${child.age_group}${
                      child.count > 1 ? 's' : ''
                    }`
                )
                .join(', ') || '',
        location: `📍 ${
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.location
            : currentProfile?.family_profile?.location
        }`,
        age:
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.date_of_birth
              ? calculateAge(currentProfile.caregiver_profile.date_of_birth)
              : 0
            : 0,
        role:
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.caregiver_type
              ? `🧢 ${currentProfile.caregiver_profile.caregiver_type}`
              : ''
            : '',
        address: '📍 ',
        pronouns:
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.pronouns || ''
            : '',
        rating: parseFloat(currentProfile?.score || '0'),
        experience: [
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.years_of_experience || ''
            : '',
          ...(userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.ages_best_with || []
            : []),
        ].filter(Boolean),
        lookingFor:
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.availability || []
            : [],
        hourlyRate:
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.payment_info?.type === 'Hourly'
              ? `$${
                  currentProfile?.caregiver_profile?.payment_info?.hourly_min ||
                  0
                } - $${
                  currentProfile?.caregiver_profile?.payment_info?.hourly_max ||
                  0
                }`
              : `$${
                  currentProfile?.caregiver_profile?.payment_info?.salary || 0
                }/year`
            : '',
        languages: [
          ...(userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.language?.languages || []
            : []),
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.language?.other || ''
            : '',
        ].filter((lang): lang is string => Boolean(lang)),
        interests: [
          ...(userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.hobbies?.creative_interests ||
              []
            : []),
          ...(userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.hobbies?.sport_interests || []
            : []),
          ...(userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.hobbies
                ?.instrument_interests || []
            : []),
          ...(userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.hobbies?.stem_interests || []
            : []),
        ].filter(Boolean),
        obsession:
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.prompts?.[0]?.answer || '-'
            : '',
        religion:
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.characteristics?.religion || ''
            : '',
        personality:
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.characteristics
                ?.personalities || []
            : [],
        disabilities:
          userData?.data?.role === 'FAMILY'
            ? currentProfile?.caregiver_profile?.experience_with_disabilities
                ?.disabilities || []
            : [],
      }
    : null;

  // console.log('profileDataFamily', profileDataFamily);

  console.log('currentProfile', currentProfile);

  const profileDataCaregiver: any = {
    image: currentProfile?.family_profile?.pictures, // No image path provided in the data
    name: currentProfile?.family_profile?.name || '', // "Smith Family"
    description: currentProfile?.family_profile?.description?.description || '', // "Mom & Dad"
    children: currentProfile?.family_profile?.children, // "1 Teenager, 1 Pre Schooler"
    location: `📍 ${currentProfile?.family_profile?.location}`, // "📍 12345"
    rating: currentProfile?.score || '0', // 5.0
    experience: [
      currentProfile?.family_profile?.household_info?.rules?.join('-') || '', // "1-5 years"
      ...(currentProfile?.family_profile?.household_info?.diets || []), // ["Nanny", "Babysitter"]
    ],
    lookingFor: [
      currentProfile?.family_profile?.household_info?.rules?.join(', ') || '',
    ], // ["Full Time"]
    hourlyRate:
      currentProfile?.family_profile?.extra_info?.payment_info?.type ===
      'Hourly'
        ? `$${currentProfile?.family_profile?.extra_info?.payment_info?.hourly_min} - $${currentProfile?.family_profile?.extra_info?.payment_info?.hourly_max}`
        : `$${currentProfile?.family_profile?.extra_info?.payment_info?.salary}/year`, // "$20 - $45"
    languages: [
      ...(currentProfile?.family_profile?.languages || []), // ["English", "Spanish"]
      currentProfile?.family_profile?.other_languages || '',
    ].filter(Boolean),
    interests: [
      ...(currentProfile?.family_profile?.children_interests
        ?.creative_interests || []), // ["Painting", "Singing"]
      ...(currentProfile?.family_profile?.children_interests
        ?.instrument_interests || []), // ["Piano", "Guitar"]
      ...(currentProfile?.family_profile?.children_interests?.sport_interests ||
        []), // ["Soccer", "Basketball"]
      ...(currentProfile?.family_profile?.children_interests?.stem_interests ||
        []), // ["Coding", "Robotics"]
    ].filter(Boolean),
    religion: currentProfile?.family_profile?.household_info?.religion || '', // "Christianity"
    personality:
      currentProfile?.family_profile?.caregiver_preference?.personalities || [], // ["Bubbly", "Patient"]
    disabilities: currentProfile?.family_profile?.behavioural_differences || [], // ["Dyslexia", "ADHD", "Schizophrenia", "Misophonia"]
    pets: currentProfile?.family_profile?.pets,
    diets: currentProfile?.family_profile?.household_info?.diets,
    rules: currentProfile?.family_profile?.household_info?.rules,
    caregiver_preference: currentProfile?.family_profile?.caregiver_preference,
    extra_info: currentProfile?.family_profile?.extra_info,
    allergies: currentProfile?.family_profile?.allergies,
    // education: currentProfile?.family_profile?.
  };

  // console.log('profiledata', currentProfile?.family_profile?.pictures);

  const handleLike = () => {
    submitLike.mutate(
      userData?.data?.role === 'FAMILY'
        ? {
            caregiver_profile_id: `${currentProfile?.caregiver_profile?.id}`,
            score: `${currentProfile?.score}`,
          }
        : {
            family_profile_id: `${currentProfile?.family_profile?.id}`,
            score: `${currentProfile?.score}`,
          }
    );
  };

  const handleReject = () => {
    submitReject.mutate();
  };

  // Show loading or return early if not authenticated
  if (!token || isLoadingUser) return null;

  // console.log(currentUser, 'check');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeHeader />
        <View style={styles.content}>
          <View
            style={[
              styles.containerWrapper,
              { height: '80%', alignItems: 'center' },
            ]}
          >
            {isLoadingUser || isLoading || isRefetchingProfiles ? (
              <ProfileCardLoader />
            ) : !currentProfile &&
              !hasCheckedSkippedProfiles &&
              !(data as any)?.data?.next_cursor ? (
              <View style={styles.emptyStateContainer}>
                <Skip onReviewSkipped={() => {
                  console.log('=== User clicked Review Skipped Profiles ===');
                  checkSkippedProfiles.mutate();
                }} />
              </View>
            ) : !currentProfile &&
              hasCheckedSkippedProfiles &&
              hasSkippedProfiles ? (
              <View style={styles.emptyStateContainer}>
                <Skip onReviewSkipped={() => fetchSkippedProfiles.mutate()} />
              </View>
            ) : !currentProfile &&
              hasCheckedSkippedProfiles &&
              !hasSkippedProfiles ? (
              <View style={styles.emptyStateContainer}>
                <EmptyDiscovery role={currentUser?.data?.role || ''} />
              </View>
            ) : !currentProfile ? (
              <ProfileCardLoader />
            ) : (
              <>
                {userData?.data?.role === 'FAMILY' ? (
                  <>
                    <ContainerTwo
                      ref={containerTwoRef}
                      data={currentProfile}
                      profileData={profileDataFamily}
                      onLike={() => handleLike()}
                      onReject={() => handleReject()}
                      role={
                        userData?.data?.role === 'FAMILY'
                          ? 'CAREGIVER'
                          : 'FAMILY'
                      }
                    />
                  </>
                ) : (
                  <>
                    <CaregiverContainer
                      ref={caregiverContainerRef}
                      profileData={profileDataCaregiver}
                      data={currentProfile}
                      onLike={() => handleLike()}
                      onReject={() => handleReject()}
                    />
                  </>
                )}
              </>
            )}
          </View>
          {currentProfile && (
            <>
              <FloatingButton
                icon={
                  <Image
                    source={require('@/assets/picker/xmark.png')}
                    style={[styles.icon, styles.xmarkIcon]}
                  />
                }
                style={[styles.rejectButton, { width: buttonWidth }] as any}
                onPress={() => {
                  if (userData?.data?.role === 'FAMILY') {
                    containerTwoRef.current?.swipeLeft();
                  } else {
                    caregiverContainerRef.current?.swipeLeft();
                  }
                }}
              />
              <FloatingButton
                icon={
                  <Image
                    source={require('@/assets/picker/heart.png')}
                    style={[styles.icon, styles.heartIcon]}
                  />
                }
                style={[styles.likeButton, { width: buttonWidth }] as any}
                onPress={() => {
                  if (userData?.data?.role === 'FAMILY') {
                    containerTwoRef.current?.swipeRight();
                  } else {
                    caregiverContainerRef.current?.swipeRight();
                  }
                }}
              />
            </>
          )}
        </View>
        {/* <HomeNav /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    // paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
    // overflow: 'hidden',
  },
  containerWrapper: {
    flex: 1,
    paddingVertical: 8,
    // overflow: 'hidden',
    // backgroundColor: 'red',
  },
  icon: {
    width: 24,
    height: 24,
  },
  xmarkIcon: {
    tintColor: '#212329',
  },
  heartIcon: {
    tintColor: '#FF1818',
  },
  rejectButton: {
    position: 'absolute',
    left: 40,
    bottom: 60,
  },
  likeButton: {
    position: 'absolute',
    right: 40,
    bottom: 60,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
