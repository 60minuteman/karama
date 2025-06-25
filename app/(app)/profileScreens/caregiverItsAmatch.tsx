import { ThemedText } from '@/components/ThemedText';
import useAuthMutation from '@/hooks/useAuthMutation';
import { useCurrentUser } from '@/services/api/api';
import customAxios from '@/services/api/envConfig';
import { useStore } from '@/services/state/State';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const caregiverItsAmatch = () => {
  const { match_complete } = useStore();
  const { data: currentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  // Animation values
  const leftImagePosition = useRef(new Animated.Value(-100)).current;
  const rightImagePosition = useRef(new Animated.Value(100)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;

  // Type guard to check if match_complete has the expected structure
  const isMatchComplete = (
    data: any
  ): data is {
    match: {
      family_profile?: { name?: string };
      caregiver_profile?: {
        name?: string;
        pictures?: Array<{ path?: string }>;
      };
    };
  } => {
    return data && typeof data === 'object' && 'match' in data;
  };

  console.log('currentUser', currentUser?.data?.profile_picture?.path);

  // Animation effect
  useEffect(() => {
    // First animation: images come together
    Animated.parallel([
      Animated.timing(leftImagePosition, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(rightImagePosition, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Second animation: bounce effect
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const createMessage: any = useAuthMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/chats`, data);
    },
    onSuccess: async (response: any) => {
      setIsLoading(false);
      router.push(
        `/messages/${response?.data?.data?.id}?name=${
          isMatchComplete(match_complete)
            ? match_complete.match?.caregiver_profile?.name
            : ''
        }`
      );
    },
    onError: (error: any) => {
      console.error('error:', error?.response?.data);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error?.response?.data?.message || 'Please try again',
      });
    },
  });

  const handleCreateRoom = async () => {
    router.replace('/(tabs)/discover');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity
        onPress={() => router.replace('/(tabs)/discover')}
        style={[styles.backIcon, { backgroundColor: 'transparent' }]}
      >
        <Ionicons name='arrow-back' size={28} color='#222' />
      </TouchableOpacity>

      {/* Paper Plane Image */}
      <Image
        source={require('@/assets/images/uplogoicon.png')}
        style={styles.paperPlane}
      />

      {/* Centered Images */}
      <View style={styles.centerImagesContainer}>
        <View style={styles.matchPhotosWrapper}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              height: 259.16,
            }}
          >
            {/* Right (underneath) placeholder - Current User */}
            <Animated.Image
              source={{
                uri: currentUser?.data?.profile_picture?.path,
              }}
              style={{
                position: 'absolute',
                left: '35%',
                zIndex: 1,
                width: 172.77,
                height: 259.16,
                backgroundColor: '#D3D3D3', // light gray
                borderRadius: 24,
                transform: [
                  { rotate: '14.79deg' },
                  { translateX: leftImagePosition },
                  {
                    scale: bounceValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.1],
                    }),
                  },
                ],
                top: '-5%',
              }}
            />
            {/* Left (top) placeholder - Matched User */}
            <Animated.Image
              source={{
                uri: match_complete?.match?.family_profile?.pictures[0]?.path,
              }}
              style={{
                zIndex: 2,
                width: 172.77,
                height: 259.16,
                backgroundColor: '#fff',
                borderRadius: 24,
                transform: [
                  { rotate: '-10deg' },
                  { translateX: rightImagePosition },
                  {
                    scale: bounceValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.1],
                    }),
                  },
                ],
                marginRight: '35%',
                marginTop: '30%',
              }}
            />
            {/* Absolutely positioned downlogoicon image at the right end */}
            <Image
              source={require('@/assets/images/downlogoicon.png')}
              style={[
                styles.rightPhoto,
                {
                  position: 'absolute',
                  right: '-15%',
                  top: '40%',
                  transform: [{ translateY: -50 }],
                  zIndex: 3,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Text and Buttons below images */}
      <View style={styles.textAndButtonsContainer}>
        <Text style={styles.congrats}>Congratulations</Text>
        <Text style={styles.matchTitle}>It's a Match!!</Text>
        <Text style={styles.subText}>
          The{' '}
          {isMatchComplete(match_complete)
            ? match_complete.match?.family_profile?.name || 'Family'
            : 'Family'}{' '}
          has 24 hours to reach out!
        </Text>
        {/* <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Start a conversation</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.subscribeButton, { marginBottom: 24 }]}
          onPress={handleCreateRoom}
          disabled={isLoading}
        >
          <LinearGradient
            colors={['#EB4430', '#FF9900']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <ThemedText style={styles.buttonText}>Keep Searching</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => router.replace('/(tabs)/discover')}>
          <Text style={styles.secondaryBtnText}>
            Not now ,{' '}
            <Text style={{ fontWeight: '400', color: '#261D2ACC' }}>
              I'll have a chat later
            </Text>
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // paddingVertical: 8,
    // backgroundColor: '#F6F6F6',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF5F6',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 56,
  },
  backIcon: {
    position: 'absolute',
    top: '10%',
    left: 20,
    zIndex: 2,
  },
  paperPlane: {
    position: 'absolute',
    top: '15%',
    left: '18%',
    transform: [{ translateX: -90 }],
    width: 180,
    height: 185,
    resizeMode: 'contain',
    zIndex: 1,
  },
  centerImagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  matchPhotosWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    width: '100%',
  },
  matchPhoto: {
    // width: 180,
    // height: 180,
    borderRadius: 30,
    marginRight: -60,
    zIndex: 2,
    // borderWidth: 4,
    // borderColor: '#fff',
    // backgroundColor: '#eee',
  },
  rightPhoto: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginLeft: -20,
    marginTop: '80%',
    // transform: [{ rotate: '15deg' }],
    // borderWidth: 3,
    // borderColor: '#fff',
    // backgroundColor: '#eee',
    zIndex: 1,
  },
  textAndButtonsContainer: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    paddingHorizontal: 24,
  },
  congrats: {
    color: '#EB4430',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  matchTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    fontFamily: 'Bogart-Bold',
  },
  subText: {
    color: '#261D2ACC',
    fontSize: 14,
    marginBottom: 24,
    fontFamily: 'Poppins',
  },
  primaryBtn: {
    width: '85%',
    backgroundColor: '#FF6B3C',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#FF6B3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  secondaryBtnText: {
    color: '#EB4430',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeButton: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  skewedImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  skewedImageWrapperLeft: {
    transform: [{ rotate: '-10deg' }],
    marginRight: -30,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  skewedImageWrapperRight: {
    transform: [{ rotate: '10deg' }],
    marginLeft: -30,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  skewedImage: {
    width: 120,
    height: 150,
    borderRadius: 20,
    resizeMode: 'cover',
  },
});

export default caregiverItsAmatch;
