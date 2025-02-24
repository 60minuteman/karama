import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MessageInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
};

export function MessageInput({ value, onChangeText, onSend }: MessageInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          value={value}
          onChangeText={onChangeText}
          multiline
        />
      </View>
      <TouchableOpacity 
        style={styles.sendButton}
        onPress={onSend}
      >
        <Ionicons name="send" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputContainer: {
    flex: 1,
    marginRight: 12,
    backgroundColor: '#F6F6F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    maxHeight: 200,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF5A5F',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 