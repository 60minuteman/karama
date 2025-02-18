import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { ProfileCard } from '@/components/cards/ProfileCard';
import { ProfileDetails } from '@/components/home/ProfileDetails';

const CONTAINER_WIDTH = 358;
const CONTAINER_HEIGHT = 574;

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
  };
}

export const Container = ({ profileData }: ContainerProps) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileCard {...profileData} />
        <ProfileDetails
          role={profileData.role}
          experience={profileData.experience}
          lookingFor={profileData.lookingFor}
          hourlyRate={profileData.hourlyRate}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollContent: {
    flexGrow: 1,
  },
}); 