import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

type OTPKeyboardProps = {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
};

export function OTPKeyboard({ onKeyPress, onDelete }: OTPKeyboardProps) {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'delete']
  ];

  return (
    <View style={styles.keyboard}>
      <ThemedText style={styles.phoneNumber}>352-745</ThemedText>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, keyIndex) => (
            <TouchableOpacity
              key={keyIndex}
              style={[
                styles.key,
                !key && styles.keyEmpty,
                key === 'delete' && styles.keyDelete
              ]}
              onPress={() => key === 'delete' ? onDelete() : key && onKeyPress(key)}
              disabled={!key}
            >
              {key === 'delete' ? (
                <ThemedText>✕</ThemedText>
              ) : (
                <View style={styles.keyContent}>
                  <ThemedText style={styles.keyNumber}>{key}</ThemedText>
                  {key && key !== '1' && key !== '0' && (
                    <ThemedText style={styles.keyLetters}>
                      {getLetters(key)}
                    </ThemedText>
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const getLetters = (key: string) => {
  const letters: { [key: string]: string } = {
    '2': 'ABC', '3': 'DEF', '4': 'GHI', '5': 'JKL',
    '6': 'MNO', '7': 'PQRS', '8': 'TUV', '9': 'WXYZ'
  };
  return letters[key] || '';
};

const styles = StyleSheet.create({
  keyboard: {
    backgroundColor: '#F2F2F2',
    paddingBottom: 34, // Safe area padding
    paddingTop: 12,
  },
  phoneNumber: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 12,
  },
  key: {
    width: '33%',
    alignItems: 'center',
    padding: 12,
  },
  keyEmpty: {
    opacity: 0,
  },
  keyDelete: {
    justifyContent: 'center',
  },
  keyContent: {
    alignItems: 'center',
  },
  keyNumber: {
    fontSize: 24,
    color: '#000',
  },
  keyLetters: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
});