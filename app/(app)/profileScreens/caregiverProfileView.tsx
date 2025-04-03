import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { ThemedView } from '@/components/ThemedView'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import { ThemedText } from '@/components/ThemedText'
import { childcareResponsibilities, children, disability, householdResponsibilities, interests, languages, personality, pets, religion, requirements, workOptions } from '@/constants/profile'
import InfoPill from '@/app/components/ui/InfoPill'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useProfile } from '@/services/api/api'

const CaregiverProfileView = () => {
    const { data: caregiverProfile, isLoading: caregiverProfileLoading }: any = useProfile('CAREGIVER')
    function calculateAge(birthDate: string) {
        const birth = new Date(birthDate);
        const today = new Date();

        let age = today.getFullYear() - birth.getFullYear();

        return age;
    }
    const profilePicture =
        caregiverProfile?.caregiverProfile?.pictures
            .filter((pic: object) => {
                return pic?.type === 'PROFILE_PICTURE'
            })
            .map((pic: object) => {
                return pic?.path;
            })
    const otherPicture =
        caregiverProfile?.caregiverProfile?.pictures
            .filter((pic: object) => {
                return pic?.type !== 'PROFILE_PICTURE'
            })
            .map((pic: object) => {
                return pic?.path;
            })
    // Example usage
    console.log(calculateAge("2000-04-01")); // Replace with actual birth date

    console.log(caregiverProfile)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ThemedView>
                <ProfileHeader heading='Profile' edit />
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    {caregiverProfileLoading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} /></View>
                        :
                        <View style={styles.container}>
                            <View style={{ borderRadius: 18, overflow: 'hidden' }}>
                                <ImageBackground style={styles.imageStyle} source={profilePicture[0] && `${profilePicture[0]}` }>
                                    <View style={styles.topCOntainer}>
                                        <View style={styles.parentButton}>
                                            <ThemedText style={styles.text1}> 🧔‍♂️{caregiverProfile?.caregiverProfile?.pronouns}</ThemedText>
                                        </View>
                                        <View>
                                            <ThemedText>4.5 ⭐</ThemedText>
                                        </View>
                                    </View>
                                    <View>
                                        <ThemedText style={styles.parentHeading}>{caregiverProfile?.caregiverProfile?.name}, {calculateAge(caregiverProfile?.caregiverProfile?.date_of_birth)}</ThemedText>
                                        <ThemedText style={styles.parentText}>Manhattan,New York</ThemedText>
                                        <ThemedText style={styles.parentText}>$100,000/Year</ThemedText>
                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>I am</ThemedText>
                                    <View style={styles.pillContainer}>

                                        <InfoPill label={caregiverProfile?.caregiverProfile?.caregiver_type} icon={'🧢'} />

                                    </View>
                                </View>
                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>I have experience with</ThemedText>
                                    <View style={styles.pillContainer}>
                                        {
                                            caregiverProfile?.caregiverProfile?.ages_best_with?.map((child: string) => {
                                                return <View>
                                                    <InfoPill key={child} label={child} />
                                                </View>
                                            })
                                        }
                                    </View>
                                </View>
                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>I’m Looking For </ThemedText>
                                    <View style={styles.pillContainer}>
                                        {
                                            caregiverProfile?.caregiverProfile?.availability?.map((option: string) => {
                                                return <View>
                                                    <InfoPill key={option} label={option} />
                                                </View>
                                            })
                                        }
                                        {
                                            caregiverProfile?.caregiverProfile?.arrangement_type?.map((option :string) => {
                                                return <View>
                                                    <InfoPill key={option} label={option} />
                                                </View>
                                            })
                                        }
                                    </View>
                                </View>
                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>My Hourly Rate</ThemedText>
                                    <View style={styles.pillContainer}>
                                        <InfoPill
                                            icon={'⌛'}
                                            label={`${caregiverProfile?.caregiverProfile?.payment_info?.hourly_min}-${caregiverProfile?.caregiverProfile?.payment_info?.hourly_max}`} />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>With an experience of</ThemedText>
                                    <View style={styles.pillContainer}>
                                        <InfoPill label={caregiverProfile?.caregiverProfile?.years_of_experience} />
                                    </View>
                                </View>
                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>We speak</ThemedText>
                                    <View style={styles.pillContainer}>
                                        {
                                            caregiverProfile?.caregiverProfile?.language?.languages.map((language: string) => {
                                                return <View>
                                                    <InfoPill key={language} label={language} icon={'💬'} />
                                                </View>
                                            })
                                        }
                                        {
                                            <InfoPill label={caregiverProfile?.caregiverProfile?.language?.other} icon={'💬'} />

                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>My current obession is </ThemedText>
                                    <ThemedText style={styles.sectionText}>
                                        Chickens! The kids love them and we just got two chicks named Bo & Sam.
                                    </ThemedText>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={{ position: 'absolute', minWidth: '100%', left: 0, right: 0 }}>
                                    <Image style={styles.sectionImage} resizeMode='cover' source={otherPicture[0] && `${otherPicture[0]}`} />
                                </View>
                                <View style={[styles.subSection, { marginTop: 325 }]}>
                                    <ThemedText style={styles.pillHeading}>My Interests</ThemedText>
                                    <View style={styles.pillContainer}>
                                        {
                                            caregiverProfile?.caregiverProfile?.hobbies?.flatMap(([key, value]: any) =>
                                                Array.isArray(value)
                                                    ? value.map(item => (
                                                        <InfoPill key={item} label={item} />
                                                    ))
                                                    : []
                                            )
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>My current obession is </ThemedText>
                                    <ThemedText style={styles.sectionText}>
                                        Chickens! The kids love them and we just got two chicks named Bo & Sam.
                                    </ThemedText>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>Our religion</ThemedText>
                                    <View style={styles.pillContainer}>

                                        <InfoPill label={caregiverProfile?.caregiverProfile?.characteristics?.religion} />

                                    </View>
                                </View>
                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>Personality</ThemedText>
                                    <View style={styles.pillContainer}>
                                        <InfoPill label={caregiverProfile?.caregiverProfile?.characteristics?.personality} />
                                    </View>
                                </View>
                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>Disability experience</ThemedText>
                                    <View style={styles.pillContainer}>
                                        {
                                            caregiverProfile?.caregiverProfile?.experience_with_disabilities?.disabilities?.map((disability: string) => {
                                                return <View>
                                                    <InfoPill key={disability} label={disability} />
                                                </View>
                                            })
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={{ position: 'absolute', minWidth: '100%', left: 0, right: 0 }}>
                                    <Image style={styles.sectionImage} resizeMode='cover' source={otherPicture[1] && `${otherPicture[1]}`} />
                                </View>
                                <View style={[styles.subSection, { marginTop: 325 }]}>
                                    <View style={styles.subSection}>
                                        <ThemedText style={styles.pillHeading}>Childcare Responsibilities</ThemedText>
                                        <View style={styles.pillContainer}>
                                            {
                                                caregiverProfile?.caregiverProfile?.responsibilities?.childcare_responsibilities?.map((option: string) => {
                                                    return <View>
                                                        <InfoPill key={option} label={option} />
                                                    </View>
                                                })
                                            }
                                            {caregiverProfile?.caregiverProfile?.responsibilities?.other_childcare_responsibilities
                                                && <InfoPill label={caregiverProfile?.caregiverProfile?.responsibilities?.other_childcare_responsibilities}
                                                />
                                            }

                                        </View>
                                    </View>
                                    <View style={styles.subSection}>
                                        <ThemedText style={styles.pillHeading}>Household Responsibilities </ThemedText>
                                        <View style={styles.pillContainer}>
                                            {
                                                caregiverProfile?.caregiverProfile?.responsibilities?.household_responsibilities?.map((option: string) => {
                                                    return <View>
                                                        <InfoPill key={option} label={option} icon={option} />
                                                    </View>
                                                })
                                            }
                                            {caregiverProfile?.caregiverProfile?.responsibilities?.childcare_responsibilities
                                                && <InfoPill label={caregiverProfile?.caregiverProfile?.responsibilities?.other_household_responsibilities}
                                                />}

                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={{ position: 'absolute', minWidth: '100%', left: 0, right: 0 }}>
                                    <Image style={styles.sectionImage} resizeMode='cover' source={otherPicture[2] && `${otherPicture[2]}`} />
                                </View>
                                <View style={[styles.subSection, { marginTop: 325 }]}>
                                    <View style={styles.subSection}>
                                        <ThemedText style={styles.pillHeading}>My Certifications/Requirements</ThemedText>
                                        <View style={styles.pillContainer}>
                                            {caregiverProfile?.caregiverProfile?.abilities_and_certifications.flatMap(([key, value]: string[]) =>
                                                key !== "id" // Exclude the ID
                                                    ? (Array.isArray(value) ? value : [value]).map(item => (
                                                        <InfoPill key={item} label={item} />
                                                    ))
                                                    : []
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.section, { height: 325 }]}>
                                <View style={{ position: 'absolute', minWidth: '100%', left: 0, right: 0, top: 0 }}>
                                    <Image style={styles.sectionImage} resizeMode='cover' source={otherPicture[3] && `${otherPicture[3]}`} />
                                </View>
                            </View>
                            <View style={styles.section}>

                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>I can work with</ThemedText>
                                    <View style={styles.pillContainer}>
                                        {
                                            caregiverProfile?.caregiverProfile?.experience_with_pets?.pets.map((pet: string) => {
                                                return <View>
                                                    <InfoPill key={pet} label={pet} />
                                                </View>
                                            })
                                        }{
                                            caregiverProfile?.caregiverProfile?.experience_with_pets?.other
                                            && <InfoPill label={caregiverProfile?.caregiverProfile?.experience_with_pets?.other} />

                                        }
                                    </View>
                                </View>

                            </View>
                            <View style={styles.section}>
                                <View style={styles.subSection}>
                                    <ThemedText style={styles.pillHeading}>Our current obession is </ThemedText>
                                    <ThemedText style={styles.sectionText}>
                                        Chickens! The kids love them and we just got two chicks named Bo & Sam.
                                    </ThemedText>
                                </View>
                            </View>
                            <View style={[styles.section, { height: 325 }]}>
                                <View style={{ position: 'absolute', minWidth: '100%', left: 0, right: 0, top: 0 }}>
                                    <Image style={styles.sectionImage} resizeMode='cover' source={otherPicture[4] && `${otherPicture[4]}`} />
                                </View>
                            </View>
                            <View style={styles.section2}>
                                <View>
                                    <ThemedText style={styles.sectionText}>My Past positions</ThemedText>
                                    <ThemedText style={styles.pillHeading}>Tap to view</ThemedText>
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
                        </View>
                    }
                </ScrollView>
            </ThemedView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 31,
    },
    imageStyle: {
        height: "auto",
        minWidth: '100%',
        paddingVertical: 25,
        paddingHorizontal: 16,
        gap: 460,
        borderRadius: 18,
    },
    topCOntainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    parentButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        color: '#FFFFFF',
        backgroundColor: '#A9A19596',
        borderRadius: 28
    },
    text1: {
        color: 'white',
        fontFamily: 'Poppins'
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
        lineHeight: 36
    },
    parentText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 20,
        color: 'white'
    },
    section: {
        backgroundColor: '#261D2A0D',
        paddingTop: 25,
        paddingHorizontal: 25,
        marginTop: 6,
        borderRadius: 20,
        overflow: 'hidden',
        flex: 1,
    },
    section2: {
        backgroundColor: '#FFFFFF',
        paddingTop: 25,
        paddingHorizontal: 25,
        paddingBottom: 90,
        marginTop: 6,
        borderRadius: 10,
        overflow: 'hidden',
        flex: 1,
        gap: 16
    },
    subSection: {
        gap: 24,
        marginBottom: 25,
    },
    pillHeading: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 20,
        color: '#261D2A',
        opacity: 0.4,
    },
    pillSubHeading: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 20,
        color: '#EB4430',
        marginTop: 8
    },
    pillContainer: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },
    sectionText: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 20,
        lineHeight: 25,
        color: '#261D2A'
    },
    sectionText2: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 20,
        color: '#261D2A'
    },
    sectionImage: {
        width: '100%',
        height: 325,
        left: 0,
        right: 0,
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
    }

})
export default CaregiverProfileView