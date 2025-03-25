import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MessageHeader } from '@/components/messages/MessageHeader';
import { MessageInput } from '@/components/messages/MessageInput';
import { ChatBubble } from '@/components/messages/ChatBubble';
import { ThemedText } from '@/components/ThemedText';
import { Container } from '@/components/home/Container';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  type: 'system' | 'sent' | 'received';
}

export default function MessageScreen() {
  const { name } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'profile'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Matched Sat, 17/10',
      timestamp: '',
      type: 'system'
    },
    {
      id: '2',
      text: 'You liked Ray\'s photo',
      timestamp: '',
      type: 'received'
    },
    {
      id: '3',
      text: 'Hello there 👋',
      timestamp: '11:10',
      type: 'received'
    },
    {
      id: '4',
      text: 'How are you doing today?',
      timestamp: '11:10',
      type: 'sent'
    }
  ]);

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
    disabilities: ['Dyslexia', 'ADHD']
  };

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        text: message,
        timestamp: new Date().toLocaleTimeString(),
        type: 'sent'
      }]);
      setMessage('');
    }
  };

  const handleBack = () => {
    router.push('/matches');
  };

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.type === 'system') {
      return (
        <View style={styles.systemContainer}>
          <ThemedText style={styles.systemText}>{item.text}</ThemedText>
        </View>
      );
    }
    return (
      <ChatBubble
        message={item.text}
        timestamp={item.timestamp}
        variant={item.type}
      />
    );
  };

  return (
    <View style={styles.container}>
      <MessageHeader 
        name={name as string} 
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
            { paddingBottom: 100 }
          ]}
        />
      ) : (
        <View style={{height: '80%'}}>
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
  }
}); 