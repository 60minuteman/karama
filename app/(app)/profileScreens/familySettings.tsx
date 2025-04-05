import ProfileHeader from '@/components/Profile/ProfileHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { queryClient } from '@/services/api/queryClient';
import { useUserStore } from '@/services/state/user';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const FamilySettings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const { clearUser, logout } = useUserStore();

  const handleLogout = () => {
    console.log('clearing');
    clearUser();
    logout();
    console.log('cleared');
    queryClient.clear();
    // router.replace('/(auth)/onboarding');
  };

  return (
    <SafeAreaView>
      <ThemedView>
        <ProfileHeader heading='Settings' />
        <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
          <ThemedView style={styles.container}>
            <View style={styles.section}>
              <View>
                <View style={styles.flexContainer}>
                  <ThemedText style={styles.heading}>Pause</ThemedText>
                  <Switch
                    trackColor={{ false: '#D7D7DC', true: '#EB4430' }}
                    thumbColor={'#ffffff'}
                    ios_backgroundColor='#D7D7DC'
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <ThemedText style={[styles.text, { marginTop: 8 }]}>
                  Pausing prevents your profile from being shown to new people.
                  You can still chat with your current matches
                </ThemedText>
              </View>
              <View>
                <View style={styles.flexContainer}>
                  <ThemedText style={styles.heading}>
                    Show Last Active Status
                  </ThemedText>
                  <Switch
                    trackColor={{ false: '#D7D7DC', true: '#EB4430' }}
                    thumbColor={'#ffffff'}
                    ios_backgroundColor='#D7D7DC'
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <ThemedText style={[styles.text, { marginTop: 8 }]}>
                  People viewing your profile can see your last active status,
                  and you can see theirs. Your matches won't be shown your last
                  active status
                </ThemedText>
              </View>
            </View>
            <View style={styles.section}>
              <ThemedText style={styles.text}>Phone & Email</ThemedText>
              <View style={styles.subSection}>
                <ThemedText style={styles.heading}>+2348028276612</ThemedText>
                <ThemedText style={styles.heading}>
                  sakoaminat@gmail.com
                </ThemedText>
              </View>
            </View>
            <View style={styles.section}>
              <ThemedText style={styles.text}>Notifications </ThemedText>
              <View style={styles.subSection}>
                <TouchableOpacity>
                  <View style={styles.flexContainer}>
                    <ThemedText style={styles.heading}>
                      Push Notifications
                    </ThemedText>
                    <View style={styles.imageContainer}>
                      <Image
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/assets/icons/chevron-right2.png')}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.flexContainer}>
                    <ThemedText style={styles.heading}>Emails</ThemedText>
                    <View style={styles.imageContainer}>
                      <Image
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/assets/icons/chevron-right2.png')}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.section}>
              <ThemedText style={styles.text}>Legal </ThemedText>
              <View style={styles.subSection}>
                <TouchableOpacity>
                  <View style={styles.flexContainer}>
                    <ThemedText style={styles.heading}>
                      Privacy Policy
                    </ThemedText>
                    <View style={styles.imageContainer}>
                      <Image
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/assets/icons/chevron-right2.png')}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.flexContainer}>
                    <ThemedText style={styles.heading}>
                      Terms of service
                    </ThemedText>
                    <View style={styles.imageContainer}>
                      <Image
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/assets/icons/chevron-right2.png')}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.section}>
              <ThemedText style={styles.text}>
                For Support Please Email{' '}
              </ThemedText>
              <ThemedText style={styles.heading}>
                support@karamacare.com
              </ThemedText>
            </View>
            <View style={styles.section2}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#261D2A1A' }]}
              >
                <ThemedText style={[styles.buttonText, { color: '#261D2A4D' }]}>
                  Delete account
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#EB4430' }]}
                onPress={handleLogout}
              >
                <ThemedText style={[styles.buttonText, { color: '#FFFFFF' }]}>
                  Log out
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};
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
    backgroundColor: '#261D2A0D',
  },
  section2: {
    gap: 8,
  },
  subSection: {
    gap: 24,
  },
  text: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
  },
  heading: {
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2AE5',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    width: 24,
    height: 24,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 20,
  },
});
export default FamilySettings;
