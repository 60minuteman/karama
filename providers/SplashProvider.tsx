import React, { createContext, useContext, useState, useEffect } from 'react';
import { SplashScreen } from '@/components/SplashScreen';

interface SplashContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isAppReady: boolean;
}

const SplashContext = createContext<SplashContextType>({
  isLoading: true,
  setIsLoading: () => {},
  isAppReady: false,
});

interface SplashProviderProps {
  children: React.ReactNode;
  onAppReady?: () => void;
}

export function SplashProvider({ children, onAppReady }: SplashProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (isAppReady && !isLoading) {
      onAppReady?.();
    }
  }, [isAppReady, isLoading, onAppReady]);

  const handleSplashAnimationFinish = () => {
    setShowSplash(false);
    setIsAppReady(true);
  };

  const handleSetIsLoading = (loading: boolean) => {
    setIsLoading(loading);
    if (!loading && showSplash) {
      return;
    }
    if (!loading && !showSplash) {
      setIsAppReady(true);
    }
  };

  if (showSplash || isLoading) {
    return (
      <SplashScreen 
        onAnimationFinish={handleSplashAnimationFinish}
      />
    );
  }

  return (
    <SplashContext.Provider
      value={{
        isLoading,
        setIsLoading: handleSetIsLoading,
        isAppReady,
      }}
    >
      {children}
    </SplashContext.Provider>
  );
}

export const useSplash = () => useContext(SplashContext); 