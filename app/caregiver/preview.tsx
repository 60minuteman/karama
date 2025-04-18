import { CaregiverContainer } from '@/components/home/CaregiverContainer';
import { ThemedText } from '@/components/ThemedText';
import { FloatingButton } from '@/components/ui/FloatingButton';
import { Stack, router } from 'expo-router';
import React, { useRef } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockCaregiverProfileData = {
  image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2787&auto=format&fit=crop',
  name: 'Sarah Johnson',
  age: 28,
  location: 'New York, NY',
  pronouns: 'She/Her',
  rating: 4.8,
  role: 'Nanny & Childcare Provider',
  experience: ['5+ years with infants', '3+ years with toddlers'],
  availability: ['Weekdays 9am-5pm', 'Some weekends'],
  hourlyRate: '$25-30/hr',
  languages: ['English', 'Spanish', 'French'],
  interests: ['Reading', 'Outdoor activities', 'Arts & Crafts', 'Music'],
  specialties: ['Special needs care', 'Early childhood education'],
  religion: 'Christian',
  personality: ['Patient', 'Creative', 'Energetic'],
  certifications: ['CPR & First Aid', 'Early Childhood Education Certificate'],
  address: '123 Main St, New York, NY 10001',
};

const mockCaregiverData = {
  caregiver: {
    pictures: [
      { path: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2787&auto=format&fit=crop' },
      { path: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop' },
    ],
    certifications: ['CPR & First Aid', 'Early Childhood Education Certificate'],
    education_level: 'Bachelor\'s Degree in Child Development',
    specialties: ['Special needs care', 'Early childhood education', 'Infant care'],
    experience_types: ['Daycare', 'Private nanny', 'School aide'],
    years_of_experience: 5,
    past_positions: [
      {
        title: 'Lead Preschool Teacher',
        company: 'Sunshine Daycare',
        duration: 'Jan 2020 - Present',
        description: 'Responsible for curriculum development and teaching 15 preschool-age children.',
      },
      {
        title: 'Private Nanny',
        company: 'Williams Family',
        duration: 'Mar 2018 - Dec 2019',
        description: 'Cared for 2 children (ages 1 and 3), managed household tasks, and coordinated activities.',
      },
    ],
  },
};

const CaregiverPreviewScreen = () => {
  const caregiverContainerRef = useRef<any>(null);
  const { width: windowWidth } = useWindowDimensions();
  const buttonWidth = (windowWidth - 100) / 2;

  const handleLike = () => {
    console.log('Liked caregiver!');
  };

  const handleReject = () => {
    console.log('Rejected caregiver!');
  };

  const handleAnimateLike = () => {
    caregiverContainerRef.current?.animateLike();
  };

  const handleAnimateReject = () => {
    caregiverContainerRef.current?.animateReject();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Caregiver Preview',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Pressable onPress={handleGoBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#002140" />
              </Pressable>
            ),
          }}
        />
        <View style={styles.content}>
          <View style={styles.containerWrapper}>
            <CaregiverContainer
              ref={caregiverContainerRef}
              profileData={mockCaregiverProfileData}
              data={mockCaregiverData}
              onLike={handleLike}
              onReject={handleReject}
            />
          </View>
          
          <FloatingButton
            icon={
              <Image
                source={require('@/assets/picker/xmark.png')}
                style={[styles.icon, styles.xmarkIcon]}
              />
            }
            style={{
              position: 'absolute',
              left: 40,
              bottom: 60,
              width: buttonWidth,
            }}
            onPress={handleAnimateReject}
          />
          
          <FloatingButton
            icon={
              <Image
                source={require('@/assets/picker/heart.png')}
                style={[styles.icon, styles.heartIcon]}
              />
            }
            style={{
              position: 'absolute',
              right: 40,
              bottom: 60,
              width: buttonWidth,
            }}
            onPress={handleAnimateLike}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
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
  },
});

export default CaregiverPreviewScreen;