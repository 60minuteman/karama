import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
}

export const SearchBar = ({ value, onChangeText, onSearch }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
        <Image 
          source={require('@/assets/icons/search.png')}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#002140',
  },
  searchButton: {
    padding: 8,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: '#FF4B55',
  },
}); 