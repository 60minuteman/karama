import NetInfo from '@react-native-community/netinfo';
import { onlineManager, QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

// Import the queryClient from your layout file
import { queryClient } from '@/app/_layout';

export function useOnlineManager() {
  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      onlineManager.setOnline(state.isConnected ?? false);

      // Refetch all queries when coming back online
      if (state.isConnected) {
        onlineManager.isOnline() && queryClient.invalidateQueries();
      }
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);
}
