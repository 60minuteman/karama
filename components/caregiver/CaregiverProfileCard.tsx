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

interface CaregiverProfileCardProps {
  familyName?: string;
  location?: string;
  salary?: string;
  familyType?: string;
  rating?: number;
  image?: string;
}

export const CaregiverProfileCard = ({
  familyName = 'Millers',
  location = 'Manhattan, New York',
  salary = '75,000/year',
  familyType = 'Dads',
  rating = 4.5,
  image = 'https://images.unsplash.com/photo-1561488111-5d800fd7089f?q=80&w=2574&auto=format&fit=crop',
}: CaregiverProfileCardProps) => {
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

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        onError={(error) => console.log('Image loading error:', error)}
      />

      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <View style={styles.familyTypeTag}>
              <ThemedText style={styles.familyTypeText}>{familyType}</ThemedText>
            </View>
            <View style={styles.ratingContainer}>
              <ThemedText style={styles.ratingText}>{rating}</ThemedText>
              <ThemedText style={styles.starIcon}>⭐</ThemedText>
            </View>
          </View>
          
          <View style={styles.infoContainer}>
            <ThemedText style={styles.familyName}>{familyName}</ThemedText>
            <View style={styles.locationContainer}>
              <ThemedText style={styles.locationIcon}>📍</ThemedText>
              <ThemedText style={styles.locationText}>{location}</ThemedText>
            </View>
            <View style={styles.salaryContainer}>
              <ThemedText style={styles.salaryIcon}>💰</ThemedText>
              <ThemedText style={styles.salaryText}>{salary}</ThemedText>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    height: 560, // Increased from 460 to 560
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  familyTypeTag: {
    backgroundColor: 'rgba(200, 200, 200, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  familyTypeText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginRight: 4,
  },
  starIcon: {
    fontSize: 16,
  },
  infoContainer: {
    marginTop: 'auto',
  },
  familyName: {
    fontSize: 28,
    lineHeight: 32,
    fontFamily: 'Bogart-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#FFFFFF',
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salaryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  salaryText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#FFFFFF',
  },
});