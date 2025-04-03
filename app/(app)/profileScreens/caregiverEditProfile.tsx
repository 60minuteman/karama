import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/ThemedView'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import { ThemedText } from '@/components/ThemedText'
import { childcareResponsibilities, children, diets, familyImages, householdResponsibilities, interests, languages, personality, religion, workOptions, writtenPrompts } from '@/constants/profile'
import LockedIndicator from '../../components/ui/LockedIndicator'
import PromptCard from '@/components/cards/PromptCard'
import InfoPill from '../../components/ui/InfoPill'

const CaregiveEditProfile = () => {
    return (
        <SafeAreaView>
            <ThemedView>
                <ProfileHeader heading='Edit Profile' />
                <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                    <View style={styles.container}>
                        <View style={styles.photoContainer}>
                            <ThemedText style={styles.title}>Profile Photo</ThemedText>
                            <View style={styles.profilePhoto}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: '50%' }} source={require('@/assets/images/dummy2.jpeg')} />
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
                                                <View style={styles.photoPlaceholderInner}>
                                                    <Image style={{ width: 42, height: 42 }} resizeMode='contain' source={require('@/assets/icons/plus.png')} />
                                                </View>
                                            )}
                                        </View>
                                    ))}
                                </View>
                                <ThemedText style={styles.heading}>Tap to edit</ThemedText>
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
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>About Me</ThemedText>
                                    <LockedIndicator isEditable />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.subContainer}>
                                    <View style={{ gap: 8 }}>
                                        <ThemedText style={styles.text1}>Name</ThemedText>
                                        <ThemedText style={styles.text2}>Adebayos</ThemedText>
                                    </View>
                                    <View style={styles.imageContainer}>
                                        <Image style={{ width: '100%', height: '100%' }} source={require('@/assets/icons/chevron-right2.png')} />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Type of caregiver</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'Caregiver/Household Manager'} icon={'🧢'} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Educational level</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill icon={'🎓'} label={'Bachelors Degree'} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>I am</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'26 - 30 years old'} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Gender</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'Gender Queer'} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Location</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'Manhattan, New York'} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>With an experience of</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'11-20 years'} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>I speak</ThemedText>
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
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>My Interests</ThemedText>
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
                        </View>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>My personality</ThemedText>
                                    <LockedIndicator />
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        personality.map((person) => {
                                            return <InfoPill key={person.label} label={person.label} icon={person.icon} />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>My religion</ThemedText>
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
                        </View>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <View>
                                    <ThemedText style={styles.sectionText}>My Past positions</ThemedText>
                                    <ThemedText style={styles.heading}>Tap to view</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <View style={styles.customPill}>
                                        <ThemedText style={styles.customPillText}>Wilson → </ThemedText>
                                    </View>
                                    <View style={styles.customPill}>
                                        <ThemedText style={styles.customPillText}>Johnsons → </ThemedText>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={{ alignSelf: 'flex-end', marginVertical: 40 }}>
                                    <LockedIndicator isEditable />
                                </View>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.text}>The Willson’s</ThemedText>
                                    <View >
                                        <TouchableOpacity>
                                            <View style={styles.cancelStyle} >
                                                <Image style={{ width: 10, height: 10 }} resizeMode='contain' source={require("@/assets/icons/cancel.png")} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Start & End Date</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'11/02/2021'} />
                                    <Text style={styles.hyphen}>-</Text>
                                    <InfoPill label={'11/02/2023'} />

                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Position</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'Caregiver/Household Manager'} icon={'🧢'} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Ages</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        children.map((child) => {
                                            return <View>
                                                <InfoPill key={child.age_group} label={child.age_group} icon={child.icon} />
                                            </View>
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Work Options</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        workOptions.slice(1).map((work) => {
                                            return <InfoPill key={work.label} label={work.label} icon={work.icon} />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Childcare Responsibilities</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        childcareResponsibilities.map((work) => {
                                            return <InfoPill key={work.label} label={work.label} icon={work.icon} />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Household Responsibilities</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        householdResponsibilities.map((work) => {
                                            return <InfoPill key={work.id} label={work.label} icon={work.icon} />
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
        marginBottom: 16,
        alignItems: 'center'
    },
    profilePhoto: {
        width: 110,
        height: 110,
        aspectRatio: 1,
        borderWidth: 3,
        borderRadius: '50%',
        overflow: 'hidden',
        borderColor: '#FD9204',
    },
    container: {
        marginHorizontal: 16,
        marginTop: 24,
        gap: 16
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
        alignItems : 'center'
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
        fontFamily:'Fraunces',
        fontWeight: 400,
        fontSize: 32,
        lineHeight :40,
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
        backgroundColor: 'rgba(164, 161, 161, 0.2)',
        justifyContent: 'center',
        alignItems: 'center'
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
        color: '#261D2AE5'
    },
    text1: {
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: 500,
        color: "#261D2A4D",
    },
    text2: {
        fontFamily: 'Poppins',
        color: '#261D2AE5',
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 600

    },
    customPill: {
        backgroundColor: '#052222',
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    customPillText: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 20,
        color: '#FFFFFF'
    },
    sectionText: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 20,
        lineHeight: 25,
        color: '#261D2A'
    },
    cancelStyle: {
        width: 24,
        height: 24,
        backgroundColor: "#FFFFFF",
        borderRadius: '50%',
        boxShadow: '0 0 9px 0 rgba(0, 0, 0, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hyphen :{
        fontFamily :'Poppins',
        fontWeight :400, 
        fontSize :16,
        color:'#261D2A4D',
    }

}
)
export default CaregiveEditProfile