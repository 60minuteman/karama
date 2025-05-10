import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import { ThemedText } from '@/components/ThemedText';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import InfoPill from '@/components/ui/InfoPill';
import { useRouter } from 'expo-router';

const CaregiverPreferences = () => {
    const [payType, setPayType] = useState('Hourly');
    const [payRange, setPayRange] = useState([20, 30]);
    const router = useRouter();

    const handleBack = () => {
        router.push('/(tabs)/profile');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView>
                <ProfileHeader heading='Preference' onBack={handleBack} />
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    <View style={styles.container}>
                        {/* Pay Section */}
                        <View style={styles.section}>
                            {/* Pay Schedule Section */}
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

                            {/* Pay Rate Section */}
                            <View style={styles.subSection}>
                                <ThemedText style={styles.heading}>Pay rate</ThemedText>
                                <View style={styles.pillContainer}>
                                    <InfoPill icon={'⌛'} label={`$${payRange[0]} - $${payRange[1]}`} />
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
                                        values={[payRange[0], payRange[1]]}
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
                                        onValuesChange={setPayRange}
                                        enabledTwo={true}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Experience Section */}
                        <View style={[styles.section, styles.experienceSection]}>
                            {/* Experience Section */}
                            <View style={styles.subSection}>
                                <View style={styles.sectionHeader}>
                                    <ThemedText style={styles.heading}>I have Experience With</ThemedText>
                                    <TouchableOpacity>
                                        <ThemedText style={styles.editButton}>Edit</ThemedText>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill icon={'👶'} label="Infant" />
                                    <InfoPill icon={'🧒'} label="Toddler" />
                                </View>
                            </View>

                            {/* I Can Work With Section */}
                            <View style={styles.subSection}>
                                <View style={styles.sectionHeader}>
                                    <ThemedText style={styles.heading}>I Can Work With</ThemedText>
                                    <TouchableOpacity>
                                        <ThemedText style={styles.editButton}>Edit</ThemedText>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill icon={'📚'} label="Dyslexia" />
                                    <InfoPill icon={'🧠'} label="ADHD" />
                                </View>
                            </View>

                            {/* Locked Sections */}
                            <View style={styles.subSection}>
                                <View style={styles.lockedContainer}>
                                    <View style={styles.lockedContent}>
                                        <ThemedText style={styles.heading}>I Can Work With</ThemedText>
                                        <View style={styles.pillContainer}>
                                            <InfoPill icon={'🐱'} label="Cat" />
                                            <InfoPill icon={'🐸'} label="Frog" />
                                            <InfoPill icon={'🐄'} label="Cow" />
                                        </View>
                                    </View>
                                    <Image 
                                        source={require('@/assets/icons/lock.png')}
                                        style={styles.lockIcon}
                                    />
                                </View>
                            </View>

                            {/* Work Type Section */}
                            <View style={styles.subSection}>
                                <View style={styles.lockedContainer}>
                                    <View style={styles.lockedContent}>
                                        <ThemedText style={styles.heading}>Work Type</ThemedText>
                                        <InfoPill icon={'🏠'} label="Hybrid" />
                                    </View>
                                    <Image 
                                        source={require('@/assets/icons/lock.png')}
                                        style={styles.lockIcon}
                                    />
                                </View>
                            </View>

                            {/* I Can Work Section */}
                            <View style={styles.subSection}>
                                <View style={styles.lockedContainer}>
                                    <View style={styles.lockedContent}>
                                        <ThemedText style={styles.heading}>I Can Work</ThemedText>
                                        <InfoPill icon={'⏰'} label="Full Time" />
                                    </View>
                                    <Image 
                                        source={require('@/assets/icons/lock.png')}
                                        style={styles.lockIcon}
                                    />
                                </View>
                            </View>

                            {/* Duration Section */}
                            <View style={styles.subSection}>
                                <View style={styles.lockedContainer}>
                                    <View style={styles.lockedContent}>
                                        <ThemedText style={styles.heading}>Duration</ThemedText>
                                        <InfoPill icon={'📅'} label="Long Term" />
                                    </View>
                                    <Image 
                                        source={require('@/assets/icons/lock.png')}
                                        style={styles.lockIcon}
                                    />
                                </View>
                            </View>

                            {/* Certification Section */}
                            <View style={styles.subSection}>
                                <View style={styles.lockedContainer}>
                                    <View style={styles.lockedContent}>
                                        <ThemedText style={styles.heading}>My Certification/Requirement</ThemedText>
                                        <View style={styles.pillContainer}>
                                            <InfoPill icon={'🏥'} label="First Aid" />
                                            <InfoPill icon={'🚗'} label="Able To Drive" />
                                            <InfoPill icon={'🏊‍♂️'} label="Can Swim" />
                                            <InfoPill icon={'✈️'} label="Can Travel" />
                                            <InfoPill icon={'💉'} label="COVID Vaccination" />
                                        </View>
                                    </View>
                                    <Image 
                                        source={require('@/assets/icons/lock.png')}
                                        style={styles.lockIcon}
                                    />
                                </View>
                            </View>

                            {/* Benefits Section */}
                            <View style={styles.subSection}>
                                <View style={styles.lockedContainer}>
                                    <View style={styles.lockedContent}>
                                        <ThemedText style={styles.heading}>Benefits I require</ThemedText>
                                        <View style={styles.pillContainer}>
                                            <InfoPill icon={'💰'} label="Yearly Raise" />
                                            <InfoPill icon={'👶'} label="Maternity Leave" />
                                            <InfoPill icon={'🏥'} label="Health Insurance" />
                                            <InfoPill icon={'👵'} label="Retirment Account" />
                                            <InfoPill icon={'🚇'} label="Monthly Metro Card" />
                                        </View>
                                    </View>
                                    <Image 
                                        source={require('@/assets/icons/lock.png')}
                                        style={styles.lockIcon}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Household Section */}
                        <View style={[styles.section, styles.householdSection]}>
                            {/* Household Responsibilities Section */}
                            <View style={styles.subSection}>
                                <View style={styles.sectionHeader}>
                                    <ThemedText style={styles.heading}>Household Responsibilities</ThemedText>
                                    <TouchableOpacity>
                                        <ThemedText style={styles.editButton}>Edit</ThemedText>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill icon={'🍳'} label="Cooking" />
                                    <InfoPill icon={'🐾'} label="Pet Care" />
                                    <InfoPill icon={'🥗'} label="Meal Prep" />
                                    <InfoPill icon={'👕'} label="Laundry" />
                                    <InfoPill icon={'🧹'} label="Deep Housekeeping" />
                                    <InfoPill icon={'📊'} label="Household Budgeting" />
                                    <InfoPill icon={'👥'} label="Vendor/ Services Management" />
                                </View>
                            </View>

                            {/* Household Rules Section */}
                            <View style={styles.subSection}>
                                <View style={styles.sectionHeader}>
                                    <ThemedText style={styles.heading}>Household Rules / Philosophies</ThemedText>
                                    <TouchableOpacity>
                                        <ThemedText style={styles.editButton}>Edit</ThemedText>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.pillContainer}>
                                    <InfoPill icon={'📱'} label="No Screens" />
                                    <InfoPill icon={'💨'} label="No Vapping" />
                                    <InfoPill icon={'✋'} label="No Hitting" />
                                    <InfoPill icon={'🐮'} label="No Bullying" />
                                    <InfoPill icon={'🚭'} label="No Smoking" />
                                    <InfoPill icon={'🥜'} label="No Nuts" />
                                    <InfoPill icon={'🌈'} label="Montesiori" />
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
    safeArea: {
        flex: 1,
    },
    container: {
        marginHorizontal: 16,
        marginTop: 31,
    },
    section: {
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingHorizontal: 20,
        marginTop: 6,
        borderRadius: 10,
        overflow: 'hidden',
        flex: 1,
    },
    experienceSection: {
        marginTop: 16,
    },
    householdSection: {
        marginTop: 16,
    },
    subSection: {
        gap: 24,
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        color: "#261D2A4D",
    },
    editButton: {
        color: '#EB4430',
        fontSize: 14,
        fontWeight: '600',
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
    pillContainer: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
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
    lockedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    lockedContent: {
        flex: 1,
        marginRight: 16,
    },
    lockIcon: {
        width: 20,
        height: 20,
    }
});

export default CaregiverPreferences; 