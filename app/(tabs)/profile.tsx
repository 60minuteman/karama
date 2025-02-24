import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router, useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

export default function Profile() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const menuItems = [
    {
      icon: require('@/assets/icons/edit-profile.png'),
      label: 'Edit profile',
      route: '/edit-profile',
    },
    {
      icon: require('@/assets/icons/preferences.png'),
      label: 'Preferences', 
      route: '/preferences',
    },
    {
      icon: require('@/assets/icons/settings.png'),
      label: 'Settings',
      route: '/settings',
    },
    {
      icon: require('@/assets/icons/help.png'),
      label: 'Help',
      route: '/help',
    },
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ThemedText style={styles.title}>Profile</ThemedText>

          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require('@/assets/images/profile-placeholder.jpg')}
                style={styles.profileImage}
              />
              <View style={styles.percentageContainer}>
                <ThemedText style={styles.percentageText}>90%</ThemedText>
              </View>
            </View>
            
            <View style={styles.profileInfo}>
              <ThemedText style={styles.name}>Sako Reuben</ThemedText>
              <TouchableOpacity 
                onPress={() => handleNavigation('/view-profile')}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.viewProfile}>View profile</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.karamaPlus}
            onPress={() => handleNavigation('/subscribe')}
            activeOpacity={0.7}
          >
            <Image
              source={require('@/assets/icons/karama-plus.png')}
              style={styles.karamaPlusIcon}
            />
            <View style={styles.karamaPlusText}>
              <ThemedText style={styles.karamaPlusTitle}>KARAMA +</ThemedText>
              <ThemedText style={styles.karamaPlusSubtitle}>
                Subscribe premium to get more matches
              </ThemedText>
            </View>
            <Image
              source={require('@/assets/icons/chevron-right.png')}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          <View style={styles.menuSection}>
            <ThemedText style={styles.menuTitle}>General</ThemedText>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleNavigation(item.route)}
                activeOpacity={0.7}
              >
                <Image source={item.icon} style={styles.menuIcon} />
                <ThemedText style={styles.menuLabel}>{item.label}</ThemedText>
                <Image
                  source={require('@/assets/icons/chevron-right2.png')}
                  style={styles.chevronIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold',
    color: '#002140',
    lineHeight: 38,
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FF4B55',
  },
  percentageContainer: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    backgroundColor: '#FF4B55',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Poppins_600Bold',
    fontWeight: '600',
    lineHeight: 34,
    color: '#002140',
    marginBottom: 4,
  },
  viewProfile: {
    fontSize: 16,
    color: '#666666',
  },
  karamaPlus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF4B55',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  karamaPlusIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  karamaPlusText: {
    flex: 1,
  },
  karamaPlusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002140',
  },
  karamaPlusSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  menuSection: {
    paddingHorizontal: 16,
  },
  menuTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEAEB',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#002140',
  },
  chevronIcon: {
    width: 24,
    height: 24,
  },
});