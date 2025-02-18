import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HomeNav } from '@/components/home/HomeNav';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

export default function Community() {
  const router = useRouter();
  const messages = []; // This would be populated with actual messages

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.isMine ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <ThemedText style={styles.messageText}>{item.text}</ThemedText>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeHeader />
        <View style={styles.content}>
          <ThemedText style={styles.title}>Community Chat</ThemedText>

          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <ThemedText style={styles.emptyText}>
                No messages yet. Start a conversation!
              </ThemedText>
            </View>
          ) : (
            <FlatList
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.messageList}
            />
          )}
        </View>
        {/* <HomeNav /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
    color: Colors.light.text,
    marginBottom: 24,
  },
  messageList: {
    paddingVertical: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  myMessage: {
    backgroundColor: Colors.light.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    backgroundColor: Colors.light.gray,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 48,
  },
  emptyText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    lineHeight: 28,
    color: Colors.light.text,
    textAlign: 'center',
    maxWidth: '70%',
  },
});
