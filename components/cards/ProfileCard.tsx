import { ThemedText } from '@/components/ThemedText';
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

interface ProfileCardProps {
  name: string;
  age: number;
  address: string;
  pronouns: string;
  rating: number;
  role: string;
  data: {
    profilePicture?: string;
    pictures?: string[];
    caregiver_profile?: {
      pictures?: Array<{ path: string; type: string }>;
    };
    family_profile?: {
      pictures?: Array<{ path: string; type: string }>;
    };
  };
}

export const ProfileCard = ({
  name,
  age,
  address = '123 Lain St, New York, NY',
  pronouns,
  rating,
  role,
  data,
}: ProfileCardProps) => {
  const { height: windowHeight } = useWindowDimensions();
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf'),
  });

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  // Get profile picture with fallback
  const imageSource = data.profilePicture
    ? { uri: data.profilePicture }
    : require('@/assets/icons/fallback.png');

  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={[styles.image, { height: Math.min(windowHeight * 0.7, 700) }]}
        onError={(error) => console.log('Image loading error:', error)}
      />

      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <View style={styles.pronounsContainer}>
              <ThemedText style={styles.pronouns}>{pronouns || ''}</ThemedText>
            </View>
            <View style={styles.ratingContainer}>
              <ThemedText style={styles.rating}>{rating || 0}</ThemedText>
              <ThemedText style={styles.star}>⭐</ThemedText>
            </View>
          </View>
          <View style={styles.infoOverlay}>
            <View style={styles.infoContainer}>
              <ThemedText style={styles.nameAge}>
                {name || 'Anonymous'}, {age || '?'}
              </ThemedText>
              <ThemedText style={styles.role}>
                {role || 'Role not specified'}
              </ThemedText>
              {/* <ThemedText style={styles.address}>{address}</ThemedText> */}
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
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
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pronounsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pronouns: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  rating: {
    fontSize: 14,
    marginRight: 4,
    fontFamily: 'Poppins-Regular',
  },
  star: {
    fontSize: 14,
  },
  infoOverlay: {
    padding: 12,
    borderRadius: 10,
  },
  infoContainer: {
    gap: 4,
    marginBottom: 120,
  },
  nameAge: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold',
    color: '#FFFFFF',
    lineHeight: 38,
  },
  role: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Bogart-Regular',
  },
  address: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Bogart-Regular',
  },
});
