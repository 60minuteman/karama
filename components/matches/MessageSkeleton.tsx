import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const MessageScreenSkeleton = () => {
  // Create animation value for shimmer effect
  const shimmerAnimation = new Animated.Value(0);

  React.useEffect(() => {
    // Create shimmer animation
    const startShimmerAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startShimmerAnimation();
  }, []);

  const opacity = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.header}>
        <Animated.View style={[styles.backButton, { opacity }]} />
        <Animated.View style={[styles.avatar, { opacity }]} />
        <Animated.View style={[styles.nameContainer, { opacity }]} />
      </View>

      {/* Messages List Skeleton */}
      <View style={styles.messagesList}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={styles.messageRow}>
            <Animated.View
              style={[
                styles.messageBubble,
                index % 2 === 0 ? styles.rightBubble : styles.leftBubble,
                { opacity },
              ]}
            />
          </View>
        ))}
      </View>

      {/* Input Skeleton */}
      <View style={styles.inputContainer}>
        <Animated.View style={[styles.input, { opacity }]} />
        <Animated.View style={[styles.sendButton, { opacity }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 24,
    height: 24,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginLeft: 12,
  },
  nameContainer: {
    width: 120,
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginLeft: 12,
  },
  messagesList: {
    flex: 1,
    padding: 16,
  },
  messageRow: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  messageBubble: {
    width: '60%',
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    marginVertical: 4,
  },
  leftBubble: {
    alignSelf: 'flex-start',
  },
  rightBubble: {
    alignSelf: 'flex-end',
  },
  inputContainer: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginLeft: 12,
  },
});

export default MessageScreenSkeleton;
