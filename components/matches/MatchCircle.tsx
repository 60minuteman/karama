import useAuthMutation from '@/hooks/useAuthMutation';
import { useCurrentUser } from '@/services/api/api';
import customAxios from '@/services/api/envConfig';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Toast from 'react-native-toast-message';

const RADIUS = 44; // further increased image size
const STROKE_WIDTH = 6; // decreased circle width
const GAP = 6; // gap between image and circle
const DIAMETER = RADIUS * 2 + STROKE_WIDTH;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const MatchCircle = ({
  match,
  onPress,
}: {
  match: any;
  onPress?: () => void;
}) => {
  const [progress, setProgress] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const { data: currentUser } = useCurrentUser();

  useEffect(() => {
    if (match?.match_made_at) {
      const updateProgress = () => {
        const matchDate = new Date(match.match_made_at);
        const now = new Date();
        const elapsed =
          (now.getTime() - matchDate.getTime()) / (1000 * 60 * 60); // hours
        const percent = Math.max(0, 1 - elapsed / 24);
        setProgress(percent);
      };
      updateProgress();
      const interval = setInterval(updateProgress, 60000); // update every minute
      return () => clearInterval(interval);
    }
  }, [match?.match_made_at]);

  const createMessage: any = useAuthMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/chats`, data);
    },
    onSuccess: async (response: any) => {
      handleImageLoad();
      router.replace(
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

  // console.log('recipientId', match?.caregiver_profile?.user?.user_id);

  const handleCreateRoom = async () => {
    setIsLoading(true);
    createMessage.mutate({
      recipientId: match?.caregiver_profile?.user?.user_id,
      // text: 'Hello',
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

  return (
    <TouchableOpacity onPress={handleCreateRoom} activeOpacity={0.7}>
      <View style={styles.container}>
        <Svg width={DIAMETER} height={DIAMETER} style={StyleSheet.absoluteFill}>
          {progress > 0 && (
            <Circle
              stroke='#FF4B55'
              fill='none'
              cx={DIAMETER / 2}
              cy={DIAMETER / 2}
              r={RADIUS}
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              strokeLinecap='round'
              transform={`rotate(-180 ${DIAMETER / 2} ${DIAMETER / 2})`}
            />
          )}
        </Svg>
        <Image
          source={
            currentUser?.data?.role === 'FAMILY'
              ? match?.caregiver_profile?.pictures[0]?.path
                ? { uri: match.caregiver_profile.pictures[0].path }
                : require('@/assets/images/img.png')
              : match?.family_profile?.pictures[0]?.path
              ? { uri: match.family_profile.pictures[0].path }
              : require('@/assets/images/img.png')
          }
          style={styles.image}
          resizeMode='cover'
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DIAMETER,
    height: DIAMETER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: (RADIUS - GAP) * 2,
    height: (RADIUS - GAP) * 2,
    borderRadius: RADIUS - GAP,
    backgroundColor: '#F6F6F6',
  },
});
