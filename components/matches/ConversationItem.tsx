import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface ConversationItemProps {
  imageUrl?: string;
  name: string;
  lastMessage: string;
  time: string;
  onPress: () => void;
}

export const ConversationItem = ({ 
  imageUrl, 
  name, 
  lastMessage, 
  time,
  onPress 
}: ConversationItemProps) => {
  // Array of pastel placeholder colors
  const pastelColors = [
    'https://via.placeholder.com/150/FFB3BA', // Pastel pink
    'https://via.placeholder.com/150/BAFFC9', // Pastel green  
    'https://via.placeholder.com/150/BAE1FF', // Pastel blue
    'https://via.placeholder.com/150/FFFFBA', // Pastel yellow
    'https://via.placeholder.com/150/FFB3FF', // Pastel purple
    'https://via.placeholder.com/150/FFD9BA', // Pastel orange
    'https://via.placeholder.com/150/E5CCFF'  // Pastel lavender
  ];

  // Get random pastel placeholder if no image provided
  const getRandomPastelPlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image 
          source={imageUrl ? { uri: imageUrl } : require('@/assets/images/profile-placeholder.png')}
          style={styles.avatar}
        />
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.name}>{name}</ThemedText>
        <ThemedText style={styles.message}>{lastMessage}</ThemedText>
      </View>
      <ThemedText style={styles.time}>{time}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#FF4B55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002140',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#666666',
  },
  time: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 8,
  },
}); 