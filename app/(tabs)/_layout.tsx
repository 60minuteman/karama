import { Colors } from '@/constants/Colors';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

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

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          borderTopColor: '#F6F6F6',
          height: 92,
          // marginHorizontal: 28,
          // paddingBottom: 32.5,
          // paddingTop: 24,
        },
        tabBarActiveTintColor: '#FF4B55',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontFamily: 'Poppins_400Regular',
          fontSize: 12,
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
          tabBarLabelStyle: {
            fontSize: 12, // Adjust size if needed
            width: 'auto', // Ensures the label takes its natural width
          },
          // tabBarItemStyle: {
          //   minWidth: 80, // Adjust the minimum width of the tab
          // },
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