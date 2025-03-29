import { getOrCreateChatRoom, getUserIdByEmail } from '@/services/chat';
import { useUserStore } from '@/services/state/user';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface MatchCircleProps {
  imageUrl?: string;
  isActive?: boolean;
  onPress?: () => void;
  match?: any;
}

export const MatchCircle = ({
  imageUrl,
  isActive = false,
  onPress,
  match,
}: MatchCircleProps) => {
  console.log('imageUrl***', match?.caregiver_profile?.user);
  const firebaseUser = useUserStore((state) => state.firebaseCurrentUser);

  const handleCreateRoom = async () => {
    try {
      const currentUser = firebaseUser;
      // console.log('Current user:', currentUser?.email);
      if (!currentUser?.email) {
        throw new Error('No user email found');
      }
      const userId1 = await getUserIdByEmail(currentUser?.email);
      const userId2 = await getUserIdByEmail(
        `karama${match?.caregiver_profile?.user?.phone_number}@mail.com`
      );
      console.log('userId1', userId1, 'userId2', userId2);
      if (!userId1 || !userId2) {
        throw new Error('No user ID found');
      }
      const room = await getOrCreateChatRoom(userId1, userId2);

      if (room) {
        router.push(`/messages/${room?.id}?name=${userId2}`);
      }
      console.log('Room created:', room);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.container, isActive && styles.activeContainer]}>
        <Image
          source={
            imageUrl ? { uri: imageUrl } : require('@/assets/images/img.png')
          }
          style={styles.image}
          resizeMode='cover'
          defaultSource={require('@/assets/images/img.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#FF4B55',
    overflow: 'hidden',
    backgroundColor: '#F6F6F6',
  },
  activeContainer: {
    borderWidth: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
