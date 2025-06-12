import { create } from 'zustand';

interface State {
  // State properties
  count: number;
  isLoading: boolean;
  error: string | null;
  match_complete: boolean | null | object;

  // Actions
  increment: () => void;
  decrement: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setMatchComplete: (complete: boolean | null | object) => void;
}

export const useStore = create<State>((set) => ({
  // Initial state
  count: 0,
  isLoading: false,
  error: null,
  match_complete: null,

  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setMatchComplete: (complete) => set({ match_complete: complete }),
}));
