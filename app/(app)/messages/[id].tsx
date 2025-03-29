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
import { auth } from '@/services/firebase';
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

interface Message {
  id: string;
  text: string;
  timestamp: string;
  type: 'system' | 'sent' | 'received';
}

export default function MessageScreen() {
  const { name, otherUserId } = useLocalSearchParams();
  const { id } = useLocalSearchParams();
  console.log('name', name, 'id', id);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'profile'>('chat');
  const [otherUserData, setOtherUserData] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const firebaseUser = useUserStore((state) => state.firebaseCurrentUser);

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
        console.log('userData', userData);
        setOtherUserData(userData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOtherUserData();
  }, []);

  console.log('messages', messages);

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

  const handleSend = async () => {
    try {
      const currentUser = firebaseUser;
      if (!currentUser?.email) {
        throw new Error('No user email found');
      }
      const userId = await getUserIdByEmail(currentUser.email);
      if (!userId) {
        throw new Error('No user ID found');
      }
      const userData = await getUserDataById(userId);
      console.log(
        'userData',
        // userData,
        id,
        currentUserId,
        userData?.name,
        message.trim()
      );
      // setCurrentUserId(userId);
      await sendMessage(
        id as string,
        currentUserId,
        userData?.name,
        'https://example.com/avatar.jpg',
        message.trim()
      );
      setMessage('');
      console.log('message sent');
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error appropriately, e.g. show error message to user
    }
  };

  const handleBack = () => {
    router.push('/matches');
  };

  const renderMessage = ({ item }: { item: Message }) => {
    console.log('currentUserId sender', item?.senderId === currentUserId);
    console.log('item', item);
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
        timestamp={item?.createdAt?.seconds}
        variant={item?.senderId === currentUserId ? 'sent' : 'received'}
      />
    );
  };

  if (isLoading) {
    return <MessageScreenSkeleton />;
  }

  return (
    <View style={styles.container}>
      <MessageHeader
        name={otherUserData?.name}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={handleBack}
      />

      {activeTab === 'chat' ? (
        <FlatList<Message>
          style={styles.messagesList}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item: Message) => item.id}
          inverted={false}
          contentContainerStyle={[
            styles.messagesContent,
            { paddingBottom: 100 },
          ]}
        />
      ) : (
        <View style={{ height: '80%' }}>
          <Container profileData={profileData} />
        </View>
      )}

      {activeTab === 'chat' && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <View style={[styles.inputContainer]}>
            <MessageInput
              value={message}
              onChangeText={setMessage}
              onSend={handleSend}
            />
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 120,
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
