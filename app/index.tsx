import { Redirect } from 'expo-router';
import { useOnboarding } from '@/hooks/useOnboarding';
import { View, StyleSheet } from 'react-native';

export default function InitialScreen() {
  const { isFirstLaunch } = useOnboarding();

  if (isFirstLaunch) {
    return (
      <View style={styles.container}>
        <Redirect href="/(auth)/onboarding" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Redirect href="/(auth)/auth" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
});