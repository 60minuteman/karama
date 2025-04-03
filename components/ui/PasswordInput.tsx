import { ThemedText } from '@/components/ThemedText';
import { TextInput } from '@/components/ui/TextInput';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PasswordInputProps {
  password: string;
  onChangePassword: (value: string) => void;
  autoFocus?: boolean;
}

export const PasswordInput = ({
  password,
  onChangePassword,
  autoFocus = false
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasNoSpaces = !/\s/.test(password);
  const hasMinLength = password.length >= 8;

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <View style={[styles.inputContainer, styles.inputActive]}>
          <TextInput
            style={[styles.input, { marginTop: 0 }]}
            placeholder='Password'
            placeholderTextColor='#261D2A4D'
            autoFocus={autoFocus}
            value={password}
            onChangeText={onChangePassword}
            accessibilityLabel='password input'
            accessibilityHint='enter your password'
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color={Colors.light.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ThemedText style={styles.subtitle}>
        Password must contain at least:
      </ThemedText>
      <View style={styles.requirementsList}>
        <ThemedText style={[
          styles.requirement,
          hasMinLength && styles.requirementMet
        ]}>
          • 8 characters
        </ThemedText>
        <ThemedText style={[
          styles.requirement,
          hasUpperCase && styles.requirementMet
        ]}>
          • 1 uppercase letter
        </ThemedText>
        <ThemedText style={[
          styles.requirement,
          hasNumber && styles.requirementMet
        ]}>
          • 1 number
        </ThemedText>
        <ThemedText style={[
          styles.requirement,
          hasNoSpaces && styles.requirementMet
        ]}>
          • No spaces
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 40,
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.primary,
    marginTop: 22,
    height: 58,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 24,
    paddingVertical: 8,
    color: '#000000',
    lineHeight: 32,
  },
  inputActive: {
    borderBottomColor: Colors.light.primary,
    borderBottomWidth: 2,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 8,
  },
  requirementsList: {
    marginBottom: 24,
  },
  requirement: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.7,
    marginBottom: 4,
  },
  requirementMet: {
    color: Colors.light.primary,
    opacity: 1,
  },
  eyeIcon: {
    padding: 8,
    position: 'absolute',
    right: 0,
  }
});