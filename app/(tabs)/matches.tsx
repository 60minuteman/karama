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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getSocket } from '../_layout';

const CACHE_KEYS = {
  CONVERSATIONS: '@matches_conversations',
  MATCHES: '@matches_data',
};

export default function Matches() {
  const [conversations, setConversations] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState<any>([]);
  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useCurrentUser();
  const { data: completeMatches, isLoading: isLoadingCompleteMatches } =
    useCompleteMatches(currentUser?.data?.role);
  const { token, user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMatches, setFilteredMatches] = useState<any>([]);
  const socket: any = getSocket();
  const [deletedConversationId, setDeletedConversationId] = useState<any>(null);
  const queryClient = useQueryClient();

  console.log('filteredMatches', filteredMatches[0]?.match_made_at);

  console.log(
    'conversations',
    currentUser?.data?.role,
    completeMatches?.data?.matches?.length
    // filteredMatches
  );

  // Load cached data on mount
  useEffect(() => {
    const loadCachedData = async () => {
      try {
        const cachedConversations = await AsyncStorage.getItem(
          CACHE_KEYS.CONVERSATIONS
        );
        const cachedMatches = await AsyncStorage.getItem(CACHE_KEYS.MATCHES);

        if (cachedConversations) {
          setConversations(JSON.parse(cachedConversations));
          setIsLoading(false); // Show cached data immediately
        }
        if (cachedMatches) {
          setFilteredMatches(JSON.parse(cachedMatches));
        }
      } catch (error) {
        console.error('Error loading cached data:', error);
      }
    };

    loadCachedData();
  }, []);

  // Cache data when it changes
  useEffect(() => {
    const cacheData = async () => {
      try {
        await AsyncStorage.setItem(
          CACHE_KEYS.CONVERSATIONS,
          JSON.stringify(conversations)
        );
        await AsyncStorage.setItem(
          CACHE_KEYS.MATCHES,
          JSON.stringify(filteredMatches)
        );
      } catch (error) {
        console.error('Error caching data:', error);
      }
    };

    if (conversations.length > 0 || filteredMatches.length > 0) {
      cacheData();
    }
  }, [conversations, filteredMatches]);

  const handleDeleteConversation: any = (id: any) => {
    // Optimistic update
    const updatedConversations = conversations.filter(
      (conv: any) => conv.id !== id
    );
    setConversations(updatedConversations);
    setDeletedConversationId(id);

    socket.emit('deleteConversation', {
      conversationId: id,
    });
  };

  useEffect(() => {
    if (socket) {
      socket.emit('getAllConversations');

      socket.on('allConversations', (data) => {
        setIsLoading(false);
        setConversations(data);
        // Update React Query cache
        queryClient.setQueryData(['conversations'], data);
      });

      socket.on('exception', (data) => {
        setIsLoading(false);
        // Revert optimistic update on error
        if (deletedConversationId) {
          const originalConversations = conversations;
          setConversations(originalConversations);
        }
      });

      // socket.on('conversationUpdated', (data: any) => {
      //   setIsLoading(false);
      //   // setMessages(data);
      // });

      socket.on('newMessage conversationUpdated', (data: any) => {
        setIsLoading(false);
        // Update React Query cache with new message
        queryClient.setQueryData(['conversations'], (oldData: any) => {
          if (!oldData) return data;
          return oldData.map((conv: any) =>
            conv.id === data.id
              ? { ...conv, last_message: data.last_message }
              : conv
          );
        });
      });
    }
  }, [user?.user_id, token, socket, queryClient]);

  useEffect(() => {
    if (completeMatches?.data?.matches && conversations) {
      const conversationIds = conversations.map(
        (conv: any) => conv?.recipient?.id
      );
      const filtered = completeMatches?.data?.matches?.filter(
        (match: any) =>
          !conversationIds.includes(match?.caregiver_profile?.user?.user_id)
      );
      setFilteredMatches(filtered);
    }
  }, [completeMatches?.data?.matches, conversations]);

  useEffect(() => {
    socket.on('conversationDeleted', () => {
      setConversations(
        conversations.filter((conv: any) => conv.id !== deletedConversationId)
      );
      setDeletedConversationId(null);
    });
  }, [socket]);

  // Add search effect
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter((conv: any) => {
        const searchTerm = searchQuery.toLowerCase();
        const recipientName = conv?.recipient?.name?.toLowerCase() || '';
        const lastMessage = conv?.last_message?.text?.toLowerCase() || '';

        return (
          recipientName.includes(searchTerm) || lastMessage.includes(searchTerm)
        );
      });
      setFilteredConversations(filtered);
    }
  }, [searchQuery, conversations]);

  const handleSearch = () => {
    Keyboard.dismiss();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedText style={styles.title}>Matches</ThemedText>
          {isLoadingCompleteMatches || (isLoading && !conversations.length) ? (
            <MatchesSkeleton />
          ) : (
            <>
              {filteredMatches?.length < 1 && conversations?.length < 1 ? (
                <EmptyMatches />
              ) : (
                <>
                  <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSearch={handleSearch}
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
                      <ThemedText style={styles.sectionTitle}>
                        Matches
                      </ThemedText>
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
                        {filteredConversations.map((conversation: any) => (
                          <ConversationItem
                            key={conversation.id}
                            handleDeleteConversation={handleDeleteConversation}
                            setDeletedConversationId={setDeletedConversationId}
                            imageUrl={conversation?.recipient?.image}
                            name={conversation?.recipient?.name}
                            otherUser={conversation?.recipient?.name}
                            lastMessage={conversation?.last_message?.text}
                            currentUser={currentUser?.data}
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
                                `/messages/${conversation.id}?name=${
                                  currentUser?.data?.name ===
                                  conversation?.recipient?.name
                                    ? conversation?.creator?.name
                                    : conversation?.recipient?.name
                                }&recipientId=${
                                  conversation?.recipient?.id
                                }&senderId=${conversation?.creator?.id}`
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
      </TouchableWithoutFeedback>
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
