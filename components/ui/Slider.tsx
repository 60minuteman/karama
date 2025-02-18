import React, { useState, useEffect } from 'react';
import { View, PanResponder, StyleSheet, Animated, Text } from 'react-native';
import { Colors } from '@/constants/Colors';

interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  width?: number;
  height?: number;
  thumbSize?: number;
  trackColor?: string;
  thumbColor?: string;
  activeTrackColor?: string;
}

const Slider = ({
  min = 15,
  max = 45,
  value = 15,
  onValueChange,
  width = 300,
  height = 8,
  thumbSize = 20,
  trackColor = '#E2E8F0',
  thumbColor = '#FFFFFF',
  activeTrackColor = Colors.light.primary,
}: SliderProps) => {
  const [translateX] = useState(new Animated.Value(0));
  const [currentValue, setCurrentValue] = useState(value);

  // Update position when value prop changes
  useEffect(() => {
    const percentage = (value - min) / (max - min);
    const newPosition = percentage * (width - thumbSize);
    translateX.setValue(newPosition);
    setCurrentValue(value);
  }, [value, min, max, width, thumbSize]);
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      translateX.setOffset(translateX._value);
      translateX.setValue(0);
    },
    onPanResponderMove: (_, gestureState) => {
      const newValue = Math.max(0, Math.min(width - thumbSize, translateX._offset + gestureState.dx));
      translateX.setValue(gestureState.dx);
      
      if (onValueChange) {
        const percentage = newValue / (width - thumbSize);
        const actualValue = min + (max - min) * percentage;
        const roundedValue = Math.round(actualValue);
        setCurrentValue(roundedValue);
        onValueChange(roundedValue);
      }
    },
    onPanResponderRelease: () => {
      translateX.flattenOffset();
    }
  });

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.rangeLabels}>
        <Text style={styles.rangeText}>${min}</Text>
        <Text style={styles.rangeText}>${max}</Text>
      </View>
      <View
        style={[
          styles.track,
          {
            height,
            backgroundColor: trackColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.activeTrack,
            {
              width: translateX,
              height,
              backgroundColor: activeTrackColor,
            },
          ]}
        />
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            backgroundColor: thumbColor,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={[styles.valueContainer, { backgroundColor: Colors.light.primary }]}>
          <Text style={styles.valueText}>${currentValue}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 60,
    justifyContent: 'center',
  },
  track: {
    borderRadius: 4,
  },
  activeTrack: {
    position: 'absolute',
    left: 0,
    borderRadius: 4,
  },
  thumb: {
    position: 'absolute',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rangeText: {
    color: '#666',
    fontSize: 12,
  },
  valueContainer: {
    position: 'absolute',
    top: -24,
    left: '50%',
    transform: [{translateX: -20}],
    padding: 4,
    borderRadius: 4,
    width: 40,
    alignItems: 'center',
  },
  valueText: {
    color: '#FFF',
    fontSize: 12,
  }
});

export { Slider };