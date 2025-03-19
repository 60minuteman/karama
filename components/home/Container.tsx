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
import React from 'react';
import {
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
  };
  data: any;
}

export const Container = ({ profileData, data }: ContainerProps) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isLargeScreen = windowWidth > 768;

  // console.log('data=======', data);

  const containerWidth = Math.min(windowWidth * 0.9, 500); // Max width of 500

  const dynamicStyles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      backgroundColor: '#F6F6F6',
      borderRadius: 20,
      overflow: 'hidden',
      width: containerWidth,
      height: isLargeScreen ? windowHeight * 0.8 : 'auto',
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

  // console.log('data=======', data?.caregiver_profile);

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
          yearsOfExperience={data?.caregiver_profile?.years_of_experience}
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
            ...(data?.caregiver_profile?.abilities_and_certifications
              ?.abilities || []),
            ...(data?.caregiver_profile?.abilities_and_certifications
              ?.certifications || []),
          ].filter(Boolean)}
          data={data}
        />
      </View>
      <View style={styles.spacer} />
      <View style={[dynamicStyles.componentContainer, styles.imageContainer]}>
        <Image
          data={
            data?.caregiver_profile?.pictures[5]?.path ||
            data?.caregiver_profile?.pictures[4]?.path
          }
        />
      </View>
      <View style={styles.spacer} />
      <View style={dynamicStyles.componentContainer}>
        <Work
          animals={[
            ...(data?.caregiver_profile?.experience_with_disabilities
              ?.disabilities || []),
            ...(data?.caregiver_profile?.experience_with_pets?.pets || []),
          ].filter(Boolean)}
        />
      </View>
      <View style={styles.spacer} />
      <View style={dynamicStyles.componentContainer}>
        <Position positions={data?.caregiver_profile?.past_positions} />
      </View>
      <View style={styles.bottomSpacer} />
    </>
  );

  return (
    <View style={dynamicStyles.container}>
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
    </View>
  );
};

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
});
