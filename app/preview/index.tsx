import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function PreviewIndex() {
  const testScreens = [
    // Add your test screens here
    { name: 'discovery-ui', title: 'Discovery Screen UI', path: '/preview/discovery-ui' },
    // { name: 'splash-test', title: 'Splash Screen Test', path: '/preview/splash-test' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Preview Test Screens</ThemedText>
        <ThemedText style={styles.subtitle}>
          This directory is for testing components and screens in development
        </ThemedText>

        {testScreens.length > 0 ? (
          <View style={styles.screensList}>
            {testScreens.map((screen, index) => (
              <Link key={index} href={screen.path} asChild>
                <TouchableOpacity style={styles.screenButton}>
                  <ThemedText style={styles.screenButtonText}>
                    {screen.title}
                  </ThemedText>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>
              No test screens yet. Add them to the testScreens array above.
            </ThemedText>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#EB4430',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  screensList: {
    gap: 12,
  },
  screenButton: {
    backgroundColor: '#EB4430',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  screenButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
}); 