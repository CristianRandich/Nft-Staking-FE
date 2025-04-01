"use client";
import React from "react";
import WalletConnection from "./components/WalletConnection";
import StakingInterface from "./components/StakingInterface";

export default function HomePage() {
  return (
    <main className="staking-layout">
      {/* Título centrado arriba */}
      <div className="staking-title-container">
        <h1 className="staking-title">NFT Staking Page</h1>
      </div>

      {/* Cuadro centrado */}
      <div className="staking-card-container">
        {/* Botón en esquina superior derecha del cuadro */}
        <div className="staking-card__wallet">
          <WalletConnection />
        </div>

        <StakingInterface
          nft={{ mint: "fakeMint", name: "Fake NFT", image: "" }}
          onStake={() => {}}
        />
      </div>
    </main>
  );
}
