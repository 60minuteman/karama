import { ThemedText } from '@/components/ThemedText';
import { LikedYouCard } from '@/components/cards/LikedYouCard';
import { HomeNav } from '@/components/home/HomeNav';
import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

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
  const { width, height } = useWindowDimensions();
  
  // Responsive calculations
  const horizontalPadding = width * 0.04; // 4% of screen width
  const cardGap = width * 0.04;
  const cardWidth = (width - (horizontalPadding * 2) - cardGap) / 2;
  const titleSize = width * 0.08; // 8% of screen width
  const titleLineHeight = titleSize * 1.2;
  const upgradeButtonPadding = width * 0.06;
  const upgradeContainerBottom = height * 0.03;

  const handleUpgradePress = () => {
    // Navigate to the caregiver preview screen
    router.push('/caregiver/preview');
  };

  const handleCardPress = (profileId: string) => {
    // Navigate to the caregiver preview screen when a card is pressed
    router.push('/caregiver/preview');
  };

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
        <ThemedText style={[styles.title, { 
          fontSize: titleSize,
          lineHeight: titleLineHeight,
          marginLeft: horizontalPadding,
          marginTop: height * 0.02
        }]}>
          Liked you
        </ThemedText>
        <View style={[styles.content, { padding: horizontalPadding }]}>
          {isSubscribed ? (
            <View style={[styles.profileGrid, { gap: cardGap }]}>
              {profiles.map((profile) => (
                <LikedYouCard
                  key={profile.id}
                  profile={profile}
                  isBlurred={false}
                  onPress={() => handleCardPress(profile.id)}
                />
              ))}
            </View>
          ) : (
            <>
              <View style={[styles.profileGrid, { gap: cardGap }]}>
                {profiles.map((profile) => (
                  <LikedYouCard
                    key={profile.id}
                    profile={profile}
                    isBlurred={profile.id !== '1'} // Only the first card is unblurred
                    onPress={() => handleCardPress(profile.id)}
                  />
                ))}
              </View>
              <View style={[styles.upgradeContainer, { bottom: upgradeContainerBottom }]}>
                <View style={[styles.upgradeRow, { 
                  width: width - (horizontalPadding * 2),
                  height: height * 0.07
                }]}>
                  <TouchableOpacity 
                    style={[styles.upgradeButton, {
                      paddingHorizontal: upgradeButtonPadding
                    }]}
                    onPress={handleUpgradePress}
                  >
                    <ThemedText style={[styles.upgradeButtonText, {
                      fontSize: width * 0.035
                    }]}>
                      Upgrade
                    </ThemedText>
                  </TouchableOpacity>
                  <View style={styles.upgradeTextContainer}>
                    <ThemedText style={[styles.upgradeText, {
                      fontSize: width * 0.035
                    }]}>
                      Upgrade to Karama +{'\n'}to get your profile seen
                    </ThemedText>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
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
  },
  title: {
    fontFamily: 'Bogart-Bold',
    color: '#000000',
  },
  profileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  upgradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(38, 29, 42, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  upgradeButton: {
    backgroundColor: '#EB4430',
    borderRadius: 100,
    paddingVertical: 8,
    marginRight: 14,
  },
  upgradeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Poppins_400Medium',
  },
  upgradeTextContainer: {
    flex: 1,
  },
  upgradeText: {
    color: '#261D2A',
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
  },
});
