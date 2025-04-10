import { Colors } from '@/constants/Colors';
import { useCurrentUser } from '@/services/api/api';
import { useUserStore } from '@/services/state/user';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export const HomeHeader = () => {
  const { logout, clearUser } = useUserStore();
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useCurrentUser();

  const router = useRouter();

  const profilePicture =
    currentUser?.data?.role === 'FAMILY'
      ? currentUser?.data?.family_profile?.pictures?.find(
          (pic) => pic?.type === 'PROFILE_PICTURE'
        )?.path
      : currentUser?.data?.caregiver_profile?.pictures?.find(
          (pic) => pic?.type === 'PROFILE_PICTURE'
        )?.path;

  const imageSource = profilePicture
    ? { uri: profilePicture }
    : require('@/assets/images/profile-placeholder.jpg');

  const handleUndoSwipe = () => {
    // This would trigger the undo action to bring back the last unliked profile card
    // The actual implementation would need to be connected to the card stack/swipe logic
    Toast.show({
      type: 'info',
      text1: 'Returning to previous profile',
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/HomeLogo.png')}
        style={styles.logo}
        resizeMode='contain'
      />
      <View style={styles.rightIcons}>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={handleUndoSwipe}
        >
          <Image
            source={require('@/assets/images/BackIcon.png')}
            style={styles.icon}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={() => router.push('/filter')}
        >
          <Image
            source={require('@/assets/images/Settings.png')}
            style={styles.icon}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={() => router.push('/profile')}
        >
          <Image
            source={imageSource}
            style={styles.profileImage}
            resizeMode='cover'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 24, // Added marginTop for safe area
    backgroundColor: '#F6F6F6',
  },
  logo: {
    width: 125,
    height: 21,
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
