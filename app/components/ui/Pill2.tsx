import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface Pill2Props {
  label: string;
  icon?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Pill2 = ({ label, icon, style, onPress }: Pill2Props) => {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component 
      style={[styles.container, style]}
      onPress={onPress}
    >
      {icon && (
        <ThemedText style={styles.icon}>{icon}</ThemedText>
      )}
      <ThemedText style={styles.label}>{label}</ThemedText>
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F3F4',
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
}); 