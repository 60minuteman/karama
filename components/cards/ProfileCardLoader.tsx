import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';

const ProfileCardLoader = () => {
  const { height: windowHeight } = useWindowDimensions();
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, 350],
  });

  return (
    <View style={styles.container}>
      <View
        style={[styles.image, { height: Math.min(windowHeight * 0.7, 700) }]}
      >
        <Animated.View
          style={[styles.shimmer, { transform: [{ translateX }] }]}
        >
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.3)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>

      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={styles.pronounsPlaceholder} />
          <View style={styles.ratingPlaceholder} />
        </View>
        <View style={styles.infoOverlay}>
          <View style={styles.infoContainer}>
            <View style={styles.namePlaceholder} />
            <View style={styles.rolePlaceholder} />
            <View style={styles.addressPlaceholder} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    position: 'relative',
    overflow: 'hidden',
  },
  shimmer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pronounsPlaceholder: {
    width: 80,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
  },
  ratingPlaceholder: {
    width: 60,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
  },
  infoOverlay: {
    padding: 12,
    borderRadius: 10,
  },
  infoContainer: {
    gap: 8,
    marginBottom: 120,
  },
  namePlaceholder: {
    width: 200,
    height: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
  },
  rolePlaceholder: {
    width: 150,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
  },
  addressPlaceholder: {
    width: 250,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
  },
});

export default ProfileCardLoader;
