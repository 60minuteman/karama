import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const MatchesSkeleton = () => {
  const shimmerAnimation = new Animated.Value(0);

  React.useEffect(() => {
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
      {/* Title Skeleton */}
      <Animated.View style={[styles.title, { opacity }]} />

      {/* Search Bar Skeleton */}
      <Animated.View style={[styles.searchBar, { opacity }]} />

      {/* Matches Section */}
      <View style={styles.section}>
        <Animated.View style={[styles.sectionTitle, { opacity }]} />
        <View style={styles.matchesRow}>
          {[1, 2, 3, 4].map((_, index) => (
            <Animated.View
              key={index}
              style={[styles.matchCircle, { opacity }]}
            />
          ))}
        </View>
      </View>

      {/* Conversations Section */}
      <View style={styles.section}>
        <View style={styles.conversationsHeader}>
          <Animated.View style={[styles.sectionTitle, { opacity }]} />
          <Animated.View style={[styles.filterText, { opacity }]} />
        </View>

        {/* Conversation Items */}
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={styles.conversationItem}>
            <Animated.View style={[styles.avatar, { opacity }]} />
            <View style={styles.conversationContent}>
              <Animated.View style={[styles.namePlaceholder, { opacity }]} />
              <Animated.View style={[styles.messagePlaceholder, { opacity }]} />
            </View>
            <Animated.View style={[styles.timePlaceholder, { opacity }]} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingTop: 16,
  },
  title: {
    height: 38,
    width: 120,
    backgroundColor: '#E0E0E0',
    marginLeft: 16,
    borderRadius: 4,
    marginBottom: 24,
  },
  searchBar: {
    height: 48,
    marginHorizontal: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 24,
    marginBottom: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    height: 24,
    width: 100,
    backgroundColor: '#E0E0E0',
    marginLeft: 16,
    borderRadius: 4,
    marginBottom: 12,
  },
  matchesRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
  },
  matchCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E0E0E0',
  },
  conversationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
    marginBottom: 16,
  },
  filterText: {
    width: 32,
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0E0E0',
  },
  conversationContent: {
    flex: 1,
    marginLeft: 12,
  },
  namePlaceholder: {
    height: 20,
    width: '40%',
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 4,
  },
  messagePlaceholder: {
    height: 16,
    width: '60%',
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  timePlaceholder: {
    width: 48,
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default MatchesSkeleton;
