import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/ThemedView'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import { ThemedText } from '@/components/ThemedText'
import LockedIndicator from '../../components/ui/LockedIndicator'
import InfoPill from '../../components/ui/InfoPill'
import { benefits, householdResponsibilities, languages, personality, requirements, rules, schedule, workOptions } from '@/constants/profile'
import { useRouter } from 'expo-router'
import { useCurrentUser, useProfile } from '@/services/api/api'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

const FamilyPreferences = () => {
    const [payType, setPayType] = useState('Hourly');
    const router = useRouter();
     const { data: currentUser, isLoading: isLoadingCurrentUser } =
        useCurrentUser();
    
      const { data: familyProfile, isLoading: familyProfileLoading }: any =
        useProfile(currentUser?.data?.role);
        
    const familyProfileData = familyProfile?.family_profile;
    const handleBack = () => {
        router.push('/(tabs)/profile');
    };

    
  const formatTime = (timeStr: any) => {
  if (!timeStr || timeStr === "00:00:00") return "12:00AM";
  const [hours, minutes] = timeStr.split(':');
  const hourNum = parseInt(hours);
  const minuteStr = minutes.padStart(2, '0');
  const suffix = hourNum >= 12 ? 'PM' : 'AM';
  const hour12 = hourNum % 12 || 12;
  return `${hour12.toString().padStart(2, '0')}:${minuteStr}${suffix}`;
};

    return (
        <SafeAreaView>
            <ThemedView>
                <ProfileHeader heading='Preference' onBack={handleBack} />
                <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                    <View style={styles.container}>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <ThemedText style={styles.heading}>Pay schedule</ThemedText>
                                <View style={styles.payTypeContainer}>
                                    <TouchableOpacity
                                        style={[styles.payTypeButton, familyProfileData?.extra_info?.payment_info?.type?.toLowerCase().includes('hourly') && styles.selectedPayType]}
                                        onPress={() => setPayType('Hourly')}
                                    >
                                        <Image
                                            source={require('@/assets/icons/hourly.png')}
                                            style={styles.payTypeIcon}
                                        />
                                        <ThemedText style={[styles.payTypeText, familyProfileData?.extra_info?.payment_info?.type?.toLowerCase().includes('hourly') && styles.selectedPayTypeText]}>Hourly</ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.payTypeButton, familyProfileData?.extra_info?.payment_info?.type?.toLowerCase().includes('salary') && styles.selectedPayType]}
                                        onPress={() => setPayType('Salary')}
                                    >
                                        <Image
                                            source={require('@/assets/icons/salary.png')}
                                            style={styles.payTypeIcon}
                                        />
                                        <ThemedText style={[styles.payTypeText, familyProfileData?.extra_info?.payment_info?.type?.toLowerCase().includes('salary') && styles.selectedPayTypeText]}>Salary Base</ThemedText>
                                    </TouchableOpacity>
                                </View>
                                 {familyProfileData?.extra_info?.payment_info?.type?.toLowerCase().includes('hourly')  ? (
                                                                <View style={styles.subSection}>
                                                                <ThemedText style={styles.heading}>Pay rate</ThemedText>
                                                                <View style={styles.pillContainer}>
                                                                    <InfoPill icon={'⌛'} label={`$${familyProfileData?.extra_info?.payment_info?.hourly_min} - $${familyProfileData?.extra_info?.payment_info?.hourly_max}`} />
                                                                </View>
                                                                <View style={styles.sliderContainer}>
                                                                    <View style={styles.sliderLabels}>
                                                                        <ThemedText>$15</ThemedText>
                                                                        <ThemedText>$20</ThemedText>
                                                                        <ThemedText>$25</ThemedText>
                                                                        <ThemedText>$30</ThemedText>
                                                                        <ThemedText>$35</ThemedText>
                                                                        <ThemedText>$40</ThemedText>
                                                                        <ThemedText>$45+</ThemedText>
                                                                    </View>
                                                                    <MultiSlider
                                                                        values={[familyProfileData?.extra_info?.payment_info?.hourly_min, familyProfileData?.extra_info?.payment_info?.hourly_max]}
                                                                        min={15}
                                                                        max={45}
                                                                        step={1}
                                                                        sliderLength={318}
                                                                        
                                                                        selectedStyle={{
                                                                            backgroundColor: '#EB4430',
                                                                        }}
                                                                        unselectedStyle={{
                                                                            backgroundColor: '#E8E8E8',
                                                                        }}
                                                                        containerStyle={{
                                                                            height: 40,
                                                                        }}
                                                                        trackStyle={{
                                                                            height: 4,
                                                                        }}
                                                                        markerStyle={{
                                                                            backgroundColor: '#EB4430',
                                                                            height: 20,
                                                                            width: 20,
                                                                        }}
                                                                        // onValuesChange={setPayRange}
                                                                        enabledOne={false}
                                                                        enabledTwo={false}

                                                                    />
                                                                </View>
                                                            </View>
                                                            ): (
                                                                <View style={styles.subSection}>
                                                                <View>
                                                                    <TextInput style={styles.inputStyle} placeholderTextColor={'#261D2A4D'} placeholder={familyProfileData?.extra_info?.payment_info?.salary} />
                                                                </View>
                                                            </View>
                                                            )}
                               
                            </View>

                        </View>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Start date</ThemedText>
                                    <LockedIndicator isEditable />
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={familyProfileData?.caregiver_preference?.job_commitment?.start_date} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>We need a...</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {familyProfileData?.caregiver_preference?.caregiver_types?.map((type: string) => {
                                        return <InfoPill key={type} label={type} icon={'🧢'} />
                                    })}
                                    {/* <InfoPill label={familyProfileData?.caregiver_preference?.caregiver_types} icon={'🧢'} /> */}
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Should be an age range of</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={familyProfileData?.caregiver_preference?.age_preference?.age_group} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Should have an experience of</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill label={familyProfileData?.caregiver_preference?.experience} />
                                </View>
                            </View>
                                    {familyProfileData?.caregiver_preference?.education_level && (
                                        <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Educational level</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill  label={familyProfileData?.caregiver_preference?.education_level} />
                                </View>
                            </View>
                                    )}
                            
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Language Requirement</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        familyProfileData?.languages?.map((language: string) => {
                                            return <View>
                                                <InfoPill key={language} label={language} icon={'💬'} />
                                            </View>
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Work Option</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill  label={familyProfileData?.caregiver_preference?.availability} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Work Type</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill  label={familyProfileData?.caregiver_preference?.arrangement_type} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Duration</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill  label={familyProfileData?.caregiver_preference?.job_commitment?.commitment} />
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Requirements/Requirements</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        familyProfileData?.caregiver_preference?.requirements?.requirements?.map((work) => {
                                            return <InfoPill key={work} label={work}  />
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
                                {/* <ThemedText style={styles.subHeading}>40 Hours</ThemedText> */}
                                 <View style={styles.pillContainer}>
                                {(familyProfile?.family_profile?.caregiver_preference?.service_days || [])
                                .filter(schedule => !(schedule.begin === "00:00:00" && schedule.end === "00:00:00")) // optional: skip inactive days
                                .map((schedule) => (
                                    <InfoPill
                                    key={schedule.id}
                                    label={`${schedule.day}: ${formatTime(schedule.begin)} - ${formatTime(schedule.end)}`}
                                    />
                                ))}
                            </View>
                            </View>
                        </View>
                        
                        <View style={styles.section}>
                             <View style={styles.subSection}>
                                              <ThemedText style={styles.heading}>
                                                Household Responsibilities{' '}
                                              </ThemedText>
                                              <View style={styles.pillContainer}>
                                                {(
                                                  familyProfile?.family_profile?.caregiver_preference
                                                    ?.responsibilities?.household_responsibilities || []
                                                ).map((option: string) => (
                                                  <InfoPill key={option} label={option} />
                                                ))}
                                                {familyProfile?.family_profile?.caregiver_preference
                                                  ?.responsibilities?.other_household_responsibilities && (
                                                  <InfoPill
                                                    label={
                                                      familyProfile?.family_profile?.caregiver_preference
                                                        ?.responsibilities?.other_household_responsibilities
                                                    }
                                                  />
                                                )}
                                              </View>
                                            </View>
                             <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Household Rules</ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        familyProfileData?.household_info?.rules?.map((work) => {
                                            return <InfoPill key={work} label={work}  />
                                        })
                                    }
                                </View>
                            </View>
                            {/* <View style={styles.subSection}>
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
                            </View> */}
                            {/* <View style={styles.subSection}>
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
                            </View> */}

                            {/* <View style={styles.subSection}>
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
                            </View> */}
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Benefits </ThemedText>
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        familyProfileData?.extra_info?.benefits?.benefits?.map((benefit) => {
                                            return <InfoPill key={benefit} label={benefit}  />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={{ backgroundColor: '#FFFFFF', padding: 16, borderRadius: 20, gap: 8, marginBottom: 25 }}>
                                <ThemedText style={styles.heading}>Anything else you'd like caregivers to know? </ThemedText>
                                <View style={styles.pillContainer}>
                                    <ThemedText style={styles.sectionText2}>{familyProfileData?.extra_info?.more_information}</ThemedText>
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
    sliderContainer: {
        borderRadius: 8,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        width: '100%'
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