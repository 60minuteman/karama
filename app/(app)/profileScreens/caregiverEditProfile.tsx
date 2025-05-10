import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ThemedView } from '@/components/ThemedView'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { Entypo } from '@expo/vector-icons'
import { api } from '@/services/api/api'
import InfoPill from '@/components/ui/InfoPill'
import Skeleton from '@/components/ui/Skeleton'

interface Picture {
  id: string;
  path: string;
  type: 'PROFILE_PICTURE' | 'OTHER';
  blur_hash: string;
  created_at: string;
  updated_at: string;
  key: string;
  _v: number;
}

interface CaregiverPrompt {
  id: string;
  category: string;
  title: string;
  answer: string;
}

interface CaregiverProfile {
  id: string;
  name: string;
  date_of_birth: string;
  gender: string | null;
  pronouns: string | null;
  zipcode: string;
  caregiver_type: string;
  years_of_experience: string;
  education_level: string;
  show_edu_level_on_profile: boolean;
  pictures: Picture[];
  prompts: CaregiverPrompt[];
  language: {
    languages: string[];
    other: string | null;
    requires_same_language_family: boolean;
  };
  characteristics: {
    diets: string[];
    personalities: string[];
    religion: string;
    show_diet_on_profile: boolean;
    show_religion_on_profile: boolean;
  };
  hobbies: {
    creative_interests: string[];
    instrument_interests: string[];
    sport_interests: string[];
    stem_interests: string[];
  };
}

interface ApiResponse {
  data: {
    caregiverProfile: CaregiverProfile;
  };
}

