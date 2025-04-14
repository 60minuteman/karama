import { Container } from '@/components/home/Container';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import { ThemedView } from '@/components/ThemedView';
import { useProfile } from '@/services/api/api';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CaregiverProfile {
  caregiverProfile?: {
    pictures?: Array<{
      path: string;
      type: 'PROFILE_PICTURE' | 'OTHER';
      id: string;
      _v: number;
      blur_hash: string;
      created_at: string;
      key: string;
      updated_at: string;
    }>;
    past_positions?: Array<{
      id: string;
      title: string;
      employer: string;
      start_date: string;
      end_date: string;
      description: string;
    }>;
    // ... other profile fields
  };
}

const CaregiverProfileView = () => {
  const router = useRouter();
  const { data: caregiverProfile, isLoading: caregiverProfileLoading } =
    useProfile('CAREGIVER') as {
      data: CaregiverProfile;
      isLoading: boolean;
    };

  // Add debug logs
  console.log('Raw caregiver profile data:', caregiverProfile);
  console.log(
    'Pictures from profile:',
    caregiverProfile?.caregiverProfile?.pictures
  );

  function calculateAge(birthDate: string) {
    const birth = new Date(birthDate);
    const today = new Date();
    return today.getFullYear() - birth.getFullYear();
  }

  if (caregiverProfileLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedView>
          <ProfileHeader
            heading='Profile'
            edit
            onBack={() => router.push('/profile')}
          />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} />
          </View>
        </ThemedView>
      </SafeAreaView>
    );
  }

  // Get all pictures and ensure they're properly typed
  const pictures = caregiverProfile?.caregiverProfile?.pictures || [];

  // Get profile picture and gallery pictures with type safety
  const profilePicture = pictures.find(
    (pic) => pic?.type === 'PROFILE_PICTURE'
  );
  const otherPictures = pictures.filter(
    (pic): pic is (typeof pictures)[0] =>
      pic?.type === 'OTHER' && Boolean(pic.path)
  );

  // Get past positions
  const pastPositions =
    caregiverProfile?.caregiverProfile?.past_positions || [];

  const profileData = caregiverProfile
    ? {
        image: profilePicture?.path || '',
        additionalImages: otherPictures.map((pic) => pic.path),
        name: caregiverProfile?.caregiverProfile?.name || '',
        age: calculateAge(caregiverProfile?.caregiverProfile?.date_of_birth),
        location: `📍 ${caregiverProfile?.caregiverProfile?.zipcode || ''}`,
        pronouns: caregiverProfile?.caregiverProfile?.pronouns || '',
        rating: 4.5, // Hardcoded for now
        role: `🧢 ${caregiverProfile?.caregiverProfile?.caregiver_type || ''}`,
        experience: [
          caregiverProfile?.caregiverProfile?.years_of_experience,
          ...(caregiverProfile?.caregiverProfile?.ages_best_with || []),
        ].filter(Boolean),
        lookingFor: [
          ...(caregiverProfile?.caregiverProfile?.availability || []),
          caregiverProfile?.caregiverProfile?.arrangement_type || '',
        ].filter(Boolean),
        hourlyRate:
          caregiverProfile?.caregiverProfile?.payment_info?.type === 'Hourly'
            ? `$${caregiverProfile?.caregiverProfile?.payment_info?.hourly_min}-${caregiverProfile?.caregiverProfile?.payment_info?.hourly_max}`
            : `$${caregiverProfile?.caregiverProfile?.payment_info?.salary}/year`,
        languages: [
          ...(caregiverProfile?.caregiverProfile?.language?.languages || []),
          caregiverProfile?.caregiverProfile?.language?.other,
        ].filter(Boolean),
        interests: [
          ...(caregiverProfile?.caregiverProfile?.hobbies?.creative_interests ||
            []),
          ...(caregiverProfile?.caregiverProfile?.hobbies?.sport_interests ||
            []),
          ...(caregiverProfile?.caregiverProfile?.hobbies
            ?.instrument_interests || []),
          ...(caregiverProfile?.caregiverProfile?.hobbies?.stem_interests ||
            []),
        ].filter(Boolean),
        obsession:
          caregiverProfile?.caregiverProfile?.prompts?.[0]?.answer ||
          'Chickens! The kids love them and we just got two chicks named Bo & Sam.',
        religion: (() => {
          try {
            const religionStr =
              caregiverProfile?.caregiverProfile?.characteristics?.religion;
            return religionStr ? JSON.parse(religionStr)[0] : '';
          } catch {
            return (
              caregiverProfile?.caregiverProfile?.characteristics?.religion ||
              ''
            );
          }
        })(),
        personality:
          caregiverProfile?.caregiverProfile?.characteristics?.personalities ||
          [],
        disabilities:
          caregiverProfile?.caregiverProfile?.experience_with_disabilities
            ?.disabilities || [],
        address: '📍 Manhattan, New York',
        pastPositions: pastPositions.map((position) => ({
          title: position.title,
          employer: position.employer,
          startDate: position.start_date,
          endDate: position.end_date,
          description: position.description,
        })),
      }
    : null;

  console.log('Final profile data:', profileData);
  console.log('Data being passed to Container:', {
    profileData,
    containerData: {
      ...caregiverProfile?.caregiverProfile,
      pictures,
      pastPositions,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ProfileHeader
          heading='Profile'
          edit
          onBack={() => router.push('/profile')}
        />
        <View style={styles.contentContainer}>
          <Container
            profileData={profileData}
            data={{
              ...caregiverProfile?.caregiverProfile,
              pictures,
              profilePicture: profilePicture?.path,
              galleryPictures: otherPictures.map((pic) => pic.path),
              pastPositions,
            }}
          />
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: 'white',
    fontFamily: 'Poppins',
  },
  ratingText: {
    color: '#052222',
    fontSize: 16,
    fontWeight: 500,
  },
  parentHeading: {
    fontFamily: 'Poppins',
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 500,
    lineHeight: 36,
  },
  parentText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
    color: 'white',
  },
  section: {
    backgroundColor: '#261D2A0D',
    paddingTop: 25,
    paddingHorizontal: 25,
    marginTop: 6,
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CaregiverProfileView;
