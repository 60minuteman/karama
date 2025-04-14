import { Certifications } from '@/components/cards/Certifications';
import { ExperienceAndLanguages } from '@/components/cards/ExperienceAndLanguages';
import { Image } from '@/components/cards/Image';
import { Interests } from '@/components/cards/Interests';
import { Obsession } from '@/components/cards/Obsession';
import { Position } from '@/components/cards/Position';
import { ProfileCard } from '@/components/cards/ProfileCard';
import { Religion } from '@/components/cards/Religion';
import { Responsibilities } from '@/components/cards/Responsibilities';
import { Work } from '@/components/cards/Work';
import { ProfileDetails } from '@/components/home/ProfileDetails';
import { ThemedText } from '@/components/ThemedText';
import React, { forwardRef, useImperativeHandle } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

interface CaregiverContainerProps {
  profileData: {
    image: string;
    name: string;
    age: number;
    location: string;
    pronouns: string;
    rating: number;
    role: string;
    experience: string[];
    availability: string[];
    hourlyRate: string;
    languages: string[];
    interests: string[];
    specialties: string[];
    religion?: string;
    personality: string[];
    certifications: string[];
    address: string;
  } | null;
  data?: any;
  onLike?: () => void;
  onReject?: () => void;
}

export interface CaregiverContainerRef {
  animateLike: () => void;
  animateReject: () => void;
}

const CaregiverContainer = forwardRef<CaregiverContainerRef, CaregiverContainerProps>(
  ({ profileData, data, onLike, onReject }, ref) => {
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;
    const containerWidth = Math.min(windowWidth * 0.9, 500);

    const slideAnim = new Animated.Value(0);

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

    const caregiverData = data?.caregiver || {};
    const pictures = caregiverData?.pictures || [];
    const certifications = {
      professional: caregiverData?.certifications || [],
      education: [caregiverData?.education_level].filter(Boolean),
    };
    const specialties = {
      skills: caregiverData?.specialties || [],
      experience: caregiverData?.experience_types || [],
    };

    const dynamicStyles = StyleSheet.create({
      container: {
        alignSelf: 'center',
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        overflow: 'hidden',
        width: containerWidth,
        height: isLargeScreen ? windowWidth * 0.8 : 'auto',
      },
      profileCardContainer: {
        width: '100%',
        height: isLargeScreen ? '100%' : 'auto',
      },
      componentContainer: {
        width: '100%',
        padding: containerWidth * 0.02,
        backgroundColor: '#ECEBEC',
        borderRadius: 10,
        marginBottom: containerWidth * 0.03,
      },
    });

    const content = (
      <>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <ProfileDetails
            role={profileData.role}
            experience={profileData.experience}
            availability={profileData.availability}
            hourlyRate={profileData.hourlyRate}
          />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <ExperienceAndLanguages
            yearsOfExperience={caregiverData?.years_of_experience}
            languages={profileData.languages}
          />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Certifications
            certifications={[
              ...(certifications?.professional || []),
              ...(certifications?.education || []),
            ].filter(Boolean)}
            data={data}
          />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Interests data={data} interests={profileData.interests} />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Work specialties={specialties} />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Religion
            religion={profileData.religion}
            personality={profileData.personality}
            data={data}
          />
        </View>
        <View style={styles.spacer} />
        <View style={[dynamicStyles.componentContainer, styles.imageContainer]}>
          <Image data={pictures[0]?.path || null} />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Position positions={caregiverData?.past_positions || []} />
        </View>
        <View style={styles.bottomSpacer} />
      </>
    );

    return (
      <Animated.View
        style={[
          styles.container,
          {
            width: containerWidth,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {isLargeScreen ? (
          <View style={styles.largeScreenLayout}>
            <View style={dynamicStyles.profileCardContainer}>
              <ProfileCard data={data} {...profileData} />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {content}
            </ScrollView>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={dynamicStyles.profileCardContainer}>
              <ProfileCard data={data} {...profileData} />
            </View>
            {content}
          </ScrollView>
        )}
      </Animated.View>
    );
  }
);

export { CaregiverContainer };

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    overflow: 'hidden',
  },
  largeScreenLayout: {
    flexDirection: 'row',
    height: '120%',
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
  },
  imageContainer: {
    padding: 0,
    overflow: 'hidden',
  },
  spacer: {
    height: 8,
  },
  bottomSpacer: {
    height: 80,
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