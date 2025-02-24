import { ThemedText } from '@/components/ThemedText';
import { HomeNav } from '@/components/home/HomeNav';
import { ConversationItem } from '@/components/matches/ConversationItem';
import { MatchCircle } from '@/components/matches/MatchCircle';
import { SearchBar } from '@/components/matches/SearchBar';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Matches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [fontsLoaded] = useFonts({
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Array of pastel colors to use as placeholders
  const pastelColors = [
    'https://via.placeholder.com/150/FFB3BA/FFFFFF?text=', // Pastel pink
    'https://via.placeholder.com/150/BAFFC9/FFFFFF?text=', // Pastel green
    'https://via.placeholder.com/150/BAE1FF/FFFFFF?text=', // Pastel blue
    'https://via.placeholder.com/150/FFFFBA/FFFFFF?text=', // Pastel yellow
    'https://via.placeholder.com/150/FFB3FF/FFFFFF?text=', // Pastel purple
    'https://via.placeholder.com/150/FFD9BA/FFFFFF?text=', // Pastel orange
    'https://via.placeholder.com/150/E5CCFF/FFFFFF?text=', // Pastel lavender
  ];

  const matches = [
    {
      id: '1',
      imageUrl: pastelColors[0] + "W",
      name: "The Won's",
      lastMessage: 'We love your food art...',
      time: '11:04 AM',
    },
    {
      id: '2',
      imageUrl: pastelColors[1] + "SM",
      name: 'Sarah Miller',
      lastMessage: 'Are you available next week?',
      time: '10:45 AM',
    },
    {
      id: '3',
      imageUrl: pastelColors[2] + "JF",
      name: 'Johnson Family',
      lastMessage: 'Thanks for the great session yesterday!',
      time: '9:30 AM',
    },
    {
      id: '4',
      imageUrl: pastelColors[3] + "ET",
      name: 'Emma Thompson',
      lastMessage: 'The kids had so much fun...',
      time: 'Yesterday',
    },
    {
      id: '5',
      imageUrl: pastelColors[4] + "P",
      name: 'The Patels',
      lastMessage: 'See you on Saturday!',
      time: 'Yesterday',
    },
    {
      id: '6',
      imageUrl: pastelColors[5] + "MG",
      name: 'Maria Garcia',
      lastMessage: 'Perfect, that works for us',
      time: '2 days ago',
    },
    {
      id: '7',
      imageUrl: pastelColors[6] + "A",
      name: 'The Andersons',
      lastMessage: 'Looking forward to meeting you',
      time: '2 days ago',
    },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText style={styles.title}>Matches</ThemedText>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={() => {}}
        />

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Matches</ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.matchesScroll}
          >
            {matches.map((match) => (
              <MatchCircle
                key={match.id}
                imageUrl={match.imageUrl}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.conversationsHeader}>
            <ThemedText style={styles.sectionTitle}>Conversations</ThemedText>
            <ThemedText style={styles.filterText}>All</ThemedText>
          </View>

          <ScrollView>
            {matches.map((match) => (
              <ConversationItem
                key={match.id}
                imageUrl={match.imageUrl}
                name={match.name}
                lastMessage={match.lastMessage}
                time={match.time}
                onPress={() => router.push(`/messages/${match.id}?name=${match.name}`)}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
      {/* <HomeNav /> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold',
    lineHeight: 38,
    color: '#002140',
    marginTop: 16,
    marginLeft: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold',
    color: '#002140',
    marginLeft: 16,
    marginBottom: 12,
  },
  matchesScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  conversationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
});
