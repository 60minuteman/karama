import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useProfile } from '@/services/api/api'
import { Container } from '@/components/home/Container'
import { useRouter } from 'expo-router'

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
    const { data: caregiverProfile, isLoading: caregiverProfileLoading } = useProfile('CAREGIVER') as { 
        data: CaregiverProfile, 
        isLoading: boolean 
    };

    // Add debug logs
    console.log('Raw caregiver profile data:', caregiverProfile);
    console.log('Pictures from profile:', caregiverProfile?.caregiverProfile?.pictures);

    function calculateAge(birthDate: string) {
        const birth = new Date(birthDate);
        const today = new Date();
        return today.getFullYear() - birth.getFullYear();
    }

    const handleEdit = () => {
        Alert.alert(
            "Feature Not Available",
            "This feature is not available yet. We will notify you when it becomes available.",
            [{ text: "OK" }]
        );
    };

    if (caregiverProfileLoading) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ThemedView>
                    <ProfileHeader heading='Profile' edit onBack={() => router.push('/profile')} />
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size={'large'} />
                                        </View>
                </ThemedView>
            </SafeAreaView>
        )
    }

    // Get all pictures and ensure they're properly typed
    const pictures = caregiverProfile?.caregiverProfile?.pictures || [];
    
    // Get profile picture and gallery pictures with type safety
    const profilePicture = pictures.find(pic => pic?.type === 'PROFILE_PICTURE');
    const otherPictures = pictures.filter((pic): pic is typeof pictures[0] => 
        pic?.type === 'OTHER' && Boolean(pic.path)
    );

    // Get past positions
    const pastPositions = caregiverProfile?.caregiverProfile?.past_positions || [];

    const profileData = caregiverProfile ? {
        image: profilePicture?.path || '',
        additionalImages: otherPictures.map(pic => pic.path),
        name: caregiverProfile?.caregiverProfile?.name || '',
        age: calculateAge(caregiverProfile?.caregiverProfile?.date_of_birth),
        location: `📍 ${caregiverProfile?.caregiverProfile?.zipcode || ''}`,
        pronouns: caregiverProfile?.caregiverProfile?.pronouns || '',
        rating: 4.5, // Hardcoded for now
        role: `🧢 ${caregiverProfile?.caregiverProfile?.caregiver_type || ''}`,
        experience: [
            caregiverProfile?.caregiverProfile?.years_of_experience,
            ...(caregiverProfile?.caregiverProfile?.ages_best_with || [])
        ].filter(Boolean),
        lookingFor: [
            ...(caregiverProfile?.caregiverProfile?.availability || []),
            caregiverProfile?.caregiverProfile?.arrangement_type || ''
        ].filter(Boolean),
        hourlyRate: caregiverProfile?.caregiverProfile?.payment_info?.type === 'Hourly'
            ? `$${caregiverProfile?.caregiverProfile?.payment_info?.hourly_min}-${caregiverProfile?.caregiverProfile?.payment_info?.hourly_max}`
            : `$${caregiverProfile?.caregiverProfile?.payment_info?.salary}/year`,
        languages: [
            ...(caregiverProfile?.caregiverProfile?.language?.languages || []),
            caregiverProfile?.caregiverProfile?.language?.other
        ].filter(Boolean),
        interests: [
            ...(caregiverProfile?.caregiverProfile?.hobbies?.creative_interests || []),
            ...(caregiverProfile?.caregiverProfile?.hobbies?.sport_interests || []),
            ...(caregiverProfile?.caregiverProfile?.hobbies?.instrument_interests || []),
            ...(caregiverProfile?.caregiverProfile?.hobbies?.stem_interests || [])
        ].filter(Boolean),
        obsession: caregiverProfile?.caregiverProfile?.prompts?.[0]?.answer || 'Chickens! The kids love them and we just got two chicks named Bo & Sam.',
        religion: (() => {
            try {
                const religionStr = caregiverProfile?.caregiverProfile?.characteristics?.religion;
                return religionStr ? JSON.parse(religionStr)[0] : '';
            } catch {
                return caregiverProfile?.caregiverProfile?.characteristics?.religion || '';
            }
        })(),
        personality: caregiverProfile?.caregiverProfile?.characteristics?.personalities || [],
        disabilities: caregiverProfile?.caregiverProfile?.experience_with_disabilities?.disabilities || [],
        address: '📍 Manhattan, New York',
        pastPositions: pastPositions.map(position => ({
            title: position.title,
            employer: position.employer,
            startDate: position.start_date,
            endDate: position.end_date,
            description: position.description
        }))
    } : null;
 
    console.log('Final profile data:', profileData);
    console.log('Data being passed to Container:', {
        profileData,
        containerData: {
            ...caregiverProfile?.caregiverProfile,
            pictures,
            pastPositions
        }
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ThemedView style={styles.container}>
                <ProfileHeader heading='Profile' edit onEdit={handleEdit} onBack={() => router.push('/profile')} />
                <View style={styles.contentContainer}>
                    <Container 
                        profileData={profileData}
                        data={{
                            ...caregiverProfile?.caregiverProfile,
                            pictures,
                            profilePicture: profilePicture?.path,
                            galleryPictures: otherPictures.map(pic => pic.path),
                            pastPositions
                        }}
                    />
                        </View>
            </ThemedView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerWrapper: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CaregiverProfileView