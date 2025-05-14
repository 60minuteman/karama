import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ItsAMatch = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View >
        <View style={styles.photoWrapper}>
          <Image source={require('@/assets/images/uplogoicon.png')} style={styles.logoTop} resizeMode='contain' />
          <View style={styles.photoContainer}>
            <Image source={require('@/assets/images/matchpic.png')} style={styles.photo} resizeMode='contain'/>
          </View>
          <Image source={require('@/assets/images/downlogoicon.png')} style={styles.logoBottom} resizeMode='contain' />
        </View>

        <Text style={styles.matchText}>It's a Match!</Text>
        <Text style={styles.subText}>The Clarks have 24 hours to reach out!</Text>

        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Go to Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.keepSearchingButton}>
          <Text style={styles.keepSearchingText}>Keep Searching</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ItsAMatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F0',
    padding: 16,
  },
  header: {
    height: 44,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoWrapper: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  photoContainer: {
    width: 280,
    height: 280,
    borderRadius: 20,
    paddingTop: 20,
    // overflow: 'hidden',
    // elevation: 5,
  },
  photo: {
    width: 300,
    height: 400,
    // borderRadius: 20,
  },
  logoTop: {
    position: 'absolute',
    top: -10,
    width: 200,
    left: -38,
    height: 200,
  },
  logoBottom: {
    position: 'absolute',
    bottom: -80,
    right: -38,
    width: 150,
    height: 150,
  },
  matchText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  messageButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginBottom: 12,
  },
  messageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  keepSearchingButton: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  keepSearchingText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
