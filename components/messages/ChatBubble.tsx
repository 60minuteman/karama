import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type ChatBubbleVariant = 'sent' | 'received' | 'system';

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  variant: ChatBubbleVariant;
  isRead?: boolean;
  isDelivered?: boolean;
}

export function ChatBubble({
  message,
  timestamp,
  variant,
  isRead,
  isDelivered,
}: ChatBubbleProps) {
  console.log('timestamp', timestamp);
  if (variant === 'system') {
    return (
      <View style={styles.systemContainer}>
        <ThemedText style={styles.systemDate}>{timestamp}</ThemedText>
        <View style={styles.systemBubble}>
          <ThemedText style={styles.systemText}>{message}</ThemedText>
        </View>
      </View>
    );
  }

  const isReceived = variant === 'received';

  const renderTicks = () => {
    if (!isReceived) {
      if (isRead) {
        return <Ionicons name='checkmark-done' size={16} color='#002140' />;
      } else if (isDelivered) {
        return <Ionicons name='checkmark' size={16} color='#002140' />;
      }
    }
    return null;
  };

  return (
    <View
      style={[
        styles.container,
        isReceived ? styles.receivedContainer : styles.sentContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isReceived ? styles.receivedBubble : styles.sentBubble,
        ]}
      >
        <ThemedText
          style={[
            styles.messageText,
            isReceived ? styles.receivedText : styles.sentText,
          ]}
        >
          {message}
        </ThemedText>
        <View style={styles.messageFooter}>
          <ThemedText
            style={[
              styles.timestamp,
              isReceived ? styles.receivedTimestamp : styles.sentTimestamp,
            ]}
          >
            {timestamp}
          </ThemedText>
          {renderTicks()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  sentContainer: {
    justifyContent: 'flex-end',
  },
  receivedContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
  },
  sentBubble: {
    backgroundColor: '#FF4B55',
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: '#EEEEEE',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: '#002140',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
  },
  sentTimestamp: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  receivedTimestamp: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  systemContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  systemDate: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 8,
  },
  systemBubble: {
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  systemText: {
    color: '#666666',
    fontSize: 14,
  },
});
