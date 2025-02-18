import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface PillProps {
  label: string;
  icon?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Pill = ({ label, icon, style, onPress }: PillProps) => {
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
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: '#002140',
    fontFamily: 'Poppins',
  },
}); 