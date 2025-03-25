"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
  nfts: any[];
  setNfts: (nfts: any[]) => void;
  rewards: number;
  setRewards: (r: number) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [nfts, setNfts] = useState<any[]>([]);
  const [rewards, setRewards] = useState<number>(0);

  return (
    <AppContext.Provider value={{ nfts, setNfts, rewards, setRewards }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an <AppProvider>");
  }
  return context;
}
