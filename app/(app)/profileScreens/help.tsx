import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import { ThemedText } from '@/components/ThemedText'
import { useRouter } from 'expo-router'

const Help = () => {
    const router = useRouter();

    const handleBack = () => {
        router.push('/(tabs)/profile');
    };

    const openPrivacyPolicy = () => {
        Linking.openURL('https://app.termly.io/policy-viewer/policy.html?policyUUID=476091ca-cf6d-453b-8fb0-daf79853ceba');
    };

    const openTerms = () => {
        Linking.openURL('https://app.termly.io/policy-viewer/policy.html?policyUUID=c469d1df-2402-4209-afaa-13f87961890c');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView>
                <ProfileHeader heading='Help' onBack={handleBack} />
                <ThemedView style={styles.container}>
                    <View style={styles.section}>
                        <ThemedText style={styles.heading}>Legal</ThemedText>
                        <View style={styles.subSection}>
                            <TouchableOpacity onPress={openPrivacyPolicy}>
                                <View style={styles.subContainer}>
                                    <ThemedText style={styles.text}>Privacy Policy</ThemedText>
                                    <View style={styles.imageContainer}>
                                        <Image 
                                            style={styles.chevronIcon} 
                                            source={require('@/assets/icons/chevron-right2.png')} 
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openTerms}>
                                <View style={styles.subContainer}>
                                    <ThemedText style={styles.text}>Terms of service</ThemedText>
                                    <View style={styles.imageContainer}>
                                        <Image 
                                            style={styles.chevronIcon} 
                                            source={require('@/assets/icons/chevron-right2.png')} 
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <ThemedText style={styles.heading}>For Support Please Email</ThemedText>
                        <ThemedText style={styles.text}>support@karamacare.com</ThemedText>
                    </View>
                </ThemedView>
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
        gap: 16,
    },
    section: {
        padding: 20,
        borderRadius: 20,
        gap: 24,
        backgroundColor: '#261D2A0D'
    },
    subSection: {
        gap: 24
    },
    heading: {
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        color: "#261D2A4D"
    },
    text: {
        fontFamily: 'Poppins',
        fontWeight: '600',
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
        width: 24,
        height: 24,
    },
    chevronIcon: {
        width: '100%',
        height: '100%',
    }
})

export default Help 