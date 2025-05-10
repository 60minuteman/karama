import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, TextInput, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/services/state/user';
import { useOtherStore } from '@/services/state/other';

type Category = 'Diet' | 'Rules' | 'Religion';

interface FamilySelections {
  diets?: string[];
  rules?: string[];
  religion?: string;
  other_diets?: string;
  other_rules?: string;
  other_religion?: string;
  show_diet_on_profile?: boolean;
  show_rules_on_profile?: boolean;
  show_religion_on_profile?: boolean;
}

export default function OtherDietScreen() {
  const router = useRouter();
  const [diet, setDiet] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
    const { category } = useLocalSearchParams();

    const {
      addOtherDiet,
      addOtherRule,
      addOtherReligion
    } = useOtherStore()
  
   

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  useEffect(() => {
    setDiet('');
  }, [])
  

   

  const handleAdd = () => {
    if (diet.trim()) {
      if (category === 'Diet') {
        // Handle adding the diet
        addOtherDiet(diet.trim())
      }
      if (category === 'Rules') {

        // Handle adding the rules
        addOtherRule(diet.trim())
      }
      if (category === 'Religion') {
        // Handle adding the religion
        addOtherReligion(diet.trim())
      }
      // Handle adding the diet
      router.back();

    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        
        <ThemedText style={styles.title}>
          Add other {category}
        </ThemedText>

        <View style={styles.inputContainer}>
          <View style={styles.inputCursor} />
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#999"
            value={diet}
            onChangeText={setDiet}
            autoFocus
          />
        </View>

        <View style={[styles.buttonContainer, { bottom: keyboardHeight + 20 }]}>
          <Button
            label="Add"
            onPress={handleAdd}
            variant="compact"
            disabled={!diet.trim()}
          />
        </View>
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
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 24,
    color: Colors.light.text,
    padding: 0,
  },
  buttonContainer: {
    position: 'absolute',
    right: 20,
  },
});