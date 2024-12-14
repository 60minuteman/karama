import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const HAS_LAUNCHED = 'hasLaunched';

export function useOnboarding() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true);

  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
        setIsFirstLaunch(hasLaunched === null);
      } catch (error) {
        setIsFirstLaunch(false);
      }
    }
    checkFirstLaunch();
  }, []);

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(HAS_LAUNCHED, 'true');
      setIsFirstLaunch(false);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  return { isFirstLaunch, completeOnboarding };
}