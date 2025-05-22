import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ThemedView } from '@/components/ThemedView'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import { Container } from '@/components/home/Container'
import { useOtherStore } from '@/services/state/other'

const profilePreview = () => {

    const {
        likeProfile
    } = useOtherStore()

    console.log(likeProfile, 'likeProfiles');
    

    
      const handleGoBack = () => {
        router.back();
      };
    
  return (
     <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Pressable onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name='arrow-back' size={24} color='#002140' />
                <Text>{likeProfile?.caregiver_profile?.name}</Text>
            </Pressable>
             <ThemedView style={styles.container}>
       
        <View style={styles.contentContainer}>
          <Container
            profileData={likeProfile}
            data={likeProfile}
          />
            </View>
            </ThemedView>
    </View>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
   contentContainer: {
    flex: 1,
        paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
        alignItems: 'center',
    justifyContent: 'center',
    },
  container: {
    flex: 1,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
  },
  containerWrapper: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginTop: 0, // Remove marginTop
  },
  icon: {
    width: 24,
    height: 24,
  },
  xmarkIcon: {
    tintColor: '#212329',
  },
  heartIcon: {
    tintColor: '#FF1818',
  },
  rejectButton: {
    position: 'absolute',
    left: 40,
    bottom: 60,
  },
  likeButton: {
    position: 'absolute',
    right: 40,
    bottom: 60,
  },
  backButton: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
});

export default profilePreview