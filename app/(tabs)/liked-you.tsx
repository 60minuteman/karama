import { ThemedText } from '@/components/ThemedText';
import { LikedYouCard } from '@/components/cards/LikedYouCard';
import { HomeNav } from '@/components/home/HomeNav';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2; // 16px padding on each side, 16px gap

interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  salary: string;
  rating: number;
  gender: 'He / Him' | 'She / Her';
  image: string | number; // Allow both URI strings and require() numbers
}

interface LikedYouProps {
  isSubscribed?: boolean;
}

export default function LikedYou({ isSubscribed = false }: LikedYouProps) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const profiles: Profile[] = [
    {
      id: '1',
      name: 'Philip',
      age: 25,
      location: 'Manhattan, New York',
      salary: '$120,000 / Year',
      rating: 4.5,
      gender: 'He / Him',
      image: require('@/assets/images/profile-placeholder.jpg'),
    },
    {
      id: '2',
      name: 'Sarah',
      age: 28,
      location: 'Brooklyn, New York',
      salary: '$95,000 / Year',
      rating: 4.8,
      gender: 'She / Her',
      image: require('@/assets/images/profile-placeholder.jpg'),
    },
    {
      id: '3',
      name: 'Michael',
      age: 31,
      location: 'Queens, New York',
      salary: '$110,000 / Year',
      rating: 4.2,
      gender: 'He / Him',
      image: require('@/assets/images/profile-placeholder.jpg'),
    },
    {
      id: '4',
      name: 'Emma',
      age: 27,
      location: 'Jersey City, New Jersey',
      salary: '$105,000 / Year',
      rating: 4.6,
      gender: 'She / Her',
      image: require('@/assets/images/profile-placeholder.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ThemedText style={styles.title}>Liked you</ThemedText>
        <View style={styles.content}>
          {isSubscribed ? (
            <View style={styles.profileGrid}>
              {profiles.map((profile) => (
                <LikedYouCard
                  key={profile.id}
                  profile={profile}
                  isBlurred={false}
                  onPress={() => {}}
                />
              ))}
            </View>
          ) : (
            <>
              <View style={styles.profileGrid}>
                {profiles.map((profile) => (
                  <LikedYouCard
                    key={profile.id}
                    profile={profile}
                    isBlurred={true}
                    onPress={() => {}}
                  />
                ))}
              </View>
              <View style={styles.upgradeContainer}>
                <View style={styles.upgradeRow}>
                  <TouchableOpacity style={styles.upgradeButton}>
                    <ThemedText style={styles.upgradeButtonText}>
                      Upgrade
                    </ThemedText>
                  </TouchableOpacity>
                  <View style={styles.upgradeTextContainer}>
                    <ThemedText style={styles.upgradeText}>
                      Upgrade to Karama +{'\n'}to get your profile seen
                    </ThemedText>
                  </View>
                </View>
              </View>
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
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '600',
    marginTop: 16,
    marginLeft: 16,
    lineHeight: 38,
    color: '#000000',
  },
  profileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  upgradeRow: {
    width: 358,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(38, 29, 42, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  upgradeButton: {
    backgroundColor: '#EB4430',
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginRight: 14,
  },
  upgradeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins_400Medium',
  },
  upgradeTextContainer: {
    flex: 1,
  },
  upgradeText: {
    fontSize: 14,
    color: '#261D2A',
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
  },
});
