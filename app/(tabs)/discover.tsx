import { Container } from '@/components/home/Container';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HomeNav } from '@/components/home/HomeNav';
import { FloatingButton } from '@/components/ui/FloatingButton';
import useAuthMutation from '@/hooks/useAuthMutation';
import {
  fetchMatchingCaregiversInfinity,
  useMatchingCaregivers,
  useMatchingCaregiversInfinity,
} from '@/services/api/api';
import customAxios from '@/services/api/envConfig';
import { useUserStore } from '@/services/state/user';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

export default function Discover() {
  const { width: windowWidth } = useWindowDimensions();
  const { token } = useUserStore();
  const buttonWidth = (windowWidth - 100) / 2; // Total width minus (40px * 2 padding + 20px gap)
  const { data, isLoading, error } = useMatchingCaregivers();
  const {
    data: matchingCaregiversIninity,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingInfinity,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['matching-caregivers-infinity'],
    queryFn: ({ pageParam }: any) =>
      fetchMatchingCaregiversInfinity({
        pageSize: 1,
        cursor: pageParam,
      }),
    initialPageParam: '',
    getNextPageParam: (lastPage: any) => {
      console.log('lastPage', lastPage);
      if (!lastPage?.data) return undefined;
      return lastPage.data.next_cursor || undefined;
    },
    enabled: !!token,
  });

  console.log(
    'matchingCaregiversIninity=======',
    matchingCaregiversIninity,
    fetchNextPage,
    hasNextPage,
    isLoadingInfinity,
    isFetchingNextPage
  );
  // console.log('data', data?.data?.scored_caregivers[0]?.caregiver_profile);

  const submitLike: any = useAuthMutation({
    mutationFn: (data: any) => {
      return customAxios.patch(
        `/family-discovery/like-caregiver/${data?.caregiver_profile?.id}`
      );
    },
    onSuccess: async (data: any) => {
      console.log('data', data);
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

  const submitReject: any = useAuthMutation({
    mutationFn: (data: any) => {
      return customAxios.patch(
        `/family-discovery/reject-caregiver/${data?.caregiver_profile?.id}`
      );
    },
    onSuccess: async (data: any) => {
      console.log('data', data);
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
    name: data?.data?.scored_caregivers[0]?.caregiver_profile?.name,
    age: data?.data?.scored_caregivers[0]?.caregiver_profile?.date_of_birth
      ? calculateAge(
          data.data.scored_caregivers[0].caregiver_profile.date_of_birth
        )
      : '',
    role: `🧢 ${data?.data?.scored_caregivers[0]?.caregiver_profile?.caregiver_type}`,
    location: 'Manhattan, New York',
    address: '📍 ', // Added address field to match ProfileCard requirements
    pronouns: data?.data?.scored_caregivers[0]?.caregiver_profile?.pronouns,
    rating: data?.data?.scored_caregivers[0]?.score,
    experience:
      data?.data?.scored_caregivers[0]?.caregiver_profile?.ages_best_with,
    lookingFor:
      data?.data?.scored_caregivers[0]?.caregiver_profile?.availability,
    hourlyRate: `$${data?.data?.scored_caregivers[0]?.caregiver_profile?.payment_info?.hourly_min} - $${data?.data?.scored_caregivers[0]?.caregiver_profile?.payment_info?.hourly_max}`,
    languages: [
      ...(data?.data?.scored_caregivers[0]?.caregiver_profile?.language
        ?.languages || []),
      data?.data?.scored_caregivers[0]?.caregiver_profile?.language?.other,
    ].filter(Boolean),
    interests: [
      ...(data?.data?.scored_caregivers[0]?.caregiver_profile?.hobbies
        ?.creative_interests || []),
      ...(data?.data?.scored_caregivers[0]?.caregiver_profile?.hobbies
        ?.instrument_interests || []),
      ...(data?.data?.scored_caregivers[0]?.caregiver_profile?.hobbies
        ?.sport_interests || []),
      ...(data?.data?.scored_caregivers[0]?.caregiver_profile?.hobbies
        ?.stem_interests || []),
    ].filter(Boolean),
    obsession: '-',
    religion:
      data?.data?.scored_caregivers[0]?.caregiver_profile?.characteristics
        ?.religion,
    personality:
      data?.data?.scored_caregivers[0]?.caregiver_profile?.characteristics
        ?.personalities,
    disabilities:
      data?.data?.scored_caregivers[0]?.caregiver_profile
        ?.experience_with_disabilities?.disabilities,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeHeader />
        <View style={styles.content}>
          <View style={[styles.containerWrapper, { height: '80%' }]}>
            <Container
              profileData={profileData}
              data={data?.data?.scored_caregivers[0]}
            />
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
});
