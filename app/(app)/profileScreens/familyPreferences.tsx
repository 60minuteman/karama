import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/ThemedView'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import { ThemedText } from '@/components/ThemedText'
import LockedIndicator from '../../components/ui/LockedIndicator'
import InfoPill from '../../components/ui/InfoPill'
import { benefits, householdResponsibilities, languages, personality, requirements, rules, schedule, workOptions } from '@/constants/profile'

const FamilyPreferences = () => {
    const [payType, setPayType] = useState('Hourly');
    return (
        <SafeAreaView>
            <ThemedView>
                <ProfileHeader heading='Preference' />
                <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                    <View style={styles.container}>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <ThemedText style={styles.heading}>Pay schedule</ThemedText>
                                <View style={styles.payTypeContainer}>
                                    <TouchableOpacity
                                        style={[styles.payTypeButton, payType === 'Hourly' && styles.selectedPayType]}
                                        onPress={() => setPayType('Hourly')}
                                    >
                                        <Image
                                            source={require('@/assets/icons/hourly.png')}
                                            style={styles.payTypeIcon}
                                        />
                                        <ThemedText style={[styles.payTypeText, payType === 'Hourly' && styles.selectedPayTypeText]}>Hourly</ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.payTypeButton, payType === 'Salary' && styles.selectedPayType]}
                                        onPress={() => setPayType('Salary')}
                                    >
                                        <Image
                                            source={require('@/assets/icons/salary.png')}
                                            style={styles.payTypeIcon}
                                        />
                                        <ThemedText style={[styles.payTypeText, payType === 'Salary' && styles.selectedPayTypeText]}>Salary Base</ThemedText>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TextInput style={styles.inputStyle} placeholderTextColor={'#261D2A4D'} placeholder='Eg. $50,000/yr' />
                                </View>
                            </View>

                        </View>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Start date</ThemedText>
                                    <LockedIndicator isEditable />
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'06/26/2024'} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>We need a...</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'Caregiver/Household Manager'} icon={'🧢'} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Should be an age range of</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'26 - 30 years old'} />
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
                                    <ThemedText style={styles.heading}>Language Requirement</ThemedText>
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
                                    <ThemedText style={styles.heading}>Requirements/Requirements</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        requirements.map((work) => {
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
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Schedule</ThemedText>
                                    <LockedIndicator isEditable />
                                </View>
                                <ThemedText style={styles.subHeading}>40 Hours</ThemedText>

                                <View style={styles.pillContainer}>
                                    {
                                        schedule.map((work) => {
                                            return <InfoPill key={work} label={work} />
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Should have an experience of</ThemedText>
                                    <LockedIndicator />
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={'11-20 years'} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Work option</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        workOptions.slice(1, 2).map((work) => {
                                            return <InfoPill key={work.label} label={work.label} icon={work.icon} />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Caregiver personality</ThemedText>
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
                                    <ThemedText style={styles.heading}>Work Type</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        workOptions.slice(0, 1).map((work) => {
                                            return <InfoPill key={work.label} label={work.label} icon={work.icon} />
                                        })
                                    }
                                </View>
                            </View>

                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Duration</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        workOptions.slice(2, 3).map((work) => {
                                            return <InfoPill key={work.label} label={work.label} icon={work.icon} />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Benefits </ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        benefits.map((benefit) => {
                                            return <InfoPill key={benefit.id} label={benefit.label} icon={benefit.icon} />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={{ backgroundColor: '#FFFFFF', padding: 16, borderRadius: 20, gap: 8, marginBottom: 25 }}>
                                <ThemedText style={styles.heading}>Anything else you'd like caregivers to know? </ThemedText>
                                <View style={styles.pillContainer}>
                                    <ThemedText style={styles.sectionText2}>We are a very sports oriented family. Having a caregiver that is passionate about sports is a huge plus. </ThemedText>
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

    container: {
        marginHorizontal: 16,
        marginTop: 31,
        gap :16,
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
    payTypeContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    payTypeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 28,
        backgroundColor: 'rgba(38, 29, 42, 0.05)',
        alignSelf: 'flex-start',
    },
    selectedPayType: {
        backgroundColor: '#EB4430',
    },
    payTypeIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    payTypeText: {
        fontSize: 14,
        color: '#666666',
        fontFamily: 'Poppins_400Regular',
    },
    selectedPayTypeText: {
        color: '#FFFFFF',
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
})
export default FamilyPreferences