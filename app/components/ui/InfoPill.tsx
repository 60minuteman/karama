import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface InfoPillProps {
  icon: string;
  label: string;
}

const InfoPill = ({ icon, label }: InfoPillProps) => {
  return (
    <View style={styles.pill}>
      <ThemedText style={styles.icon}>{icon}</ThemedText>
      <ThemedText style={styles.label}>{label}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#261D2A0D',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  icon: {
    marginRight: 4,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    color: '#666666',
  },
});

export default InfoPill; 