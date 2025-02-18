import React from 'react';
import { StyleSheet, View, ScrollView, useWindowDimensions } from 'react-native';
import { ProfileCard } from '@/components/cards/ProfileCard';
import { ProfileDetails } from '@/components/home/ProfileDetails';
import { ExperienceAndLanguages } from '@/components/cards/ExperienceAndLanguages';
import { Obsession } from '@/components/cards/Obsession';
import { Interests } from '@/components/cards/Interests';
import { Religion } from '@/components/cards/Religion';
import { Responsibilities } from '@/components/cards/Responsibilities';
import { Certifications } from '@/components/cards/Certifications';
import { Image } from '@/components/cards/Image';
import { Work } from '@/components/cards/Work';
import { Position } from '@/components/cards/Position';

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
}

export const Container = ({ profileData }: ContainerProps) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isLargeScreen = windowWidth > 768;
  
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
    }
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
          yearsOfExperience={profileData.experience[0]}
          languages={profileData.languages}
        />
      </View>
      <View style={styles.spacer} />
      <View style={dynamicStyles.componentContainer}>
        <Obsession obsession={profileData.obsession} />
      </View>
      <View style={styles.spacer} />
      <View style={dynamicStyles.componentContainer}>
        <Interests interests={profileData.interests} />
      </View>
      <View style={styles.spacer} />
      <View style={dynamicStyles.componentContainer}>
        <Religion religion={profileData.religion} />
      </View>
      <View style={styles.spacer} />
      <View style={dynamicStyles.componentContainer}>
        <Responsibilities />
      </View>
      <View style={styles.spacer} />
      <View style={dynamicStyles.componentContainer}>
        <Certifications />
      </View>
      <View style={styles.spacer} />
      <View style={[dynamicStyles.componentContainer, styles.imageContainer]}>
        <Image />
      </View>
      <View style={styles.spacer} />
      <View style={dynamicStyles.componentContainer}>
        <Work />
      </View>
      <View style={styles.spacer} />
      <View style={dynamicStyles.componentContainer}>
        <Position />
      </View>
      <View style={styles.bottomSpacer} />
    </>
  );

  return (
    <View style={dynamicStyles.container}>
      {isLargeScreen ? (
        <View style={styles.largeScreenLayout}>
          <View style={dynamicStyles.profileCardContainer}>
            <ProfileCard {...profileData} />
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
            <ProfileCard {...profileData} />
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