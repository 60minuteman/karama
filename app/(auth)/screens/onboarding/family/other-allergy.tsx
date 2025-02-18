import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { TextInput } from 'react-native';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LinearGradient } from 'expo-linear-gradient';

export default function OtherAllergy() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: 'food' | 'environmental' | 'other' }>();
  const [allergy, setAllergy] = useState('');

  const getTitleText = () => {
    switch (type) {
      case 'food':
        return 'Add other food\nallergies';
      case 'environmental':
        return 'Add other\nenvironmental\nallergies';
      default:
        return 'Add other\nallergies';
    }
  };

  const handleAdd = () => {
    if (allergy.trim()) {
      // Handle adding the custom allergy
      router.back();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />
      
      <View style={styles.content}>
        <View style={styles.spacerTop} />
        <ProgressBar progress={0.3} />

        <ThemedText style={styles.title}>{getTitleText()}</ThemedText>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputCursor} />
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#999"
            value={allergy}
            onChangeText={setAllergy}
            autoFocus
          />
        </View>

        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.buttonGradient}
        >
          <View style={styles.buttonContainer}>
            <Button
              label="Add"
              onPress={handleAdd}
              variant="compact"
              disabled={!allergy.trim()}
            />
          </View>
        </LinearGradient>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  spacerTop: {
    height: 120,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#002140',
    marginBottom: 24,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  inputCursor: {
    width: 2,
    height: 24,
    backgroundColor: Colors.light.orange,
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 24,
    color: Colors.light.text,
    padding: 0,
  },
  buttonGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});