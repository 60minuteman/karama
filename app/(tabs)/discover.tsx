import React from 'react';
import { StyleSheet, View, SafeAreaView, Image, useWindowDimensions } from 'react-native';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HomeNav } from '@/components/home/HomeNav';
import { Container } from '@/components/home/Container';
import { FloatingButton } from '@/components/ui/FloatingButton';

export default function Discover() {
  const { width: windowWidth } = useWindowDimensions();
  const buttonWidth = (windowWidth - 100) / 2; // Total width minus (40px * 2 padding + 20px gap)

  const profileData = {
    image: 'URL_TO_PROFILE_IMAGE',
    name: 'Madison',
    age: 26,
    location: 'Manhattan, New York',
    address: 'Manhattan, New York', // Added address field to match ProfileCard requirements
    pronouns: 'She/Her',
    rating: 4.5,
    role: 'Caregiver/Household Manager',
    experience: ['School Age', 'Toddler', 'Pre Schooler'],
    lookingFor: ['Full Time', 'Long Term', 'Live In'],
    hourlyRate: '$20 - $35',
    languages: ['Hausa', 'Arbic', 'Hindu'],
    interests: ['Dance', 'DIY', 'Magic', 'Gaming', 'Painting', 'Film Making', 'Trumpet', 'Piano', 'Drama'],
    obsession: 'Chickens! The kids love them and we just got two chicks named Bo & Sam.',
    religion: 'Buddhism',
    personality: ['Chill', 'Patient', 'Wacky'],
    disabilities: ['Dyslexia', 'ADHD'],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeHeader />
        <View style={styles.content}>
          <View style={[styles.containerWrapper, { height: '80%' }]}>
            <Container profileData={profileData} />
          </View>
          <FloatingButton
            icon={<Image source={require('@/assets/picker/xmark.png')} style={[styles.icon, styles.xmarkIcon]} />}
            style={[styles.rejectButton, { width: buttonWidth }]}
            onPress={() => console.log('rejected')}
          />
          <FloatingButton
            icon={<Image source={require('@/assets/picker/heart.png')} style={[styles.icon, styles.heartIcon]} />}
            style={[styles.likeButton, { width: buttonWidth }]}
            onPress={() => console.log('liked')}
          />
        </View>
        <HomeNav />
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
    tintColor: '#212329'
  },
  heartIcon: {
    tintColor: '#FF1818'
  },
  rejectButton: {
    position: 'absolute',
    left: 40,
    bottom: 60
  },
  likeButton: {
    position: 'absolute',
    right: 40,
    bottom: 60
  }
});