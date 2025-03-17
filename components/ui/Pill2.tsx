import { ThemedText } from '@/components/ThemedText';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface Pill2Props {
  label: string;
  icon?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Pill2 = ({ label, icon, style, onPress }: Pill2Props) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={[styles.container, style]} onPress={onPress}>
      {icon && <ThemedText style={styles.icon}>{icon}</ThemedText>}
      <ThemedText style={styles.label}>{label}</ThemedText>
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F4F3F4',
    borderRadius: 100,
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 16,
    flexShrink: 0,
    maxWidth: '100%',
  },
  icon: {
    fontSize: 14,
    marginRight: 8,
    flexShrink: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});
