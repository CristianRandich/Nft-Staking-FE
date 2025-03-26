"use client";

import React, { createContext, useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface WalletContextProps {
  connected: boolean;
  publicKey: string | null;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { connected, publicKey } = useWallet();

  return (
    <WalletContext.Provider value={{ connected, publicKey: publicKey?.toBase58() || null }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext debe usarse dentro de un WalletProvider");
  }
  return context;
};
