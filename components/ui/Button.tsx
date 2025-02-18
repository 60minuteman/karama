import { StyleSheet, TouchableOpacity, View, ActivityIndicator, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

const BUTTON_WIDTH = 342;
const { width: screenWidth } = Dimensions.get('window');
const horizontalPadding = (screenWidth - BUTTON_WIDTH) / 2;

type ButtonVariant = 'primary' | 'compact' | 'skip';

interface ButtonProps {
  onPress: () => void;
  variant?: ButtonVariant;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({ 
  onPress, 
  variant = 'primary', 
  label, 
  disabled = false,
  loading = false,
  icon
}: ButtonProps) {
  const buttonVariant = disabled ? 'disabled' : variant;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        styles[buttonVariant],
        (variant === 'compact' || variant === 'skip') && styles.compactButton
      ]}
    >
      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        {loading ? (
          <ActivityIndicator color={variant === 'secondary' ? Colors.light.primary : Colors.light.white} />
        ) : (
          <ThemedText 
            style={[
              styles.label,
              styles[`${buttonVariant}Text`]
            ]}
          >
            {label}
          </ThemedText>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: BUTTON_WIDTH,
    height: 53,
    borderRadius: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactButton: {
    width: 'auto',
    height: 'auto',
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400', // Changed from 600 to 400 for regular weight
  },
  // Variants
  primary: {
    backgroundColor: Colors.light.primary,
  },
  primaryText: {
    color: Colors.light.white,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  secondaryText: {
    color: Colors.light.primary,
  },
  google: {
    backgroundColor: Colors.light.white,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleText: {
    color: Colors.light.text,
  },
  apple: {
    backgroundColor: Colors.light.black,
  },
  appleText: {
    color: Colors.light.white,
  },
  facebook: {
    backgroundColor: '#1877F2',
  },
  facebookText: {
    color: Colors.light.white,
  },
  phone: {
    backgroundColor: Colors.light.primary,
  },
  phoneText: {
    color: Colors.light.white,
  },
  disabled: {
    backgroundColor: '#E0E0E0',
  },
  disabledText: {
    color: '#A0A0A0',
  },
  compact: {
    backgroundColor: Colors.light.primary,
  },
  compactText: {
    color: Colors.light.white,
  },
  skip: {
    backgroundColor: '#F5F5F5',
  },
  skipText: {
    color: Colors.light.text,
  }
});