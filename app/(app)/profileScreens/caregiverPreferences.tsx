import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import { ThemedText } from '@/components/ThemedText';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import InfoPill from '@/app/components/ui/InfoPill';
import { SafeAreaView } from 'react-native-safe-area-context';
import LockedIndicator from '../../components/ui/LockedIndicator';
import { benefits, children, disability, householdResponsibilities, pets, requirements, rules, workOptions } from '@/constants/profile';

const CaregiverPreferences = () => {
    const [payType, setPayType] = useState('Hourly');
    const [payRange, setPayRange] = useState([20, 30]);

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
                            </View>
                            <View style={styles.subSection}>
                                <ThemedText style={styles.heading}>Pay rate</ThemedText>
                                <View style={styles.pillContainer}>
                                    <InfoPill icon={'⌛'} label={'$20 - $35 '} />
                                </View>
                                <View style={styles.sliderContainer}>
                                    <View style={styles.sliderLabels}>
                                        <ThemedText>$15</ThemedText>
                                        <ThemedText>$20</ThemedText>
                                        <ThemedText>$25</ThemedText>
                                        <ThemedText>$30</ThemedText>
                                        <ThemedText>$35</ThemedText>
                                        <ThemedText>$40</ThemedText>
                                        <ThemedText>$45</ThemedText>
                                    </View>
                                    <MultiSlider
                                        values={[payRange[0], payRange[1]]}
                                        min={15}
                                        max={45}
                                        step={1}
                                        selectedStyle={{
                                            backgroundColor: '#EB4430',
                                        }}
                                        unselectedStyle={{
                                            backgroundColor: '#261D2A4D',
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
                                        onValuesChange={setPayRange}
                                        enabledTwo={true}
                                        snapped={true}
                                        sliderLength={270}

                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>I have Experience With</ThemedText>
                                    <LockedIndicator isEditable />
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        children.slice(0, 2).map((child) => {
                                            return <InfoPill key={child.age_group} label={child.age_group} icon={child.icon} />
                                        })
                                    }

                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>I Can Work With</ThemedText>
                                    <LockedIndicator isEditable />
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        disability.slice(0, 2).map((disability) => {
                                            return <InfoPill key={disability} label={disability} />
                                        })
                                    }

                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>I Can Work With</ThemedText>
                                    <LockedIndicator />
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        pets.slice(0, 2).map((pet) => {
                                            return <InfoPill key={pet.label} label={pet.label} icon={pet.emoji} />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Work Type</ThemedText>
                                    <LockedIndicator />
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
                                    <ThemedText style={styles.heading}>I Can Work</ThemedText>
                                    <LockedIndicator />
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
                                    <ThemedText style={styles.heading}>Duration</ThemedText>
                                    <LockedIndicator />
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
                                    <ThemedText style={styles.heading}>My Certification/Requirement</ThemedText>
                                    <LockedIndicator />
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        requirements.map((work) => {
                                            return <InfoPill key={work.label} label={work.label} icon={work.icon} />
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Household Responsibilities</ThemedText>
                                    <LockedIndicator isEditable />
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        householdResponsibilities.map((work) => {
                                            return <InfoPill key={work.id} label={work.label} icon={work.icon} />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Household Rules / Philosophies</ThemedText>
                                    <LockedIndicator isEditable />
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        rules.map((rule) => {
                                            return <InfoPill key={rule.label} label={rule.label} icon={rule.icon} />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.subSection}>
                                <View style={styles.headerStyle}>
                                    <ThemedText style={styles.heading}>Benefits I Require</ThemedText>
                                    <LockedIndicator />
                                </View>
                                <View style={styles.pillContainer}>
                                    {
                                        benefits.map((benefit) => {
                                            return <InfoPill key={benefit.id} label={benefit.label} icon={benefit.icon} />
                                        })
                                    }
                                </View>
                            </View>
                            <View style={{ backgroundColor: '#FFFFFF', padding: 16, borderRadius: 20, gap: 8 ,marginBottom:25}}>
                                <ThemedText style={styles.heading}>Anything else you'd like the families to know? </ThemedText>
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
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
    sliderContainer: {
        alignItems: 'center'
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 275
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
});
export default CaregiverPreferences