import { Colors } from '@/constants/Colors';
import useAuthMutation from '@/hooks/useAuthMutation';
import {
  useCurrentUser,
  useUserDevice,
  useUserDevices,
} from '@/services/api/api';
import customAxios from '@/services/api/envConfig';
import { useUserStore } from '@/services/state/user';
import { usePushNotifications } from '@/services/usePushNotifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  AppState,
  AppStateStatus,
  Image,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import { io } from 'socket.io-client';

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
};

const token = useUserStore.getState().token;
const user = useUserStore.getState().user;

export const socket = io('wss://starfish-app-7pbch.ondigitalocean.app', {
  path: '/chat',
  transports: ['websocket'],
  query: {
    userId: 'USER-01JR0M9P2Y16E7EQFJQY9Q9XSS',
  },
  auth: {
    token: `Bearer ${token}`,
  },
});

export default function TabsLayout() {
  const { data: userDevices } = useUserDevices();
  const [deviceId, setDeviceId] = useState(null);
  const { data: currentUser } = useCurrentUser();
  const { expoPushToken } = usePushNotifications();
  const { data: userDevice } = useUserDevice(deviceId);

  console.log('user devices', userDevice);

  async function getDeviceId() {
    let deviceId: any = await AsyncStorage.getItem('karama_id_device');
    const valt = deviceId;

    if (!deviceId) {
      deviceId = uuid.v4();
      await AsyncStorage.setItem('karama_id_device', deviceId);
    }
    return deviceId;
  }

  console.log('deviceId', !!deviceId, expoPushToken);

  useEffect(() => {
    const getDeviceId = async () => {
      let deviceId: any = await AsyncStorage.getItem('karama_id_device');
      setDeviceId(deviceId);
    };
    getDeviceId();
  }, []);

  const registerDevice: any = useAuthMutation({
    mutationFn: (data: any) => {
      return customAxios.post(`/notifications/devices/register`, data);
    },
    onSuccess: async (data: any) => {
      // console.log('token data success =====', data?.data);
      // console.log('end====');
    },
    onError: (error: any) => {
      // console.log('token error **********', error['response'].data);
      // Toast.show({
      //   type: 'problem',
      //   text1: error['response'].data.error,
      //   text2: error['response'].data.message,
      // });
    },
  });

  async function registerDeviceWithBackend(expoPushToken: any) {
    if (!expoPushToken) return;

    const device_id = await getDeviceId();

    const payload = {
      device_id: device_id,
      name: Device.modelName || 'Unknown Device',
      push_token: expoPushToken.data,
      type: 'PHONE',
      platform: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
      provider: 'EXPO',
    };
    registerDevice.mutate(payload);
  }

  useEffect(() => {
    if (currentUser && (!!deviceId == false || !userDevice) && expoPushToken) {
      registerDeviceWithBackend(expoPushToken);
    }
  }, [expoPushToken, currentUser, deviceId]);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          borderTopColor: '#F6F6F6',
          height: 92,
        },
        tabBarActiveTintColor: '#FF4B55',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontFamily: 'Poppins_400Regular',
          fontSize: 12,
          width: 'auto',
          flexWrap: 'nowrap',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'For You',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? navImages['active-You'] : navImages.You}
              style={{ width: 24, height: 24 }}
              resizeMode='contain'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='liked-you'
        options={{
          title: 'Liked you',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? navImages['active-Liked'] : navImages.Liked}
              style={{ width: 24, height: 24 }}
              resizeMode='contain'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='discover'
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused ? navImages['active-Discover'] : navImages.Discover
              }
              style={{ width: 24, height: 24 }}
              resizeMode='contain'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='matches'
        options={{
          title: 'Matches',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? navImages['active-Matches'] : navImages.Matches}
              style={{ width: 24, height: 24 }}
              resizeMode='contain'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='community'
        options={{
          title: 'Community',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused ? navImages['active-Community'] : navImages.Community
              }
              style={{ width: 24, height: 24 }}
              resizeMode='contain'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
