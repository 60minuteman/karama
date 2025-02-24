import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MessageHeader } from '@/components/messages/MessageHeader';
import { MessageInput } from '@/components/messages/MessageInput';
import { ChatBubble } from '@/components/messages/ChatBubble';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

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
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
    >
      <MessageHeader 
        name={name as string} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
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

      <View style={[styles.inputContainer]}>
        <MessageInput
          value={message}
          onChangeText={setMessage}
          onSend={handleSend}
        />
      </View>
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
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