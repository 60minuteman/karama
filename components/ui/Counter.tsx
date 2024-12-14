import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

type CounterProps = {
  icon: string;
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  minValue?: number;
};

export function Counter({ 
  icon, 
  label, 
  value, 
  onIncrement, 
  onDecrement, 
  minValue = 0 
}: CounterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <ThemedText style={styles.icon}>{icon}</ThemedText>
        <ThemedText style={styles.label}>{label}</ThemedText>
      </View>
      
      <View style={styles.counterContainer}>
        <TouchableOpacity 
          style={[styles.button, value <= minValue && styles.buttonDisabled]} 
          onPress={onDecrement}
          disabled={value <= minValue}
        >
          <ThemedText style={styles.buttonText}>−</ThemedText>
        </TouchableOpacity>
        
        <ThemedText style={styles.value}>{value}</ThemedText>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={onIncrement}
        >
          <ThemedText style={styles.buttonText}>+</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    gap: 8,
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
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.light.text,
  },
  value: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: Colors.light.text,
    minWidth: 24,
    textAlign: 'center',
  },
});