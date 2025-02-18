import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { PastPosition } from './PastPosition';
import { useFonts } from '@expo-google-fonts/poppins';

interface PositionProps {
  positions?: Array<{
    name: string;
    onPress: () => void;
  }>;
}

export const Position = ({
  positions = [
    { name: 'Willson', onPress: () => {} },
    { name: 'Johnsons', onPress: () => {} },
  ]
}: PositionProps) => {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  
  let [fontsLoaded] = useFonts({
    'Bogart-Regular': require('@/assets/fonts/bogart/Bogart-Regular-trial.ttf'),
    'Bogart-Bold': require('@/assets/fonts/bogart/bogart-bold.otf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>My Past positions</ThemedText>
        <ThemedText style={styles.subtitle}>Tap to view</ThemedText>
        
        <View style={styles.positionsContainer}>
          {positions.map((position, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.positionButton}
              onPress={() => {
                setSelectedPosition(selectedPosition === position.name ? null : position.name);
                position.onPress();
              }}
            >
              <ThemedText style={styles.positionText}>
                {position.name}
              </ThemedText>
              <ThemedText style={styles.arrow}>→</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {selectedPosition && (
          <View style={styles.pastPositionContainer}>
            <PastPosition positionName={selectedPosition} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginTop: 24,
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
  }
});