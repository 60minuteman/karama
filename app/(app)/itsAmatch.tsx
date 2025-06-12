import { ThemedText } from '@/components/ThemedText';
import useAuthMutation from '@/hooks/useAuthMutation';
import customAxios from '@/services/api/envConfig';
import { useStore } from '@/services/state/State';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const ItsAmatch = () => {
  const { match_complete } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const createMessage: any = useAuthMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/chats`, data);
    },
    onSuccess: async (response: any) => {
      setIsLoading(false);
      router.push(
        `/messages/${response?.data?.data?.id}?name=${match_complete?.match?.caregiver_profile?.name}`
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
    setIsLoading(true);
    createMessage.mutate({
      recipientId: match_complete?.match?.caregiver_profile?.user?.user_id,
      // text: 'Hello',
    });
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
          <Image
            source={require('@/assets/images/matchpic.png')}
            style={styles.matchPhoto}
          />
          <Image
            source={require('@/assets/images/downlogoicon.png')}
            style={styles.rightPhoto}
          />
        </View>
      </View>

      {/* Text and Buttons below images */}
      <View style={styles.textAndButtonsContainer}>
        <Text style={styles.congrats}>Congratulations</Text>
        <Text style={styles.matchTitle}>It's a Match!!</Text>
        <Text style={styles.subText}>you have 24 hours to reach out!</Text>
        {/* <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Start a conversation</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.subscribeButton, { marginBottom: 16 }]}
          onPress={handleCreateRoom}
          disabled={isLoading}
        >
          <LinearGradient
            colors={['#EB4430', '#FF9900']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <ThemedText style={styles.buttonText}>
              {isLoading ? 'Creating...' : 'Start a conversation'}
            </ThemedText>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/discover')}>
          <Text style={styles.secondaryBtnText}>
            Not now ,{' '}
            <Text style={{ fontWeight: '400', color: '#261D2ACC' }}>
              I'll have a chat later
            </Text>
          </Text>
        </TouchableOpacity>
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
    fontFamily: 'Poppins',
  },
  subText: {
    color: '#261D2ACC',
    fontSize: 14,
    marginBottom: 10,
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
});

export default ItsAmatch;
