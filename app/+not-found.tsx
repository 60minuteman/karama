import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <LinearGradient
        colors={['#FF6B6B', '#FFA07A']}
        style={styles.gradient}
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            Amina, This screen doesn't exist yet!
          </ThemedText>
          <ThemedText type="body" style={styles.joke}>
            Why don't programmers like nature? It has too many bugs!
          </ThemedText>
          <Link href="/" style={styles.link}>
            <ThemedText type="link" style={styles.linkText}>
              Go to home screen!
            </ThemedText>
          </Link>
        </ThemedView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  joke: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#FF6B6B',
    borderRadius: 5,
  },
  linkText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
