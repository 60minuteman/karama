import { useEffect } from 'react';
import { AppState } from 'react-native';

export function useAppState(onChange: any) {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onChange);
    return () => {
      subscription.remove();
    };
  }, [onChange]);
}
