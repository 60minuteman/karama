import { Pill2 } from '@/app/components/ui/Pill2';
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
  role?: any;
}

// Create a type for the ref
export interface ContainerRef {
  swipeRight: () => void;
  swipeLeft: () => void;
}

// Properly type the forwardRef
const Container = forwardRef<ContainerRef, ContainerProps>(
  ({ profileData, data, onLike, onReject, role }, ref) => {
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;
    const containerWidth = Math.min(windowWidth * 0.9, 500);

    // console.log(data, 'show');
    // return

    // const role = 'FAMILY'

    // Add animation values
    const slideAnim = new Animated.Value(0);
    const rotateAnim = slideAnim.interpolate({
      inputRange: [-windowWidth, 0, windowWidth],
      outputRange: ['-15deg', '0deg', '15deg'],
    });
    const opacityAnim = slideAnim.interpolate({
      inputRange: [-windowWidth / 2, 0, windowWidth / 2],
      outputRange: [0.5, 1, 0.5],
    });

    // Animation functions
    const swipeRight = () => {
      Animated.timing(slideAnim, {
        toValue: windowWidth,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        slideAnim.setValue(0);
        onLike?.();
      });
    };

    const swipeLeft = () => {
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
      swipeRight,
      swipeLeft,
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
            role={role}
            experience={profileData.experience}
            lookingFor={profileData.lookingFor}
            hourlyRate={profileData.hourlyRate}
            data={data}
          />
        </View>
        {role === 'CAREGIVER' && (
          <>
            <View style={styles.spacer} />
            <View style={dynamicStyles.componentContainer}>
              <ExperienceAndLanguages
                yearsOfExperience={caregiverProfile?.years_of_experience}
                languages={profileData.languages}
                data={data}
                role
              />
            </View>
          </>
        )}
        <View style={styles.spacer} />

        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          {/* <Interests data={data} role={role} interests={profileData.interests} /> */}
        </View>

        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Religion
            religion={profileData.religion}
            personality={profileData.personality}
            disabilities={profileData.disabilities}
            data={data}
            role={role}
          />
        </View>

        <View style={styles.spacer} />
        <View style={dynamicStyles.componentContainer}>
          <Responsibilities data={data} role={role} />
        </View>

        <View style={styles.spacer} />
        <View style={[dynamicStyles.componentContainer, styles.imageContainer]}>
          <Image
            data={data?.pictures?.[3]?.path}
            resizeMode='cover'
            resizeMethod='scale'
          />
        </View>
        {role === 'FAMILY' && (
          <>
            <View style={styles.spacer} />
            <View style={dynamicStyles.componentContainer}>
              <View style={styles.containers}>
                <View style={styles.section}>
                  <ThemedText style={styles.sectionTitle}>
                    We are looking for....
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    {data?.caregiver_preference?.caregiver_types?.map(
                      (item: any) => (
                        <Pill2 label={item} style={styles.pill} />
                      )
                    )}
                  </View>
                </View>

                <View style={styles.section}>
                  <ThemedText style={styles.sectionTitle}>
                    Education Level
                  </ThemedText>
                  <View style={styles.pillContainer}>
                    <Pill2
                      label={data?.caregiver_preference?.education_level}
                      style={styles.pill}
                    />
                  </View>
                </View>
              </View>
            </View>
          </>
        )}

        {role === 'CAREGIVER' && (
          <>
            <View style={styles.spacer} />
            <View style={dynamicStyles.componentContainer}>
              <Work
                animals={[
                  ...(experienceWithDisabilities?.disabilities || []),
                  ...(experienceWithPets?.pets || []),
                ]?.filter(Boolean)}
                data={data}
              />
            </View>
            <View style={styles.spacer} />
            <View style={dynamicStyles.componentContainer}>
              <Position
                positions={caregiverProfile?.past_positions || []}
                data={data}
              />
            </View>
            <View style={styles.bottomSpacer} />
          </>
        )}
        {/* 
       
        

      
       
       

         

    */}
      </>
    );

    return (
      <Animated.View
        style={[
          styles.container,
          {
            width: containerWidth,
            transform: [{ translateX: slideAnim }, { rotate: rotateAnim }],
            opacity: opacityAnim,
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
  containers: {
    padding: 16,
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
  //  container: {
  //   padding: 16,
  // },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: 'rgba(38, 29, 42, 0.4)',
    marginBottom: 12,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});
