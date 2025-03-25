"use client";
import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function WalletConnection() {
  return (
    <div className="walletConnectionContainer">
      <WalletMultiButton className="custom-wallet-button" />
    </div>
  );
}
