import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

type PillProps = {
  icon?: string;
  label: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

export function Pill({ icon, label, selected = false, onPress, disabled = false }: PillProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.pill,
        selected && styles.pillSelected,
        disabled && styles.pillDisabled,
      ]}
    >
      {icon && (
        <ThemedText style={styles.icon}>{icon}</ThemedText>
      )}
      <ThemedText style={[
        styles.label,
        selected && styles.labelSelected,
      ]}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    gap: 8,
  },
  pillSelected: {
    backgroundColor: Colors.light.primary,
  },
  pillDisabled: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: '500',
  },
  labelSelected: {
    color: Colors.light.background,
  },
});