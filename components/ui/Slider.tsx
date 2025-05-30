import { Colors } from '@/constants/Colors';
import React, { useEffect, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
  const [currentValue, setCurrentValue] = useState(value);
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef<View>(null);
  const buttonSize = 32;
  const buttonGap = 8;

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  const handlePress = (event: any) => {
    if (!trackWidth) return;
    const { locationX } = event.nativeEvent;
    const percentage = Math.max(0, Math.min(1, locationX / trackWidth));
    const newValue = Math.round(min + (max - min) * percentage);
    setCurrentValue(newValue);
    onValueChange?.(newValue);
  };

  const handleIncrement = () => {
    if (currentValue < max) {
      const newValue = currentValue + 1;
      setCurrentValue(newValue);
      onValueChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (currentValue > min) {
      const newValue = currentValue - 1;
      setCurrentValue(newValue);
      onValueChange?.(newValue);
    }
  };

  const percentage = (currentValue - min) / (max - min);
  const thumbPosition = trackWidth ? percentage * (trackWidth - thumbSize) : 0;
  const activeTrackWidth = trackWidth ? thumbPosition + thumbSize / 2 : 0;

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.rangeLabels}>
        <Text style={styles.rangeText}>${min}</Text>
        <Text style={styles.rangeText}>${max}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={handleDecrement} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <View style={styles.trackContainer}>
          <View
            ref={trackRef}
            onLayout={handleTrackLayout}
            style={[
              styles.track,
              {
                height,
                backgroundColor: trackColor,
                width: '100%',
              },
            ]}
          >
            <View
              style={[
                styles.activeTrack,
                {
                  width: activeTrackWidth,
                  height,
                  backgroundColor: activeTrackColor,
                },
              ]}
            />
          </View>
          <TouchableOpacity
            onPress={handlePress}
            style={[
              styles.thumb,
              {
                width: thumbSize,
                height: thumbSize,
                backgroundColor: thumbColor,
                left: thumbPosition,
              },
            ]}
          >
            <View
              style={[
                styles.valueContainer,
                { backgroundColor: Colors.light.primary },
              ]}
            >
              <Text style={styles.valueText}>${currentValue}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleIncrement} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 60,
    justifyContent: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  trackContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    borderRadius: 4,
    overflow: 'hidden',
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
    transform: [{ translateX: -20 }],
    padding: 4,
    borderRadius: 4,
    width: 40,
    alignItems: 'center',
  },
  valueText: {
    color: '#FFF',
    fontSize: 12,
  },
});

export { Slider };
