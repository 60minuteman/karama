import { View, StyleSheet } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';

interface InfoPillProps {
  icon?: string;
  label: string;
  count?: number;
  locked?: boolean;
}

const InfoPill = ({ icon, label, count }: InfoPillProps) => {
  return (
    <View style={styles.view}>
      {icon && (
        <ThemedText style={styles.icon}>{icon}</ThemedText>
      )}
      <ThemedText
        style={[styles.label]}
        numberOfLines={2}
      >
        {label}
      </ThemedText>
      {count && (
        <View style={styles.count}>
          <ThemedText style={styles.countText}>{count}</ThemedText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(38, 29, 42, 0.05)',
    minHeight: 38,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 28,
    gap: 8,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#052222',
    fontWeight: '400',
    flexShrink: 1,
  },
  view: {
    backgroundColor: '#261D2A0D',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 38,
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderRadius: 100,
    gap: 8,
    alignSelf: 'flex-start', // Makes the view hug its content
  },
  count: {
    borderRadius: 50,
    width: 24,
    height: 24,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FFFFFF',
  },
  countText: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 15,
  },
});

export default InfoPill;