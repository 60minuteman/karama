import ProfileCardLoader from '@/components/cards/ProfileCardLoader';
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
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function Discover() {
  const { width: windowWidth } = useWindowDimensions();
  const { token } = useUserStore();
  const buttonWidth = (windowWidth - 100) / 2; // Total width minus (40px * 2 padding + 20px gap)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursor, setCursor] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [nextCursor, setNextCursor] = useState('');
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useCurrentUser();

  const { data, isLoading, error, refetch } = useMatchingCaregivers(
    cursor,
    currentUser?.role
  );

  useEffect(() => {
    if (data?.data) {
      setProfiles(data.data.scored_caregivers || []);
      setNextCursor(data.data.next_cursor || '');
    }
  }, [data]);

  console.log('nextCursor***', nextCursor);

  useEffect(() => {
    if (profiles.length > 0) {
      setCurrentProfile(profiles[currentIndex]);
    }
  }, [profiles, currentIndex]);

  console.log('data***====', currentProfile);

  // Handle moving to next profile
  const moveToNextProfile = useCallback(() => {
    if (currentIndex < profiles.length - 1) {
      // If we have more profiles in current batch
      setCurrentIndex(currentIndex + 1);
    } else if (nextCursor && currentUser?.plan === 'STANDARD') {
      // Only fetch next batch if user has STANDARD plan
      setCursor(nextCursor);
      setCurrentIndex(0);
    }
  }, [currentIndex, profiles.length, nextCursor, currentUser?.plan]);

  console.log('currentUser***===', currentProfile?.caregiver_profile?.id);

  const submitLike = useAuthMutation({
    mutationFn: (data: any) => {
      const endpoint =
        currentUser?.role === 'FAMILY'
          ? `/family-discovery/like-caregiver/${currentProfile?.caregiver_profile?.id}`
          : `/caregiver-discovery/like-families/${currentProfile?.family_profile?.id}`;
      return customAxios.patch(endpoint);
    },
    onMutate: async () => {
      // Optimistically move to next profile
      moveToNextProfile();
    },
    onError: (error: any) => {
      // On error, move back to previous profile
      setCurrentIndex(Math.max(0, currentIndex - 1));
      console.log('error', error['response'].data);
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
      return customAxios.patch(endpoint);
    },
    onMutate: async () => {
      // Optimistically move to next profile
      moveToNextProfile();
    },
    onError: (error: any) => {
      // On error, move back to previous profile
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

  const profileData = {
    image: 'URL_TO_PROFILE_IMAGE',
    name: currentProfile?.caregiver_profile?.name,
    age: currentProfile?.caregiver_profile?.date_of_birth
      ? calculateAge(currentProfile.caregiver_profile.date_of_birth)
      : '',
    role: `🧢 ${currentProfile?.caregiver_profile?.caregiver_type}`,
    location: 'Manhattan, New York',
    address: '📍 ', // Added address field to match ProfileCard requirements
    pronouns: currentProfile?.caregiver_profile?.pronouns,
    rating: currentProfile?.score,
    experience: currentProfile?.caregiver_profile?.ages_best_with,
    lookingFor: currentProfile?.caregiver_profile?.availability,
    hourlyRate: `$${currentProfile?.payment_info?.hourly_min} - $${currentProfile?.payment_info?.hourly_max}`,
    languages: [
      ...(currentProfile?.caregiver_profile?.language?.languages || []),
      currentProfile?.caregiver_profile?.language?.other,
    ].filter(Boolean),
    interests: [
      ...(currentProfile?.caregiver_profile?.hobbies?.creative_interests || []),
      ...(currentProfile?.caregiver_profile?.hobbies?.instrument_interests ||
        []),
      ...(currentProfile?.caregiver_profile?.hobbies?.sport_interests || []),
      ...(currentProfile?.caregiver_profile?.hobbies?.stem_interests || []),
    ].filter(Boolean),
    obsession: '-',
    religion: currentProfile?.caregiver_profile?.characteristics?.religion,
    personality:
      currentProfile?.caregiver_profile?.characteristics?.personalities,
    disabilities:
      currentProfile?.caregiver_profile?.experience_with_disabilities
        ?.disabilities,
  };

  // console.log('profileData***=======', currentProfile?.caregiver_profile?.lan);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeHeader />
        <View style={styles.content}>
          <View style={[styles.containerWrapper, { height: '80%' }]}>
            {isLoadingCurrentUser || isLoading ? (
              <ProfileCardLoader />
            ) : profiles.length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateText}>
                  {currentUser?.role === 'FAMILY'
                    ? 'No caregivers available at the moment'
                    : 'No families available at the moment'}
                </Text>
              </View>
            ) : (
              <Container profileData={profileData} data={currentProfile} />
            )}
          </View>
          <FloatingButton
            icon={
              <Image
                source={require('@/assets/picker/xmark.png')}
                style={[styles.icon, styles.xmarkIcon]}
              />
            }
            style={[styles.rejectButton, { width: buttonWidth }]}
            onPress={() => {
              console.log('rejected');
              submitReject.mutate();
            }}
          />
          <FloatingButton
            icon={
              <Image
                source={require('@/assets/picker/heart.png')}
                style={[styles.icon, styles.heartIcon]}
              />
            }
            style={[styles.likeButton, { width: buttonWidth }]}
            onPress={() => {
              console.log('liked');
              submitLike.mutate();
            }}
          />
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
