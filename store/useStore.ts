import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  onboarding: any;
  progress: any;
}

interface StoreState {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
