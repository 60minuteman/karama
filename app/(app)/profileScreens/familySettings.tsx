import ProfileHeader from '@/components/Profile/ProfileHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useAuthMutation from '@/hooks/useAuthMutation';
import customAxios from '@/services/api/envConfig';
import { queryClient } from '@/services/api/queryClient';
import { useUserStore } from '@/services/state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
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
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const getDeviceId = async () => {
      let deviceId: any = await AsyncStorage.getItem('karama_id_device');
      setDeviceId(deviceId);
    };
    getDeviceId();
  }, []);

  const removeDevice: any = useAuthMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/notifications/devices/register`, data);
    },
    onSuccess: async (data: any) => {
      // console.log('token data success =====', data?.data);
      // console.log('end====');
    },
    onError: (error: any) => {
      // console.log('token error **********', error['response'].data);
      // Toast.show({
      //   type: 'problem',
      //   text1: error['response'].data.error,
      //   text2: error['response'].data.message,
      // });
    },
  });

  const handleLogout = () => {
    clearUser();
    removeDevice.mutate({ device_id: deviceId });
    logout();
    queryClient.clear();
    // router.replace('/(auth)/onboarding');
  };

  const handleBack = () => {
    router.push('/(tabs)/profile');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Handle delete account logic here
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView>
      <ThemedView>
        <ProfileHeader heading='Settings' onBack={handleBack} />
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
            {/* <View style={styles.section}>
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
            </View> */}
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
                onPress={handleDelete}
              >
                <ThemedText style={[styles.buttonText, { color: '#052222' }]}>
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
