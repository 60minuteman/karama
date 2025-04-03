import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import { ThemedText } from '@/components/ThemedText'

const Help = () => {
    return (
        <SafeAreaView>
            <ThemedView>
                <ProfileHeader heading='Help' />
                <ThemedView style={styles.container}>
                    <View style={styles.section}>
                        <ThemedText style={styles.heading}>Legal</ThemedText>
                        <View style={styles.subSection}>
                            <TouchableOpacity>
                                <View style={styles.subContainer}>
                                    <ThemedText style={styles.text}>Privacy Policy</ThemedText>
                                    <View style={styles.imageContainer}>
                                        <Image style={{width:'100%',height:'100%'}} source={require('@/assets/icons/chevron-right2.png')} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.subContainer}>
                                    <ThemedText style={styles.text}>Terms of service</ThemedText>
                                    <View style={styles.imageContainer}>
                                        <Image style={{ width: '100%', height: '100%' }} source={require('@/assets/icons/chevron-right2.png')} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <ThemedText style={styles.heading}>For Support Please Email </ThemedText>
                        <ThemedText style={styles.text}>support@karamacare.com</ThemedText>
                    </View>
                </ThemedView>
            </ThemedView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
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
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 20,
        color: "#261D2A4D"
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
    imageContainer :{
        width:24,
        height : 24,
    }
})
export default Help