import ProfileHeader from '@/components/Profile/ProfileHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCurrentUser } from '@/services/api/api';
import { queryClient } from '@/services/api/queryClient';
import { useUserStore } from '@/services/state/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

interface SettingsState {
  isPaused: boolean;
  showLastActive: boolean;
  showAge: boolean;
}

const CaregiverSettings = () => {
  const router = useRouter();
  const { clearUser, logout } = useUserStore();
  const { data: currentUser } = useCurrentUser();

  const [settings, setSettings] = useState<SettingsState>({
    isPaused: false,
    showLastActive: true,
    showAge: true,
  });

  const toggleSetting = (setting: keyof SettingsState) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleLogout = () => {
    console.log('clearing');
    clearUser();
    logout();
    console.log('cleared');
    queryClient.clear();
  };

  const handleBack = () => {
    router.push('/(tabs)/profile');
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            router.push('/(app)/profileScreens/deleteAccount');
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        <ProfileHeader
          heading='Settings'
          onBack={handleBack}
        />
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
                    onValueChange={() => toggleSetting('isPaused')}
                    value={settings.isPaused}
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
                    onValueChange={() => toggleSetting('showLastActive')}
                    value={settings.showLastActive}
                  />
                </View>
                <ThemedText style={[styles.text, { marginTop: 8 }]}>
                  People viewing your profile can see your last active status,
                  and you can see theirs. Your matches won't be shown your last
                  active status
                </ThemedText>
              </View>
              <View>
                <View style={styles.flexContainer}>
                  <ThemedText style={styles.heading}>
                    Display Age on Profile
                  </ThemedText>
                  <Switch
                    trackColor={{ false: '#D7D7DC', true: '#EB4430' }}
                    thumbColor={'#ffffff'}
                    ios_backgroundColor='#D7D7DC'
                    onValueChange={() => toggleSetting('showAge')}
                    value={settings.showAge}
                  />
                </View>
                <ThemedText style={[styles.text, { marginTop: 8 }]}>
                  Display age on profile for families to see
                </ThemedText>
              </View>
            </View>

            {/* <View style={styles.section}>
              <ThemedText style={styles.text}>Phone & Email</ThemedText>
              <View style={styles.subSection}>
                <ThemedText style={styles.heading}>
                  {currentUser?.phone_number || ''}
                </ThemedText>
                <ThemedText style={styles.heading}>
                  {currentUser?.email || ''}
                </ThemedText>
              </View>
            </View> */}

            {/* <View style={styles.section}>
              <ThemedText style={styles.text}>Notifications</ThemedText>
              <View style={styles.subSection}>
                <TouchableOpacity
                  onPress={() =>
                    router.push('/(app)/profileScreens/pushNotifications')
                  }
                >
                  <View style={styles.flexContainer}>
                    <ThemedText style={styles.heading}>
                      Push Notifications
                    </ThemedText>
                    <Image
                      style={styles.chevronIcon}
                      source={require('@/assets/icons/chevron-right2.png')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    router.push('/(app)/profileScreens/emailSettings')
                  }
                >
                  <View style={styles.flexContainer}>
                    <ThemedText style={styles.heading}>Emails</ThemedText>
                    <Image
                      style={styles.chevronIcon}
                      source={require('@/assets/icons/chevron-right2.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View> */}

            <View style={styles.section2}>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDelete}
              >
                <ThemedText
                  style={[styles.buttonText, styles.deleteButtonText]}
                >
                  Delete account
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.logoutButton]}
                onPress={handleLogout}
              >
                <ThemedText
                  style={[styles.buttonText, styles.logoutButtonText]}
                >
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
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2A4D',
  },
  heading: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#261D2AE5',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chevronIcon: {
    width: 24,
    height: 24,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#261D2A1A',
  },
  logoutButton: {
    backgroundColor: '#EB4430',
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 20,
  },
  deleteButtonText: {
    color: '#261D2A4D',
  },
  logoutButtonText: {
    color: '#FFFFFF',
  },
});

export default CaregiverSettings;
