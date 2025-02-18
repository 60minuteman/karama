import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

// Import images directly
const navImages = {
  You: require('@/assets/nav/You.png'),
  'active-You': require('@/assets/nav/You-active.png'),
  Liked: require('@/assets/nav/Liked.png'),
  'active-Liked': require('@/assets/nav/Liked-active.png'),
  Discover: require('@/assets/nav/Discover.png'),
  'active-Discover': require('@/assets/nav/Discover-active.png'),
  Matches: require('@/assets/nav/Matches.png'),
  'active-Matches': require('@/assets/nav/Matches-active.png'),
  Community: require('@/assets/nav/Community.png'),
  'active-Community': require('@/assets/nav/Community-active.png'),
} as const;

type NavIconType = keyof typeof navImages;

const navItems = [
  { id: 'forYou', label: 'For You', icon: 'You' as NavIconType, route: '/(app)/for-you' },
  { id: 'liked', label: 'Liked you', icon: 'Liked' as NavIconType, route: '/(app)/liked-you' },
  { id: 'discover', label: 'Discover', icon: 'Discover' as NavIconType, route: '/(app)/discover' },
  { id: 'matches', label: 'Matches', icon: 'Matches' as NavIconType, route: '/(app)/matches' },
  { id: 'community', label: 'Community', icon: 'Community' as NavIconType, route: '/(app)/community' },
];

export const HomeNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  let [fontsLoaded] = useFonts({
    Poppins_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  const isRouteActive = (route: string) => {
    // Handle both exact matches and nested routes
    return pathname === route || pathname.startsWith(`${route}/`);
  };

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <NavItem 
          key={item.id}
          icon={item.icon} 
          label={item.label} 
          active={isRouteActive(item.route)}
          onPress={() => {
            if (pathname !== item.route) {
              router.push(item.route);
            }
          }}
        />
      ))}
    </View>
  );
};

const NavItem = ({ 
  icon, 
  label, 
  active,
  onPress
}: { 
  icon: NavIconType, 
  label: string, 
  active?: boolean,
  onPress?: () => void
}) => (
  <TouchableOpacity 
    style={styles.navItem} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Image
      source={navImages[active ? `active-${icon}` as NavIconType : icon]}
      style={styles.icon}
      resizeMode="contain"
    />
    <ThemedText style={[
      styles.navLabel,
      active && styles.activeLabel
    ]}>
      {label}
    </ThemedText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#F6F6F6',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  navLabel: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins_400Regular'
  },
  activeLabel: {
    color: '#FF4B55',
  },
}); 