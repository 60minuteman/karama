import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface SwipeOverlayProps {
  type: 'like' | 'skip';
  opacity: number;
}

export const SwipeOverlay: React.FC<SwipeOverlayProps> = ({ type, opacity }) => {
  const isLike = type === 'like';
  
  const overlayStyle = {
    opacity,
    backgroundColor: isLike ? 'rgba(76, 175, 80, 0.8)' : 'rgba(244, 67, 54, 0.8)',
  };

  const textStyle = {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
  };

  return (
    <Animated.View style={[styles.overlay, overlayStyle]}>
      <View style={styles.content}>
        <ThemedText style={textStyle}>
          {isLike ? '❤️ LIKE' : '✕ SKIP'}
        </ThemedText>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 