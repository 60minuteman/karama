import { ThemedText } from '@/components/ThemedText';
import { HomeNav } from '@/components/home/HomeNav';
import { ConversationItem } from '@/components/matches/ConversationItem';
import { MatchCircle } from '@/components/matches/MatchCircle';
import { SearchBar } from '@/components/matches/SearchBar';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { EmptyMatches } from '@/components/matches/EmptyMatches';

export default function Matches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([]); // Changed to empty array by default

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

  const hasMatches = matches.length > 0;

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText style={styles.title}>Matches</ThemedText>

        {hasMatches ? (
          <>
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
          </>
        ) : (
          <EmptyMatches />
        )}
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
