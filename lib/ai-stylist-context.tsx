'use client';

import React, { createContext, useContext, useState } from 'react';

interface AIStylistContextType {
  isAIOpen: boolean;
  openAI: (prompt?: string) => void;
  closeAI: () => void;
  initialPrompt: string | null;
}

const AIStylistContext = createContext<AIStylistContextType | undefined>(undefined);

export function AIStylistProvider({ children }: { children: React.ReactNode }) {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);

  const openAI = (prompt?: string) => {
    if (prompt) {
      setInitialPrompt(prompt);
    } else {
      setInitialPrompt(null);
    }
    setIsAIOpen(true);
  };

  const closeAI = () => {
    setIsAIOpen(false);
    setInitialPrompt(null);
  };

  return (
    <AIStylistContext.Provider
      value={{
        isAIOpen,
        openAI,
        closeAI,
        initialPrompt,
      }}
    >
      {children}
    </AIStylistContext.Provider>
  );
}

export function useAIStylist() {
  const context = useContext(AIStylistContext);
  if (!context) {
    throw new Error('useAIStylist must be used within an AIStylistProvider');
  }
  return context;
}
