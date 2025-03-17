import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/services/state/user';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export const HomeHeader = () => {
  const { logout } = useUserStore();
  const router = useRouter();

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
          onPress={() => router.push('/liked-you')}
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
          onPress={() => {
            // router.push('/profile')
            logout();
          }}
        >
          <Image
            source={require('@/assets/images/profile-placeholder.png')}
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
