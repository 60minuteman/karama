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
  PanResponder,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import ProfileCardLoader from '../cards/ProfileCardLoader';

interface ContainerProps {
  profileData: {
    image: string;
    name: string;
    age: number;
    location: string;
    pronouns: string;
    rating: number;
    role: string;
    experience: string[];
    lookingFor: string[];
    hourlyRate: string;
    languages: string[];
    interests: string[];
    obsession: string;
    religion?: string;
    personality: string[];
    disabilities?: string[];
    address: string;
  } | null;
  data?: any;
  onLike?: () => void;
  onReject?: () => void;
}

// Create a type for the ref
export interface ContainerRef {
  animateLike: () => void;
  animateReject: () => void;
}

// Properly type the forwardRef
const Container = forwardRef<ContainerRef, ContainerProps>(
  ({ profileData, data, onLike, onReject }, ref) => {
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;
    const containerWidth = Math.min(windowWidth * 0.9, 500);

    // Add animation value
    const slideAnim = new Animated.Value(0);

    // Animation functions
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

    // Expose animation functions to parent
    useImperativeHandle(ref, () => ({
      animateLike,
      animateReject,
    }));

    // Add debug log

    if (!profileData || !data) {
      return (
        <View style={[styles.container, { width: containerWidth }]}>
          <View style={styles.emptyStateContainer}>
            <ThemedText style={styles.emptyStateText}>
              No profiles available at the moment
            </ThemedText>
            <ThemedText style={styles.emptyStateSubText}>
              Check back later for new matches
            </ThemedText>
          </View>
        </View>
      );
    }

    // Add safety checks for nested data
    const caregiverProfile = data?.caregiver_profile || {};
    const pictures = caregiverProfile?.pictures || [];
    const abilitiesAndCerts = {
      abilities: caregiverProfile?.required_benfits || [],
      certifications: [caregiverProfile?.education_level].filter(Boolean),
    };
    const experienceWithDisabilities = {
      disabilities: [],
    };
    const experienceWithPets = {
      pets: [],
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
        padding: containerWidth * 0.02, // Responsive padding
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
            lookingFor={profileData.lookingFor}
            hourlyRate={profileData.hourlyRate}
          />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <ExperienceAndLanguages
            yearsOfExperience={caregiverProfile?.years_of_experience}
            languages={profileData.languages}
          />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Obsession obsession={profileData.obsession} />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Interests data={data} interests={profileData.interests} />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Religion
            religion={profileData.religion}
            personality={profileData.personality}
            disabilities={profileData.disabilities}
            data={data}
          />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Responsibilities data={data} />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Certifications
            certifications={[
              ...(abilitiesAndCerts?.abilities || []),
              ...(abilitiesAndCerts?.certifications || []),
            ].filter(Boolean)}
            data={data}
          />
        </View>
        <View style={styles.spacer} />
        <View style={[dynamicStyles.componentContainer, styles.imageContainer]}>
          <Image data={pictures[5]?.path || pictures[4]?.path || null} />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Work
            animals={[
              ...(experienceWithDisabilities?.disabilities || []),
              ...(experienceWithPets?.pets || []),
            ].filter(Boolean)}
          />
        </View>
        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Position positions={caregiverProfile?.past_positions || []} />
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

// Export the component
export { Container };

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
