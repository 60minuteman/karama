import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, Platform, useWindowDimensions } from 'react-native';
import { BlurView } from 'expo-blur';

interface FloatingButtonProps {
  icon: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  index?: number; // Add index prop to determine button position
}

export const FloatingButton = ({ 
  icon, 
  onPress, 
  style,
  index = 0 // Default to 0 if not provided
}: FloatingButtonProps) => {
  const { width: windowWidth } = useWindowDimensions();
  const buttonWidth = windowWidth - 48; // Full width minus left and right padding

  return (
    <TouchableOpacity 
      style={[
        styles.button,
        { width: buttonWidth },
        { bottom: 24 + (index * (60 + 10)) }, // Add spacing based on index
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <BlurView intensity={20} style={styles.blur}>
        {icon}
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    right: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  blur: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  }
}); 