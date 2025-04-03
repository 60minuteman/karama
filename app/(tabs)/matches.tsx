import { ThemedText } from '@/components/ThemedText';
import { EmptyMatches } from '@/components/matches/EmptyMatches';
import { HomeNav } from '@/components/home/HomeNav';
import { ConversationItem } from '@/components/matches/ConversationItem';
import { MatchCircle } from '@/components/matches/MatchCircle';
import { SearchBar } from '@/components/matches/SearchBar';
import MatchesSkeleton from '@/components/matches/matchesSkeleton';
import { useCompletedMatches } from '@/services/api/api';
import { useCurrentUser } from '@/services/api/api';
import { useUserStore } from '@/services/state/user';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Matches() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText style={styles.title}>Matches</ThemedText>
        <EmptyMatches />
      </SafeAreaView>
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
    marginBottom: 12,
    marginTop: -28,
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
});
