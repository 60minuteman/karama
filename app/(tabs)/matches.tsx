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
import React, { useCallback, useEffect, useState } from 'react';
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
  const [socketConnected, setSocketConnected] = useState(false);
  const [filteredMatches, setFilteredMatches] = useState<any>([]);
  const [deletedConversationId, setDeletedConversationId] = useState<any>(null);
  const queryClient = useQueryClient();
  
  // Get socket instance dynamically
  const getSocketInstance = useCallback(() => {
    return getSocket();
  }, [token, user?.user_id]);

  // console.log('filteredMatches', filteredMatches[0]?.match_made_at);

  // console.log(
  //   'conversations',
  //   currentUser?.data?.role,
  //   completeMatches?.data?.matches?.length
  //   // filteredMatches
  // );

  // Load cached data on mount
  useEffect(() => {
    const loadCachedData = async () => {
      try {
        const cachedConversations = await AsyncStorage.getItem(
          CACHE_KEYS.CONVERSATIONS
        );
        const cachedMatches = await AsyncStorage.getItem(CACHE_KEYS.MATCHES);

        if (cachedConversations) {
          const parsedConversations = JSON.parse(cachedConversations);
          setConversations(parsedConversations);
          // If we have cached conversations, set loading to false immediately
          if (parsedConversations.length > 0) {
            setIsLoading(false);
          }
        }
        if (cachedMatches) {
          setFilteredMatches(JSON.parse(cachedMatches));
        }
      } catch (error) {
        console.error('Error loading cached data:', error);
        setIsLoading(false); // Don't stay loading forever on cache error
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
    const socket = getSocketInstance();
    if (!socket) {
      console.error('Socket not available for delete operation');
      return;
    }

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
    const socket = getSocketInstance();
    
    if (socket && token && user?.user_id) {
      console.log('🔌 Setting up socket listeners for matches');
      
      // Set socket connected state
      socket.on('connect', () => {
        console.log('✅ Socket connected in matches');
        setSocketConnected(true);
        // Request conversations when socket connects
        socket.emit('getAllConversations');
      });

      socket.on('disconnect', () => {
        console.log('❌ Socket disconnected in matches');
        setSocketConnected(false);
      });

      socket.on('allConversations', (data: any) => {
        console.log('📥 Received all conversations:', data?.length);
        setIsLoading(false);
        setConversations(data || []);
        // Update React Query cache
        queryClient.setQueryData(['conversations'], data);
      });

      socket.on('exception', (data: any) => {
        console.error('❌ Socket exception:', data);
        setIsLoading(false);
        // Revert optimistic update on error
        if (deletedConversationId) {
          const originalConversations = conversations;
          setConversations(originalConversations);
        }
      });

      socket.on('conversationUpdated', (data: any) => {
        console.log('🔄 Conversation updated:', data);
        setIsLoading(false);
        setConversations((prevConversations: any[]) => {
          // Handle both single conversation and array of conversations
          const conversationsToUpdate = Array.isArray(data) ? data : [data];

          return prevConversations.map((conv) => {
            const updatedConv = conversationsToUpdate.find(
              (update: any) => update.id === conv.id
            );
            return updatedConv || conv;
          });
        });
      });

      // If socket is already connected, request conversations immediately
      if (socket.connected) {
        console.log('🚀 Socket already connected, requesting conversations');
        setSocketConnected(true);
        socket.emit('getAllConversations');
      }

      // Cleanup listeners on unmount
      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('allConversations');
        socket.off('exception');
        socket.off('conversationUpdated');
      };
    } else {
      console.warn('⚠️ Socket not available or user not authenticated');
      // If no socket available after reasonable time, stop loading
      const timeout = setTimeout(() => {
        if (conversations.length === 0) {
          setIsLoading(false);
        }
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [user?.user_id, token, queryClient, getSocketInstance]);

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
    const socket = getSocketInstance();
    if (socket) {
      socket.on('conversationDeleted', () => {
        setConversations(
          conversations.filter((conv: any) => conv.id !== deletedConversationId)
        );
        setDeletedConversationId(null);
      });

      return () => {
        socket.off('conversationDeleted');
      };
    }
  }, [conversations, deletedConversationId, getSocketInstance]);

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

  // console.log('filteredConversations', filteredConversations);

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
                            imageUrl={(() => {
                              // Determine which user is the "other" user
                              // Use user_id for current user comparison since that's the field name in the user object
                              const currentUserId =
                                currentUser?.data?.user_id ||
                                currentUser?.data?.id;
                              const otherUser =
                                currentUserId === conversation?.recipient?.id
                                  ? conversation?.creator
                                  : conversation?.recipient;

                              // For caregiver users, check if they have pictures array with profile picture
                              if (
                                otherUser?.pictures &&
                                Array.isArray(otherUser.pictures)
                              ) {
                                const profilePicture = otherUser.pictures.find(
                                  (pic: any) => pic.type === 'PROFILE_PICTURE'
                                );
                                return (
                                  profilePicture?.path ||
                                  otherUser?.image ||
                                  null
                                );
                              }

                              // For family users or users with direct image field
                              return otherUser?.image || null;
                            })()}
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
