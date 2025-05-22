import { getSocket } from '@/app/_layout';
import { Container } from '@/components/home/Container';
import MessageScreenSkeleton from '@/components/matches/MessageSkeleton';
import { ChatBubble } from '@/components/messages/ChatBubble';
import { MessageHeader } from '@/components/messages/MessageHeader';
import { MessageInput } from '@/components/messages/MessageInput';
import { ThemedText } from '@/components/ThemedText';
import {
  getChatMessages,
  getUserDataById,
  getUserIdByEmail,
  sendMessage,
} from '@/services/chat';
import { useUserStore } from '@/services/state/user';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { io } from 'socket.io-client';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  type: 'system' | 'sent' | 'received';
}

export default function MessageScreen() {
  const { name, recipientId, senderId } = useLocalSearchParams();
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'profile'>('chat');
  const [otherUserData, setOtherUserData] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const firebaseUser = useUserStore((state) => state.firebaseCurrentUser);
  const { token, user } = useUserStore();
  const socket: any = getSocket();

  const [profile, setProfile] = useState<any>();

  // console.log('messages', messages);
  console.log('profile', profile);

  useEffect(() => {
    const fetchOtherUserData = async () => {
      setIsLoading(true);
      try {
        const userData = await getUserDataById(name as string);
        const currentUser = firebaseUser;
        if (!currentUser?.email) {
          throw new Error('No user email found');
        }
        const userId = await getUserIdByEmail(currentUser?.email);
        if (userId) {
          setCurrentUserId(userId);
        }
        setOtherUserData(userData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOtherUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = getChatMessages(id as string, setMessages);
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    }; // Cleanup listener on unmount
  }, [id]);

  // Mock profile data to pass to Container component
  const profileData = {
    image: 'URL_TO_PROFILE_IMAGE',
    name: name as string,
    age: 26,
    role: '🧢 Caregiver/Household Manager',
    location: 'Manhattan, New York',
    address: '📍 Manhattan, New York',
    pronouns: 'She/Her',
    rating: 4.5,
    experience: ['School Age', 'Toddler', 'Pre Schooler'],
    lookingFor: ['Full Time', 'Long Term', 'Live In'],
    hourlyRate: '$20 - $35',
    languages: ['English', 'Spanish'],
    interests: ['Dance', 'DIY', 'Magic'],
    obsession: 'Chickens! The kids love them.',
    religion: 'Buddhism',
    personality: ['Chill', 'Patient', 'Wacky'],
    disabilities: ['Dyslexia', 'ADHD'],
  };

  const handleBack = () => {
    router.back();
  };

  const handleSendMessage: any = () => {
    socket.emit('sendMessage', {
      conversationId: id,
      text: message,
    });
    setMessage('');
  };

  const handleClearMessages: any = () => {
    socket.emit('clearAllMessages', {
      conversationId: id,
    });
  };

  const handleBlockUser: any = () => {
    socket.emit('blockUser', {
      recipientId: recipientId,
    });
  };

  console.log('messages', messages[0]?.text);

  useEffect(() => {
    socket.emit('getChatHistory', {
      conversationId: id,
    });
  }, []);
  useEffect(() => {
    socket.emit('getProfile', {
      conversationId: id,
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('chatHistory', (data: any) => {
        const filteredMessages = data?.messages.filter(
          (message: any) => message.text !== null && message.text !== undefined
        );
        setMessages(filteredMessages);
        setIsLoading(false);
      });

      socket.on('newMessage conversationUpdated', (data: any) => {
        // console.log('newMessage=++++++++++++', data?.sender?.user_id);
        // setMessages(data);
      });

      socket.on('exception', (data: any) => {
        // console.log('exception', data);
      });
    }
  }, [socket]);

  useEffect(() => {
    socket.on('newMessage', (data: any) => {
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some((msg) => msg.id === data.id);
        if (!messageExists) {
          return [data, ...prevMessages];
        }
        return prevMessages;
      });
    });
  }, [socket]);

  useEffect(() => {
    socket.on('allMessagesCleared', (data: any) => {
      setMessages([]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('recipientProfile', (data: any) => {
      setProfile(data);
    });
  }, []);

  useEffect(() => {
    socket.on('userBlocked', (data: any) => {
      // setMessages([]);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User has been blocked successfully.',
      });
    });
  }, [socket]);

  // console.log('messages=====+++++++', messages);

  const renderMessage = ({ item }: { item: Message }) => {
    // console.log('item++++++++++++', item?.sender?.id || item?.sender?.user_id);
    if (item.senderId === 'system') {
      return (
        <View style={styles.systemContainer}>
          <ThemedText style={styles.systemText}>{item.text}</ThemedText>
        </View>
      );
    }
    return (
      <ChatBubble
        message={item.text}
        timestamp={
          item?.created_at
            ? new Date(item.created_at).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
            : ''
        }
        variant={
          item?.sender?.user_id === user?.user_id ||
          item?.sender?.id === user?.user_id
            ? 'sent'
            : 'received'
        }
      />
    );
  };

  if (isLoading) {
    return <MessageScreenSkeleton />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <MessageHeader
        name={name}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={handleBack}
        handleClearMessages={handleClearMessages}
        handleBlockUser={handleBlockUser}
      />

      {activeTab === 'chat' ? (
        <View style={styles.chatContainer}>
          <FlatList<Message>
            style={styles.messagesList}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item: Message) => item.id}
            inverted={true}
            contentContainerStyle={styles.messagesContent}
          />
          <View style={styles.inputContainer}>
            <MessageInput
              value={message}
              onChangeText={setMessage}
              onSend={handleSendMessage}
            />
          </View>
        </View>
      ) : (
        <View style={{ height: '80%', display: 'flex', alignItems: 'center' }}>
          {/* <Container profileData={profile} data={profile} /> */}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingTop: 16,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    width: '100%',
  },
  systemContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  systemText: {
    fontSize: 14,
    color: '#999999',
  },
});