const CaregiverEditProfile = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const { data: profileData, isLoading } = useQuery<ApiResponse>({
        queryKey: ['caregiverProfile'],
        queryFn: async () => {
            const response = await api.get('/caregiver-profile/');
            return response.data;
        }
    });

    const caregiverProfile = profileData?.data?.caregiverProfile;
    
    const pictures = caregiverProfile?.pictures || [];
    const profilePicture = pictures.find(pic => pic.type === 'PROFILE_PICTURE');
    const otherPictures = pictures.filter(pic => pic.type === 'OTHER');

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets[0]) {
            // Here you would typically upload the image to your server
            setImages(prev => [...prev, result.assets[0].uri]);
        }
    };

    const handleEditField = (route: string) => {
        router.push(route);
    };

    const renderSkeleton = () => (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container}>
                <ProfileHeader 
                    heading='Edit profile' 
                    onBack={() => router.push('/(tabs)/profile')} 
                />
                <ScrollView style={styles.scrollView}>
                    <View style={styles.sectionContainer}>
                        <Skeleton width={120} height={24} />
                        <Skeleton width={200} height={32} />
                        <View style={styles.aboutMeContainer}>
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <View key={index} style={styles.aboutMeItem}>
                                    <View style={styles.aboutMeContent}>
                                        <Skeleton width={100} height={16} />
                                        <Skeleton width={150} height={24} />
                                    </View>
                                    <Skeleton width={40} height={24} />
                                </View>
                            ))}
                        </View>
                    </View>
                    
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Skeleton width={120} height={24} />
                            <Skeleton width={40} height={24} />
                        </View>
                        <View style={styles.interestsList}>
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <Skeleton key={index} width={80} height={32} borderRadius={16} />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </ThemedView>
        </SafeAreaView>
    );

    if (isLoading) {
        return renderSkeleton();
    }

    const getReligion = () => {
        try {
            return JSON.parse(caregiverProfile?.characteristics?.religion || '[]')[0];
        } catch {
            return caregiverProfile?.characteristics?.religion || '';
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container}>
                <ProfileHeader 
                    heading='Edit profile' 
                    onBack={() => router.push('/(tabs)/profile')} 
                />
                <ScrollView style={styles.scrollView}>
                    {/* Profile Photo Section */}
                    <View style={styles.photoSection}>
                        <ThemedText style={styles.sectionTitle}>Profile photo</ThemedText>
                        <TouchableOpacity onPress={handleImagePick}>
                            <View style={styles.profilePhotoContainer}>
                                {profilePicture?.path ? (
                                    <Image 
                                        source={{ uri: profilePicture.path }}
                                        style={styles.profilePhoto}
                                    />
                                ) : (
                                    <View style={[styles.profilePhoto, styles.defaultProfilePhoto]}>
                                        <Entypo name="user" size={40} color="#261D2A" />
                                    </View>
                                )}
                                <ThemedText style={styles.photoText}>Tap on photo to edit</ThemedText>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* My Photos Section */}
                    <View style={styles.sectionContainer}>
                        <ThemedText style={styles.sectionTitle}>My Photos</ThemedText>
                        <View style={styles.photoGrid}>
                            {otherPictures.map((pic, index) => (
                                <Image 
                                    key={pic.id} 
                                    source={{ uri: pic.path }} 
                                    style={styles.gridPhoto} 
                                />
                            ))}
                            <TouchableOpacity onPress={handleImagePick} style={styles.addPhotoButton}>
                                <Entypo name="plus" size={24} color="#261D2A" />
                            </TouchableOpacity>
                        </View>
                        <ThemedText style={styles.photoText}>Tap to Edit</ThemedText>
                    </View>

                    {/* Written Prompts Section */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <ThemedText style={styles.sectionTitle}>
                                Written Prompts ({caregiverProfile?.prompts?.length || 0})
                            </ThemedText>
                            <TouchableOpacity>
                                <ThemedText style={styles.editText}>Edit</ThemedText>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.promptsContainer}>
                            {caregiverProfile?.prompts?.map(prompt => (
                                <View key={prompt.id} style={styles.promptBox}>
                                    <ThemedText style={styles.promptQuestion}>{prompt.title}</ThemedText>
                                    <ThemedText style={styles.promptAnswer}>{prompt.answer}</ThemedText>
                                    <TouchableOpacity style={styles.closeButton}>
                                        <Entypo name="cross" size={16} color="#261D2A" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        <ThemedText style={styles.dragText}>Drag to reorder</ThemedText>
                    </View>

                    {/* About Me Section */}
                    <View style={styles.sectionContainer}>
                        <ThemedText style={styles.sectionTitle}>About Me</ThemedText>
                        <ThemedText style={styles.nameText}>{caregiverProfile?.name}</ThemedText>
                        <View style={styles.aboutMeContainer}>
                            {[
                                { 
                                    label: 'Type of caregiver', 
                                    text: caregiverProfile?.caregiver_type,
                                    hasEdit: true 
                                },
                                { 
                                    label: 'Educational level', 
                                    text: caregiverProfile?.education_level,
                                    hasEdit: true 
                                },
                                { 
                                    label: 'Gender', 
                                    text: caregiverProfile?.gender,
                                    hasEdit: true 
                                },
                                { 
                                    label: 'Location', 
                                    text: caregiverProfile?.zipcode,
                                    hasEdit: true 
                                },
                                { 
                                    label: 'With an experience of', 
                                    text: caregiverProfile?.years_of_experience,
                                    hasEdit: true 
                                },
                                { 
                                    label: 'I speak', 
                                    text: [
                                        ...(caregiverProfile?.language?.languages || []),
                                        caregiverProfile?.language?.other
                                    ].filter(Boolean).join(', '),
                                    hasEdit: true 
                                },
                                { 
                                    label: 'Diet', 
                                    text: caregiverProfile?.characteristics?.diets?.join(', '),
                                    hasEdit: true 
                                },
                            ].map((item, index) => (
                                <View key={index} style={styles.aboutMeItem}>
                                    <View style={styles.aboutMeContent}>
                                        <ThemedText style={styles.promptLabel}>{item.label}</ThemedText>
                                        <InfoPill label={item.text || ''} />
                                    </View>
                                    {item.hasEdit && (
                                        <TouchableOpacity>
                                            <ThemedText style={styles.editText}>Edit</ThemedText>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* My Interests Section */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <ThemedText style={styles.sectionTitle}>My Interests</ThemedText>
                            <TouchableOpacity>
                                <ThemedText style={styles.editText}>Edit</ThemedText>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.interestsList}>
                            {[
                                ...(caregiverProfile?.hobbies?.creative_interests || []),
                                ...(caregiverProfile?.hobbies?.instrument_interests || []),
                                ...(caregiverProfile?.hobbies?.sport_interests || []),
                                ...(caregiverProfile?.hobbies?.stem_interests || [])
                            ].map((interest, index) => (
                                <InfoPill key={index} label={interest} />
                            ))}
                        </View>
                    </View>

                    {/* My religion Section */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <ThemedText style={styles.sectionTitle}>My religion</ThemedText>
                            <TouchableOpacity>
                                <ThemedText style={styles.editText}>Edit</ThemedText>
                            </TouchableOpacity>
                        </View>
                        <InfoPill 
                            label={getReligion()}
                            locked
                        />
                    </View>

                    {/* My personality Section */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <ThemedText style={styles.sectionTitle}>My personality</ThemedText>
                            <TouchableOpacity>
                                <ThemedText style={styles.editText}>Edit</ThemedText>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.personalityContainer}>
                            {caregiverProfile?.characteristics?.personalities?.map((personality, index) => (
                                <InfoPill 
                                    key={index}
                                    label={personality}
                                    locked
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </ThemedView>
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
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    photoSection: {
        marginTop: 16,
        marginBottom: 16,
    },
    sectionContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    lastSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#261D2A4D',
        marginBottom: 16,
        fontFamily: 'Poppins',
    },
    profilePhotoContainer: {
        alignItems: 'center',
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
    },
    photoText: {
        fontSize: 14,
        color: '#261D2A99',
        fontFamily: 'Poppins',
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 8,
    },
    gridPhoto: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    addPhotoButton: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    promptsContainer: {
        gap: 8,
    },
    promptBox: {
        backgroundColor: '#F6F6F6',
        borderRadius: 16,
        padding: 16,
        position: 'relative',
    },
    promptQuestion: {
        fontSize: 14,
        color: '#7B787D',
        fontFamily: 'Poppins',
        marginBottom: 4,
    },
    promptAnswer: {
        fontSize: 16,
        color: '#261D2A',
        fontFamily: 'Poppins',
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dragText: {
        fontSize: 14,
        color: '#261D2A99',
        fontFamily: 'Poppins',
        marginTop: 8,
    },
    editText: {
        fontSize: 14,
        color: '#EB4430',
        fontFamily: 'Poppins',
    },
    interestsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    interestsList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    personalityContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
    },
    defaultProfilePhoto: {
        backgroundColor: '#FFE5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aboutMeContainer: {
        gap: 16,
    },
    aboutMeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    aboutMeContent: {
        flex: 1,
        gap: 4,
    },
    nameText: {
        fontSize: 24,
        color: '#261D2A',
        fontFamily: 'Poppins',
        marginBottom: 16,
    },
    promptLabel: {
        fontSize: 14,
        color: '#7B787D',
        fontFamily: 'Poppins',
        marginBottom: 4,
    },
});

export default CaregiverEditProfile;