import { useRouter } from 'expo-router';
import { StyleSheet, View, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { useOtherStore } from '@/services/state/other';
// import { useUserStore } from '@/services/state/user';


export default function OtherHouseholdResponsibilitiesScreen() {
  const router = useRouter();
  const [householdResponsibilities, setHouseholdResponsibilities] = useState('');
   const {addOtherHouseholdResponsibilities}  = useOtherStore()

   useEffect(() => {
    setHouseholdResponsibilities('');
   }, [])
   

  const handleAdd = () => {
    if (householdResponsibilities.trim()) {
      // Handle adding the Certification
      addOtherHouseholdResponsibilities(householdResponsibilities.trim())
      router.back();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header variant="back" />

      <View style={styles.content}>
        <View style={styles.spacerTop} />
        
        <ThemedText style={styles.title}>
          Add other household responsibilities
        </ThemedText>

        <View style={styles.inputContainer}>
          <View style={styles.inputCursor} />
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#999"
            value={householdResponsibilities}
            onChangeText={setHouseholdResponsibilities}
            autoFocus
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Add"
            onPress={handleAdd}
            variant="compact"
            disabled={!householdResponsibilities.trim()}
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
  }
});