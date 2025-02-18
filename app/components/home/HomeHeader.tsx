import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/HomeLogo.png')} 
        style={styles.logo}
      />
      <View style={styles.rightIcons}>
        <Link href="/(app)/settings" asChild>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </Link>
        <Link href="/(app)/filters" asChild>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="options-outline" size={24} color="#000" />
          </TouchableOpacity>
        </Link>
        <Link href="/(app)/profile" asChild>
          <TouchableOpacity style={styles.iconButton}>
            <Image 
              source={require('@/assets/images/profile-placeholder.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
}); 