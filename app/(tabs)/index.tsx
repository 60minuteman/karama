import { Redirect } from 'expo-router';
import { useOnboarding } from '@/hooks/useOnboarding';

export default function HomeScreen() {
  const { isFirstLaunch } = useOnboarding();

  if (isFirstLaunch) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  return <Redirect href="/(auth)/auth" />;
}
