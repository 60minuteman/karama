import SkipIcon from '@/assets/icons/Skip.svg';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SkipProps {
  onReviewSkipped: () => void;
}

const Skip = ({ onReviewSkipped }: SkipProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <SkipIcon width={180} height={180} />
      </View>
      <Text style={styles.mainText}>
        You've seen everyone who fits your preference, but new people join
        everyday
      </Text>
      <TouchableOpacity style={styles.button} onPress={onReviewSkipped}>
        <Text style={styles.buttonText}>Review skipped profiles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 24,
  },
  iconWrapper: {
    marginBottom: 24,
    marginTop: 24,
  },
  mainText: {
    fontSize: 17,
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '400',
  },
  button: {
    backgroundColor: '#F5F5F5',
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F24E1E',
    fontSize: 17,
    fontWeight: '400',
  },
});

export default Skip;
