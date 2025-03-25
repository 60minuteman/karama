import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={[styles.title, { fontFamily: 'Bogart-Bold' }]}>
          This Screen is not available yet!
        </ThemedText>
        <ThemedText type="title" style={[styles.subtitle, { fontFamily: 'Bogart-Medium' }]}>
          We're working hard to bring you this feature soon.
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link" style={[styles.linkText, { fontFamily: 'Bogart-Medium' }]}>
            Return to Home
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 32,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Bogart-Bold',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  link: {
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: '#FF6B6B',
    borderRadius: 30,
  },
  linkText: {
    color: '#FFF',
    fontSize: 16,
  },
});
