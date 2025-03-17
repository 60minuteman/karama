import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DiscoverState {
  currentProfile: number;
  likedProfiles: string[];
  rejectedProfiles: string[];
  isLoading: boolean;
  error: string | null;
}

export const useDiscoverStore = create<DiscoverState>()(
  persist(
    (set) => ({
      currentProfile: 0,
      likedProfiles: [],
      rejectedProfiles: [],
      isLoading: false,
      error: null,
    }),
    {
      name: 'discover-storage',
    }
  )
);
