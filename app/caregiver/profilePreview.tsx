import ProfileHeader from '@/components/Profile/ProfileHeader';
import { ThemedView } from '@/components/ThemedView';
import { Container } from '@/components/home/Container';
import { FloatingButton } from '@/components/ui/FloatingButton';
import useAuthMutation from '@/hooks/useAuthMutation';
import { useCurrentUser } from '@/services/api/api';
import customAxios from '@/services/api/envConfig';
import { useStore } from '@/services/state/State';
import { useOtherStore } from '@/services/state/other';
import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const profilePreview = () => {
  const [profileData, setProfileData] = useState<any>();
  const { width: windowWidth } = useWindowDimensions();
  const { setMatchComplete, match_complete } = useStore();
  const buttonWidth = (windowWidth - 100) / 2;
  const { likeProfile, accountType } = useOtherStore();
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useCurrentUser();
  const queryClient = useQueryClient();

  console.log('profileData', profileData);

  useEffect(() => {
    if (likeProfile?.length) {
      setProfileData(likeProfile?.[0]);
    }
  }, [likeProfile]);

  const submitLike: any = useAuthMutation({
    mutationFn: (data: any) => {
      const endpoint =
        accountType === 'FAMILY'
          ? `/family-discovery/like-caregiver`
          : `/caregiver-discovery/like-family`;
      return customAxios.patch(endpoint, data);
    },
    onSuccess: (data: any) => {
      console.log('like data', data?.data);
      queryClient.invalidateQueries({ queryKey: ['like-you', accountType] });
      if (
        accountType === 'FAMILY' &&
        data?.data?.match.match_status === 'COMPLETED'
      ) {
        setMatchComplete(data?.data);
        router.push('/(app)/itsAmatch');
        return;
      }
      router.back();
      // moveToNextProfile();
    },
    onError: (error: any) => {
      if (
        error['response'].data?.message == 'Caregiver already liked' ||
        error['response'].data?.message == 'Family already liked'
      ) {
        router.back();
        return;
      }
      // setCurrentIndex(Math.max(0, currentIndex - 1));
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
        accountType === 'FAMILY'
          ? `/family-discovery/reject-caregiver/${profileData?.id}`
          : `/caregiver-discovery/reject-families/${profileData?.id}`;
      return customAxios.patch(endpoint);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['like-you', accountType] });
      router.back();
    },
    onError: (error: any) => {
      // setCurrentIndex(Math.max(0, currentIndex - 1));
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error['response'].data?.message,
      });
    },
  });

  const handleLike = () => {
    submitLike.mutate(
      accountType === 'FAMILY'
        ? {
            caregiver_profile_id: `${profileData?.id}`,
            score: `${profileData?.score}`,
          }
        : {
            family_profile_id: `${profileData?.id}`,
            score: `${profileData?.score}`,
          }
    );
  };

  const handleReject = () => {
    submitReject.mutate();
  };

  //  const {name} = likeProfile

  //  console.log(accountType, 'name');

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name='arrow-back' size={24} color='#002140' />
          <Text>{profileData?.name}</Text>
        </Pressable>
        <ThemedView style={styles.container}>
          <View style={styles.contentContainer}>
            <Container
              profileData={profileData}
              data={profileData}
              role={accountType}
            />
          </View>
        </ThemedView>

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
              handleReject();
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
              handleLike();
            }}
          />
        </>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    borderRadius: 20,
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
    borderRadius: 20,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginTop: 0, // Remove marginTop
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
  backButton: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});

export default profilePreview;
