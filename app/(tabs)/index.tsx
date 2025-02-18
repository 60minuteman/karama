import { ThemedText } from '@/components/ThemedText';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HomeNav } from '@/components/home/HomeNav';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function ForYouScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeHeader />
        <View style={styles.content}>
          <ThemedText style={styles.title}>People who liked you</ThemedText>

          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>
              No one has liked you yet. Keep checking back!
            </ThemedText>
          </View>
        </View>
        {/* <HomeNav /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
    color: Colors.light.text,
    marginBottom: 32,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 48,
  },
  emptyText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    lineHeight: 28,
    color: Colors.light.text,
    textAlign: 'center',
    maxWidth: '70%',
  },
});
