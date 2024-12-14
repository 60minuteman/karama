import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

type HeaderProps = {
  variant?: 'close' | 'back';
  onPress?: () => void;
};

export function Header({ variant = 'back', onPress }: HeaderProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handlePress} 
        style={styles.button}
        accessibilityLabel={variant === 'close' ? 'Close' : 'Go back'}
      >
        <ThemedText style={styles.icon}>
          {variant === 'close' ? '✕' : '←'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  button: {
    padding: 10, // Increased touch target
  },
  icon: {
    fontSize: 24,
    color: Colors.light.text,
  },
});