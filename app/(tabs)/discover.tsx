import ProfileCardLoader from '@/components/cards/ProfileCardLoader';
import EmptyDiscovery from '@/components/discovery/EmptyDiscovery';
import { Container } from '@/components/home/Container';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HomeNav } from '@/components/home/HomeNav';
import { FloatingButton } from '@/components/ui/FloatingButton';
import useAuthMutation from '@/hooks/useAuthMutation';
import {
  fetchMatchingCaregiversInfinity,
  useCurrentUser,
  useMatchingCaregivers,
} from '@/services/api/api';
import customAxios from '@/services/api/envConfig';
import { useUserStore } from '@/services/state/user';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function Discover() {
  const router = useRouter();
  const { token, user: storedUser } = useUserStore();
  const { width: windowWidth } = useWindowDimensions();
  const buttonWidth = (windowWidth - 100) / 2;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursor, setCursor] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [nextCursor, setNextCursor] = useState('');
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser({
    initialData: storedUser,
    enabled: !!token
  });
  const containerRef = useRef<ContainerRef>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (!storedToken) {
        router.replace('/(auth)/signInPhone');
        return;
      }
      customAxios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    };
    
    checkAuth();
  }, [router]);

  useEffect(() => {
    console.log('Auth State:', {
      token: token,
      currentUser: currentUser,
      storedUser: storedUser
    });
  }, [token, currentUser, storedUser]);

  useEffect(() => {
    if (token) {
      customAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const { data, isLoading, error, refetch } = useMatchingCaregivers(
    cursor,
    currentUser?.role === 'FAMILY' 
      ? '/family-discovery/get-matching-caregivers'
      : '/caregiver-discovery/get-matching-families',
    {
      enabled: !!token,
      onSuccess: (response) => {
        console.log('API Success:', response);
        // Handle both caregiver and family data
        const profiles = currentUser?.role === 'FAMILY' 
          ? response.data?.scored_caregivers 
          : response.data?.scored_families;
        
        if (profiles) {
          setProfiles(profiles);
          if (profiles.length > 0 && currentIndex < profiles.length) {
            setCurrentProfile(profiles[currentIndex]);
          }
        }
      },
      onError: (error) => {
        console.error('Discovery fetch error:', error);
      }
    }
  );

  useEffect(() => {
    if (currentUser?.role === 'FAMILY' && data?.data?.scored_caregivers) {
      const caregivers = data.data.scored_caregivers;
      setProfiles(caregivers);
      
      if (caregivers.length > 0 && currentIndex < caregivers.length) {
        setCurrentProfile(caregivers[currentIndex]);
      }
    } else if (currentUser?.role === 'CAREGIVER' && data?.data?.scored_families) {
      const families = data.data.scored_families;
      setProfiles(families);
      
      if (families.length > 0 && currentIndex < families.length) {
        setCurrentProfile(families[currentIndex]);
      }
    }
  }, [data, currentIndex]);

  console.log('Query Data:', data);
  console.log('Profiles:', profiles);
  console.log('Current Index:', currentIndex);
  console.log('Current Profile:', currentProfile);

  console.log('nextCursor***', nextCursor);

  const moveToNextProfile = useCallback(() => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (nextCursor && currentUser?.plan === 'STANDARD') {
      setCursor(nextCursor);
      setCurrentIndex(0);
    }
  }, [currentIndex, profiles.length, nextCursor, currentUser?.plan]);

  console.log(
    'currentUser***===',
    currentProfile?.score,
    currentProfile?.caregiver_profile?.id
  );

  const submitLike = useAuthMutation({
    mutationFn: (data: any) => {
      const endpoint =
        currentUser?.role === 'FAMILY'
          ? `/family-discovery/like-caregiver`
          : `/caregiver-discovery/like-families`;
      console.log('Like Request:', {
        endpoint,
        payload: {
          caregiver_profile_id: currentProfile?.caregiver_profile?.id,
          score: currentProfile?.score,
        }
      });
      return customAxios.patch(endpoint, {
        caregiver_profile_id: currentProfile?.caregiver_profile?.id,
        score: currentProfile?.score,
      });
    },
    onSuccess: (data: any) => {
      console.log('Like Success Response:', data);
      moveToNextProfile();
    },
    onError: (error: any) => {
      console.log('Like Error Response:', {
        error: error?.response?.data,
        status: error?.response?.status
      });
      if (error['response'].data?.message === 'Caregiver already liked') {
        return moveToNextProfile();
      }
      setCurrentIndex(Math.max(0, currentIndex - 1));
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error['response'].data?.message,
      });
    },
  });

  const submitReject = useAuthMutation({
    mutationFn: (data: any) => {
      const endpoint =
        currentUser?.role === 'FAMILY'
          ? `/family-discovery/reject-caregiver/${currentProfile?.caregiver_profile?.id}`
          : `/caregiver-discovery/reject-families/${currentProfile?.family_profile?.id}`;
      console.log('Reject Request:', {
        endpoint,
        profileId: currentProfile?.caregiver_profile?.id
      });
      return customAxios.patch(endpoint);
    },
    onSuccess: (data: any) => {
      console.log('Reject Success Response:', data);
      moveToNextProfile();
    },
    onError: (error: any) => {
      console.log('Reject Error Response:', {
        error: error?.response?.data,
        status: error?.response?.status
      });
      setCurrentIndex(Math.max(0, currentIndex - 1));
      console.log('error', error['response'].data);
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

  console.log('currentProfile***', currentUser?.role);

  const profileData = currentProfile ? {
    image: currentUser?.role === 'FAMILY'
      ? currentProfile?.caregiver_profile?.pictures?.[0]?.path
      : currentProfile?.family_profile?.pictures?.find(pic => pic.type === 'PROFILE_PICTURE')?.path || '',
    name: currentUser?.role === 'FAMILY'
      ? currentProfile?.caregiver_profile?.name
      : currentProfile?.family_profile?.name || '',
    description: currentUser?.role === 'FAMILY'
      ? undefined 
      : currentProfile?.family_profile?.description?.description,
    children: currentUser?.role === 'FAMILY'
      ? undefined
      : currentProfile?.family_profile?.children?.map(child => 
          `${child.count} ${child.age_group}${child.count > 1 ? 's' : ''}`
        ).join(', '),
    location: `📍 ${
      currentUser?.role === 'FAMILY' 
        ? currentProfile?.caregiver_profile?.zipcode 
        : currentProfile?.family_profile?.zipcode
    }`,
    age: currentUser?.role === 'FAMILY'
      ? currentProfile?.caregiver_profile?.date_of_birth
        ? calculateAge(currentProfile.caregiver_profile.date_of_birth)
        : 0
      : 0,
    role: currentUser?.role === 'FAMILY'
      ? currentProfile?.caregiver_profile?.caregiver_type 
        ? `🧢 ${currentProfile.caregiver_profile.caregiver_type}`
        : ''
      : '',
    address: '📍 ',
    pronouns: currentUser?.role === 'FAMILY'
      ? currentProfile?.caregiver_profile?.pronouns || ''
      : '',
    rating: parseFloat(currentProfile?.score || '0'),
    experience: [
      currentUser?.role === 'FAMILY'
        ? currentProfile?.caregiver_profile?.years_of_experience || ''
        : '',
      ...(currentUser?.role === 'FAMILY' ? currentProfile?.caregiver_profile?.ages_best_with || [] : [])
    ].filter(Boolean),
    lookingFor: currentUser?.role === 'FAMILY'
      ? currentProfile?.caregiver_profile?.availability || []
      : [],
    hourlyRate: currentUser?.role === 'FAMILY'
      ? currentProfile?.caregiver_profile?.payment_info?.type === 'Hourly'
        ? `$${currentProfile?.caregiver_profile?.payment_info?.hourly_min || 0} - $${
            currentProfile?.caregiver_profile?.payment_info?.hourly_max || 0
          }`
        : `$${currentProfile?.caregiver_profile?.payment_info?.salary || 0}/year`
      : '',
    languages: [
      ...(currentUser?.role === 'FAMILY' ? currentProfile?.caregiver_profile?.language?.languages || [] : []),
      currentUser?.role === 'FAMILY' ? currentProfile?.caregiver_profile?.language?.other : '',
    ].filter(Boolean),
    interests: [
      ...(currentUser?.role === 'FAMILY' ? currentProfile?.caregiver_profile?.hobbies?.creative_interests || [] : []),
      ...(currentUser?.role === 'FAMILY' ? currentProfile?.caregiver_profile?.hobbies?.sport_interests || [] : []),
      ...(currentUser?.role === 'FAMILY' ? currentProfile?.caregiver_profile?.hobbies?.instrument_interests || [] : []),
      ...(currentUser?.role === 'FAMILY' ? currentProfile?.caregiver_profile?.hobbies?.stem_interests || [] : [])
    ].filter(Boolean),
    obsession: currentUser?.role === 'FAMILY'
      ? currentProfile?.caregiver_profile?.prompts?.[0]?.answer || '-'
      : '',
    religion: currentUser?.role === 'FAMILY'
      ? currentProfile?.caregiver_profile?.characteristics?.religion || ''
      : '',
    personality: currentUser?.role === 'FAMILY'
      ? currentProfile?.caregiver_profile?.characteristics?.personalities || []
      : [],
    disabilities: currentUser?.role === 'FAMILY'
      ? currentProfile?.caregiver_profile?.experience_with_disabilities?.disabilities || []
      : [],
  } : null;

  // Add debug logs
  console.log('Data received:', data?.data?.scored_caregivers);
  console.log('Current Index:', currentIndex);
  console.log('Current Profile:', currentProfile);
  console.log('Transformed Profile Data:', profileData);

  const handleLike = (index: number) => {
    submitLike.mutate();
  };

  const handleReject = (index: number) => {
    submitReject.mutate();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeHeader />
        <View style={styles.content}>
          <View style={[styles.containerWrapper, { height: '80%' }]}>
            {isLoadingCurrentUser || isLoading ? (
              <ProfileCardLoader />
            ) : !currentProfile ? (
              <View style={styles.emptyStateContainer}>
                <EmptyDiscovery role={currentUser?.role} />
              </View>
            ) : (
              <Container 
                ref={containerRef}
                profileData={profileData} 
                data={currentProfile}
                onLike={() => handleLike(currentIndex)}
                onReject={() => handleReject(currentIndex)}
              />
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
                  console.log('rejected');
                  containerRef.current?.animateReject();
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
                  console.log('liked');
                  containerRef.current?.animateLike();
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
  },
  containerWrapper: {
    flex: 1,
    paddingVertical: 8,
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
