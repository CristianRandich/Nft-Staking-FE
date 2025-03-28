"use client";

import React from "react";
import WalletConnection from "./components/WalletConnection";
import NFTGallery from "./components/NFTGallery";
import StakingInterface from "./components/StakingInterface";
// import RewardsDashboard from "./components/RewardsDashboard";
// import Notification from "./components/Notification";

export default function HomePage() {
  const handleStake = (nft: any) => {
    console.log("Staking NFT:", nft);
  };
  

  const handleClaim = () => {
    console.log("Reclamando recompensas...");
    // Lógica para reclamar
  };

  const fakeHistory = [
    { action: "Stake", amount: 1, timestamp: "2025-03-19T10:00:00Z" },
    { action: "Claim", amount: 10, timestamp: "2025-03-20T15:30:00Z" },
  ];

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
          onStake={handleStake}
        />
      </div>
    </main>
  );
}
