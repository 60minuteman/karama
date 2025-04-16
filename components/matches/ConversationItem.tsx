import { ThemedText } from '@/components/ThemedText';
import { getUserById, getUserDataById } from '@/services/chat';
import { useUserStore } from '@/services/state/user';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { io } from 'socket.io-client';

type ConversationItemProps = {
  imageUrl: string;
  name: string;
  lastMessage: string;
  time: string;
  onPress: () => void;
  otherUser: any;
  conversation: any;
};

export function ConversationItem({
  imageUrl,
  name,
  lastMessage,
  time,
  onPress,
  otherUser,
  conversation,
}: ConversationItemProps) {
  const [otherUserData, setOtherUserData] = useState<any>(null);
  const { token, user } = useUserStore();
  const [chatHistory, setChatHistory] = useState<any>([]);

  useEffect(() => {
    const fetchOtherUserData = async () => {
      const userData = await getUserDataById(otherUser);
      setOtherUserData(userData);
    };
    fetchOtherUserData();
  }, []);

  const renderRightActions = () => {
    return (
      <View style={styles.rightActions}>
        <TouchableOpacity style={[styles.action, styles.removeAction]}>
          <Ionicons name='close' size={24} color='#fff' />
          <Text style={styles.actionText}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.action, styles.hideAction]}>
          <Ionicons name='eye-off' size={24} color='#fff' />
          <Text style={styles.actionText}>Hide</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.action, styles.metAction]}>
          <Ionicons name='people' size={24} color='#fff' />
          <Text style={styles.actionText}>We Met</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Swipeable
        renderRightActions={renderRightActions}
        overshootRight={false}
        enabled={true}
        onSwipeableOpen={() => {}}
        onSwipeableClose={() => {}}
      >
        <View style={styles.container}>
          <Image source={{ uri: imageUrl }} style={styles.avatar} />
          <TouchableOpacity
            onPress={onPress}
            style={styles.touchableContent}
            activeOpacity={0.7}
          >
            <View style={styles.content}>
              <View style={styles.header}>
                <ThemedText style={styles.name}>
                  {conversation?.recipient?.name}
                </ThemedText>
                <ThemedText style={styles.time}>{time}</ThemedText>
              </View>
              <ThemedText style={styles.message} numberOfLines={1}>
                {lastMessage || 'No message yet'}
              </ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
      <View style={styles.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingLeft: 16,
  },
  touchableContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    paddingLeft: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#002333',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#002140',
  },
  time: {
    fontSize: 12,
    color: '#666666',
  },
  message: {
    fontSize: 14,
    color: '#666666',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: '100%',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
  },
  removeAction: {
    backgroundColor: '#FF4B55',
  },
  hideAction: {
    backgroundColor: '#999999',
  },
  metAction: {
    backgroundColor: '#002140',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginLeft: 76, // avatar width (48) + left padding (16) + additional space (12)
  },
});
