import { ThemedText } from '@/components/ThemedText';
import { HomeNav } from '@/components/home/HomeNav';
import { ConversationItem } from '@/components/matches/ConversationItem';
import { EmptyMatches } from '@/components/matches/EmptyMatches';
import { MatchCircle } from '@/components/matches/MatchCircle';
import { SearchBar } from '@/components/matches/SearchBar';
import MatchesSkeleton from '@/components/matches/matchesSkeleton';
import {
  useCompletedMatches,
  useCompleteMatches,
  useCurrentUser,
} from '@/services/api/api';
import { useUserStore } from '@/services/state/user';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { io } from 'socket.io-client';

export default function Matches() {
  const [conversations, setConversations] = useState<any>([]);
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useCurrentUser();
  const { data: completeMatches, isLoading: isLoadingCompleteMatches } =
    useCompleteMatches(currentUser?.data?.role);
  const { token, user } = useUserStore();

  console.log('user_id from user object:', user?.user_id);

  const socket = io('wss://starfish-app-7pbch.ondigitalocean.app', {
    path: '/chat',
    transports: ['websocket'],
    query: {
      userId: `${user?.user_id}`,
      token: `${token}`,
    },
    auth: {
      token: `${token}`,
    },
  });

  useEffect(() => {
    socket.emit('getAllConversations');
  }, []);

  useEffect(() => {
    if (socket) {
      console.log('socket before', socket);
      socket.emit('getAllConversations');
      socket.on('allConversations', (data) => {
        console.log('allConversations', data);
        // setConversations(data?.eventEarnings);
      });
      socket.on('exception', (data) => {
        console.log('exception', data);
        // setConversations(data?.eventEarnings);
      });
      console.log('socket after');
    }
  }, [socket]);

  console.log(
    'lfnskanfs',
    completeMatches?.data?.matches,
    currentUser?.data?.role
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText style={styles.title}>Matches</ThemedText>
        {isLoadingCompleteMatches ? (
          <MatchesSkeleton />
        ) : (
          <>
            {completeMatches?.data?.matches?.length < 1 ? (
              <EmptyMatches />
            ) : (
              <>
                <SearchBar />
                <View style={styles.matchesScroll}>
                  {completeMatches?.data?.matches?.map(
                    (match: any, index: any) => (
                      <MatchCircle key={index} match={match} />
                    )
                  )}
                </View>
              </>
            )}
          </>
        )}
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
