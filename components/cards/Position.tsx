import { Image } from '@/components/cards/Image';
import { ThemedText } from '@/components/ThemedText';
import { useFonts } from '@expo-google-fonts/poppins';
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { PastPosition } from './PastPosition';

interface PositionProps {
  positions?: Array<any>;
  data: any;
}

export const Position = ({
  positions = [
    { name: 'Willson', onPress: () => {} },
    { name: 'Johnsons', onPress: () => {} },
  ],
  data,
}: PositionProps) => {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  let [fontsLoaded] = useFonts({
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf'),
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf'),
  });
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 768;
  const containerWidth = Math.min(windowWidth * 0.9, 500);
  const [position, setPosition] = useState(null);

  if (!fontsLoaded) {
    return null;
  }
  const dynamicStyles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      backgroundColor: '#F6F6F6',
      borderRadius: 20,
      overflow: 'hidden',
      width: containerWidth,
      height: isLargeScreen ? windowWidth * 0.8 : 'auto',
    },
    profileCardContainer: {
      width: '100%',
      height: isLargeScreen ? '100%' : 'auto',
    },
    componentContainer: {
      width: '100%',
      padding: containerWidth * 0.02, // Responsive padding
      backgroundColor: '#ECEBEC',
      borderRadius: 10,
      marginBottom: containerWidth * 0.03,
    },
  });

  const pastPositions = data?.past_positions || [];

  return (
    <View style={styles.container}>
      <View style={[dynamicStyles.componentContainer, styles.imageContainer]}>
        <Image
          data={data?.pictures?.[3]?.path}
          resizeMode='cover'
          resizeMethod='scale'
        />
      </View>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>My Past positions</ThemedText>
        <ThemedText style={styles.subtitle}>Tap to view</ThemedText>

        <View style={styles.positionsContainer}>
          {pastPositions.map((position: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={styles.positionButton}
              onPress={() => {
                setSelectedPosition(position);
                setPosition(index);
                // position.onPress();
              }}
            >
              <ThemedText style={styles.positionText}>
                {position?.family_or_business_name}
              </ThemedText>
              <ThemedText style={styles.arrow}>→</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {selectedPosition && (
          <View style={styles.pastPositionContainer}>
            <PastPosition positionName={selectedPosition} position={position} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
  section: {
    // marginTop: 24,
    padding: 16,

    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular',
    color: '#261D2A',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular',
    color: 'rgba(38, 29, 42, 0.4)',
    marginBottom: 16,
  },
  positionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  positionButton: {
    backgroundColor: '#052222',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  positionText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular',
    color: '#FFFFFF',
  },
  arrow: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular',
    color: '#FFFFFF',
  },
  pastPositionContainer: {
    marginTop: 16,
  },
  imageContainer: {
    padding: 0,
    overflow: 'hidden',
  },
});
