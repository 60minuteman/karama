import useAuthMutation from '@/hooks/useAuthMutation';
import customAxios from '@/services/api/envConfig';
import { getOrCreateChatRoom, getUserIdByEmail } from '@/services/chat';
import { useUserStore } from '@/services/state/user';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

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
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const createMessage: any = useAuthMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/chats`, data);
    },
    onSuccess: async (response: any) => {
      console.log('response', response?.data?.data);
      handleImageLoad();
      router.push(
        `/messages/${response?.data?.data?.id}?name=${match?.caregiver_profile?.name}`
      );
    },
    onError: (error: any) => {
      console.error('error:', error?.response?.data);
      handleImageLoad();
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error?.response?.data?.message || 'Please try again',
      });
    },
  });

  const handleCreateRoom = async () => {
    setIsLoading(true);
    createMessage.mutate({
      recipientId: match?.caregiver_profile?.user?.user_id,
      text: 'Hello',
    });
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  console.log('caregiver name:', match?.caregiver_profile?.name);

  return (
    <TouchableOpacity onPress={handleCreateRoom} activeOpacity={0.7}>
      <View style={[styles.container, isActive && styles.activeContainer]}>
        {isLoading && <View style={styles.skeleton} />}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image
            source={
              match?.caregiver_profile?.pictures[0]?.path
                ? { uri: match?.caregiver_profile?.pictures[0]?.path }
                : require('@/assets/images/img.png')
            }
            style={styles.image}
            resizeMode='cover'
            defaultSource={require('@/assets/images/img.png')}
            onLoad={handleImageLoad}
          />
        </Animated.View>
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
  skeleton: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
});
