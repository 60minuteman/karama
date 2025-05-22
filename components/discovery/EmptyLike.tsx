import { ThemedText } from '@/components/ThemedText';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View,  } from 'react-native';



const EmptyLikes = () => {
 
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/like-empty.png')}
          style={styles.image}
          resizeMode='contain'
        />
        <ThemedText style={styles.title}>
          Profiles that like you will appear here 
        </ThemedText>
        {/* <ThemedText style={styles.description}>
         Profiles that like you will appear here 
        </ThemedText> */}
      </View>
    </View>
  );
};

export default EmptyLikes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 243,
    height: 320,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold',
    color: '#002140',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 38,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
