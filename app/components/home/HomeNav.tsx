import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

// Import images directly
const navImages = {
  You: require('@/assets/nav/You.png'),
  Liked: require('@/assets/nav/Liked.png'), 
  Discover: require('@/assets/nav/Discover.png'),
  Matches: require('@/assets/nav/Matches.png'),
  Community: require('@/assets/nav/Community.png'),
} as const;

type NavIconType = keyof typeof navImages;

const navItems = [
  { id: 'forYou', label: 'For you', icon: 'You' as NavIconType },
  { id: 'liked', label: 'Liked you', icon: 'Liked' as NavIconType },
  { id: 'discover', label: 'Discover', icon: 'Discover' as NavIconType, active: true },
  { id: 'matches', label: 'Matches', icon: 'Matches' as NavIconType },
  { id: 'community', label: 'Community', icon: 'Community' as NavIconType },
];

export const HomeNav = () => {
  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <NavItem 
          key={item.id}
          icon={item.icon} 
          label={item.label} 
          active={item.active}
        />
      ))}
    </View>
  );
};

const NavItem = ({ 
  icon, 
  label, 
  active 
}: { 
  icon: NavIconType, 
  label: string, 
  active?: boolean 
}) => (
  <TouchableOpacity style={styles.navItem}>
    <Image
      source={navImages[icon]}
      style={[
        styles.icon,
        active && styles.activeIcon
      ]}
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
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#CCCCCC'
  },
  activeIcon: {
    tintColor: '#FF4B55'
  },
  navLabel: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#CCCCCC',
  },
  activeLabel: {
    color: '#FF4B55',
  },
}); 