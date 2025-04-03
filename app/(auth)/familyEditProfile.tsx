import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/ThemedView'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import { ThemedText } from '@/components/ThemedText'
import LockedIndicator from '@/app/components/ui/LockedIndicator'
import InfoPill from '@/app/components/ui/InfoPill'
import { children, diets, disability, familyImages, interests, languages, pets, religion, writtenPrompts } from '@/constants/profile'
import PromptCard from '@/components/cards/PromptCard'

const FamilyEditProfile = () => {

    return (
        <SafeAreaView>
            <ThemedView>
                <ProfileHeader heading='Edit Profile' />
                <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                    <View style={styles.container} >
                        <View style={styles.photoContainer}>
                            <ThemedText style={styles.title}>Profile Photo</ThemedText>
                            <View style={styles.profilePhoto}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: '50%' }} source={require('@/assets/images/dummy.jpeg')} />
                            </View>
                            <ThemedText style={styles.heading}>Tap on photo to edit</ThemedText>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <ThemedText style={styles.heading}>My Photos</ThemedText>

                                <View style={styles.photoGrid}>
                                    {[...Array(6)].map((_, index) => (
                                        <View key={index} style={styles.photoPlaceholder}>
                                            {index < familyImages.length ? (
                                                <>
                                                    <Image
                                                        source={familyImages[index]}
                                                        style={styles.photoImage}
                                                    />
                                                    <TouchableOpacity
                                                        style={styles.removeButton}
                                                    >
                                                        <ThemedText style={styles.removeButtonText}>✕</ThemedText>
                                                    </TouchableOpacity>
                                                </>
                                            ) : (
                                                <ImageBackground resizeMode='contain' source={require('@/assets/icons/plus.png')} style={styles.photoPlaceholderInner} />
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Written Prompts (3)</ThemedText>
                                    <LockedIndicator isEditable />
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        writtenPrompts.map((prompt) => {
                                            return <PromptCard key={prompt.id} heading={prompt.heading} details={prompt.details} />
                                        })
                                    }
                                </View>
                                <ThemedText style={styles.heading}>Drag to recorder</ThemedText>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <ThemedText>About Us</ThemedText>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.subContainer}>
                                    <View>
                                        <ThemedText style={styles.text}>Name</ThemedText>
                                        <ThemedText style={styles.text}>Adebayos</ThemedText>
                                    </View>
                                    <View style={styles.imageContainer}>
                                        <Image style={{ width: '100%', height: '100%' }} source={require('@/assets/icons/chevron-right2.png')} />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Description</ThemedText>
                                    <LockedIndicator isEditable />
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'Mom & Dad'} icon={'👫🏻'} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Address</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'Manhattan, New York'} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Ages</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        children.slice(0, 2).map((child) => {
                                            return <InfoPill key={child.age_group} count={child.count} label={child.age_group} icon={child.icon} />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>We speak</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        languages.map((language: string) => {
                                            return <View>
                                                <InfoPill key={language} label={language} icon={'💬'} />
                                            </View>
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Our religion</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        religion.map((religion) => {
                                            return <View>
                                                <InfoPill key={religion.label} label={religion.label} icon={religion.icon} />
                                            </View>
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Children's Interests</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        interests.map((interest) => {
                                            return <View>
                                                <InfoPill key={interest.label} label={interest.label} icon={interest.icon} />
                                            </View>
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Disability Experience</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        disability.slice(0, 2).map((disability) => {
                                            return <InfoPill key={disability} label={disability} />
                                        })
                                    }

                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>We have a</ThemedText>
                                    <LockedIndicator />
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        pets.map((pet) => {
                                            return <InfoPill key={pet.label} label={pet.label} icon={pet.emoji} />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Diet</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        diets.slice(0, 2).map((diet) => {
                                            return <InfoPill key={diet.label} label={diet.label} icon={diet.icon} />
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ThemedView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    photoContainer: {
        padding: 16,
        gap: 16,
        alignSelf: 'center',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 24,
        marginBottom: 16,
        alignItems: 'center'
    },
    profilePhoto: {
        width: 110,
        height: 110,
        aspectRatio: 1,
        padding: 3,
        borderWidth: 1,
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: '',
    },
    container: {
        marginHorizontal: 16,
        marginTop: 31,
    },
    inputStyle: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: 300,
        fontSize: 32,
        letterSpacing: -0.64

    },
    heading: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 20,
        color: "#261D2A4D",
    },
    subSection: {
        gap: 16,
        marginBottom: 24,
    },
    section: {
        backgroundColor: '#261D2A0D',
        paddingTop: 20,
        paddingHorizontal: 20,
        marginTop: 6,
        borderRadius: 20,
        overflow: 'hidden',
        flex: 1,
    },
    pillContainer: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 12,
    },

    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionText2: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 20,
        color: '#261D2A'
    },
    subHeading: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 20,
        color: '#EB4430',
    },
    text: {
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: 20,
        color: "#261D2AE5"
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        width: 32,
        height: 32,
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 16,
    },
    photoPlaceholder: {
        width: 105,
        aspectRatio: 1,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    photoPlaceholderInner: {
        flex: 1,
        backgroundColor: '#A4A1A1',
        opacity: 0.2
    },
    removeButton: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    removeButtonText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    photoImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    title: {
        fontFamily: "Poppins",
        fontWeight: 600,
        fontSize: 16,
        lineHeight: 20,
        color:'#261D2AE5'
    }
}
)
export default FamilyEditProfile