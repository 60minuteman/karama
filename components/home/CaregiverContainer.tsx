import { CaregiverProfileCard } from '@/components/caregiver/CaregiverProfileCard';
import { ThemedText } from '@/components/ThemedText';
import { We } from '@/components/caregiver/We';
import { Obsession } from '@/components/caregiver/Obsession';
import { Interests } from '@/components/caregiver/Interests';
import { Idea } from '@/components/caregiver/Idea';
import { Personality } from '@/components/caregiver/Personality';
import { Diets } from '@/components/caregiver/Diets';
import { CaregiverImage } from '@/components/caregiver/CaregiverImage';
import { OneThing } from '@/components/caregiver/OneThing';
import { LookingFor } from '@/components/caregiver/LookingFor';
import { Schedule } from '@/components/caregiver/Schedule';
import { WorkType } from '@/components/caregiver/WorkType';
import { ChildCare } from '@/components/caregiver/ChildCare';
import { Benefits } from '@/components/caregiver/Benefits';
import React, { forwardRef, useImperativeHandle } from 'react';
import {
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

interface CaregiverContainerProps {
  profileData: {
    image?: string;
    name?: string;
    age?: number;
    location?: string;
    pronouns?: string;
    rating?: number;
    role?: string;
    experience?: string[];
    availability?: string[];
    hourlyRate?: string;
    languages?: string[];
    interests?: string[];
    specialties?: string[];
    religion?: string;
    personality?: string[];
    certifications?: string[];
    address?: string;
  } | null;
  data?: any;
  onLike?: () => void;
  onReject?: () => void;
}

export interface CaregiverContainerRef {
  animateLike: () => void;
  animateReject: () => void;
}

const CaregiverContainer = forwardRef<
  CaregiverContainerRef,
  CaregiverContainerProps
>(({ profileData, data, onLike, onReject }, ref) => {
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 768;
  const containerWidth = Math.min(windowWidth * 0.9, 500);

  const slideAnim = new Animated.Value(0);
  const swipeThreshold = windowWidth * 0.25;

  // Setup PanResponder for swipe gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      slideAnim.setValue(gesture.dx);
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > swipeThreshold) {
        // Swiped right - like
        animateLike();
      } else if (gesture.dx < -swipeThreshold) {
        // Swiped left - reject
        animateReject();
      } else {
        // Reset position
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const animateLike = () => {
    Animated.timing(slideAnim, {
      toValue: windowWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(0);
      onLike?.();
    });
  };

  const animateReject = () => {
    Animated.timing(slideAnim, {
      toValue: -windowWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(0);
      onReject?.();
    });
  };

  useImperativeHandle(ref, () => ({
    animateLike,
    animateReject,
  }));

  console.log('CaregiverContainer received:', { profileData, data });

  if (!profileData || !data) {
    return (
      <View style={[styles.container, { width: containerWidth }]}>
        <View style={styles.emptyStateContainer}>
          <ThemedText style={styles.emptyStateText}>
            No caregiver profiles available
          </ThemedText>
          <ThemedText style={styles.emptyStateSubText}>
            Check back later for new caregivers
          </ThemedText>
        </View>
      </View>
    );
  }

  // Prepare profile card props to ensure required props are provided
  const profileCardProps = {
    familyName: profileData.name || 'Family',
    location: profileData.location || 'Location not provided',
    salary: profileData.hourlyRate ? `${profileData.hourlyRate}/year` : '75,000/year',
    familyType: 'Dads', // This could be made dynamic based on data
    rating: profileData.rating || 4.5,
    image: profileData.image || 'https://images.unsplash.com/photo-1561488111-5d800fd7089f?q=80&w=2574&auto=format&fit=crop',
  };

  return (
    <ScrollView>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.container,
          {
            width: containerWidth,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <CaregiverProfileCard {...profileCardProps} />
      </Animated.View>
      
      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <We />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <Obsession />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <Interests />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <Idea />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <Personality />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <Diets />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <CaregiverImage 
          data="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=2940&auto=format&fit=crop"
        />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <OneThing />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <CaregiverImage 
          data="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=2940&auto=format&fit=crop"
        />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <LookingFor 
          title="We are looking for .."
          jobType={{ label: 'Nanny', icon: '👨‍⚕️' }}
          startDate="06/26/2024"
          hourlyRate={(profileData.hourlyRate as string) || '$20 - $35'}
          education={{ label: 'Bachelors Degree', icon: '🎓' }}
        />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <Schedule />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <WorkType />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <ChildCare />
      </View>

      <View style={[styles.container, { width: containerWidth, marginTop: 16 }]}>
        <Benefits />
      </View>
    </ScrollView>
  );
});

export { CaregiverContainer };

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    overflow: 'hidden',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold',
    color: '#002140',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    textAlign: 'center',
  },
});
