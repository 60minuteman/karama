import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Colors } from '@/constants/Colors';
import { useOtherStore } from '@/services/state/other';
import { useUserStore } from '@/services/state/user';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

export default function CustomInterestScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const [newInterest, setNewInterest] = useState('');

  const {
    addOtherSport,
    addOtherCreativeActivity,
    addOtherInstrument,
    addOtherStem,
  } = useOtherStore();

  useEffect(() => {
    setNewInterest('');
  }, []);

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    if (category === 'sport') {
      addOtherSport(newInterest.trim());
    }
    if (category === 'creative') {
      addOtherCreativeActivity(newInterest.trim());
    }
    if (category === 'instrument') {
      addOtherInstrument(newInterest.trim());
    }
    if (category === 'stem') {
      addOtherStem(newInterest.trim());
    }

    router.back();
  };
  console.log(newInterest, 'newInterest');
  

  return (
    <ThemedView style={styles.container}>
      <Header variant='back' />

      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <View style={styles.content}>
          <View style={styles.spacerTop} />

          <ThemedText style={styles.title}>
            Add other {`${category}`} activities
          </ThemedText>

          <View style={styles.inputContainer}>
            <View style={styles.inputCursor} />
            <TextInput
              style={styles.input}
              placeholder={`Enter your custom ${category} interest`}
              value={newInterest}
              onChangeText={setNewInterest}
              autoFocus
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              label='Add'
              onPress={handleAddInterest}
              variant='compact'
              disabled={!newInterest.trim()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
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
    fontFamily: 'Bogart-Semibold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.light.text,
    marginBottom: 40,
    fontWeight: '500',
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
    backgroundColor: Colors.light.primary,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 16,
    color: Colors.light.text,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
});
