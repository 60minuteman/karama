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
import { getSocket } from '../_layout';

export default function Matches() {
  const [conversations, setConversations] = useState<any>([]);
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useCurrentUser();
  const { data: completeMatches, isLoading: isLoadingCompleteMatches } =
    useCompleteMatches(currentUser?.data?.role);
  const { token, user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMatches, setFilteredMatches] = useState<any>([]);

  console.log('user_id from user object:', conversations);
  console.log('user_id from user completeMatches:', completeMatches?.data);
  const socket = getSocket();

  useEffect(() => {
    if (socket) {
      socket.emit('getAllConversations');
      // socket.emit('getChatHistory');
      socket.on('allConversations', (data) => {
        setIsLoading(false);
        setConversations(data);
        console.log('allConversations', data);
      });
      socket.on('exception', (data) => {
        setIsLoading(false);
        console.log('exception', data);
      });
      socket.on('newMessage conversationUpdated', (data: any) => {
        setIsLoading(false);
        console.log('newMessage===========', data);
        // setMessages(data);
      });
    }
  }, [user?.user_id, token, socket]);

  useEffect(() => {
    if (completeMatches?.data?.matches && conversations) {
      const conversationIds = conversations.map(
        (conv: any) => conv?.recipient?.id
      );
      console.log('conversationIds', conversationIds);
      const filtered = completeMatches?.data?.matches?.filter(
        (match: any) =>
          !conversationIds.includes(match?.caregiver_profile?.user?.user_id)
      );
      console.log('filtered', filtered);
      setFilteredMatches(filtered);
    }
  }, [completeMatches?.data?.matches, conversations]);

  console.log('lfnskanfs=========', filteredMatches);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText style={styles.title}>Matches</ThemedText>
        {isLoadingCompleteMatches || isLoading ? (
          <MatchesSkeleton />
        ) : (
          <>
            {filteredMatches?.length < 1 && conversations?.length < 1 ? (
              <EmptyMatches />
            ) : (
              <>
                <SearchBar
                  // value={searchQuery}
                  // onChangeText={setSearchQuery}
                  onSearch={() => {}}
                />
                {/* <SearchBar />
                <View style={styles.matchesScroll}>
                  {completeMatches?.data?.matches?.map(
                    (match: any, index: any) => (
                      <MatchCircle key={index} match={match} />
                    )
                  )}
                </View> */}

                {filteredMatches?.length > 0 && (
                  <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Matches</ThemedText>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.matchesScroll}
                    >
                      {filteredMatches?.map((match: any, index: any) => (
                        <MatchCircle key={index} match={match} />
                      ))}
                    </ScrollView>
                  </View>
                )}

                {conversations?.length > 0 && (
                  <View style={styles.section}>
                    <View style={styles.conversationsHeader}>
                      <ThemedText style={styles.sectionTitle}>
                        Conversations
                      </ThemedText>
                      <ThemedText style={styles.filterText}>All</ThemedText>
                    </View>

                    <ScrollView>
                      {conversations.map((conversation: any) => (
                        <ConversationItem
                          key={conversation.id}
                          imageUrl={conversation?.recipient?.image}
                          name={conversation?.recipient?.name}
                          otherUser={conversation?.recipient?.name}
                          lastMessage={conversation?.last_message?.text}
                          time={
                            conversation?.last_message?.timestamp
                              ? new Date(
                                  conversation?.last_message?.timestamp
                                ).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: 'numeric',
                                  hour12: true,
                                })
                              : ''
                          }
                          conversation={conversation}
                          onPress={() =>
                            router.push(
                              `/messages/${conversation.id}?name=${conversation?.recipient?.name}&recipientId=${conversation?.recipient?.id}&senderId=${conversation?.creator?.id}`
                            )
                          }
                        />
                      ))}
                    </ScrollView>
                  </View>
                )}
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
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
});
