import React, { useEffect } from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';

const ProfileCardLoader = () => {
  const scaleValue = new Animated.Value(1);

  useEffect(() => {
    const pulsateAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    pulsateAnimation.start();

    return () => {
      pulsateAnimation.stop();
    };
  }, [scaleValue]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleValue }],
          },
        ]}
      >
        <Image
          source={require('@/assets/load.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 49,
    height: 61,
  },
});

export default ProfileCardLoader;
