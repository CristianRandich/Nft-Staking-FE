"use client";

import React from "react";
import WalletConnection from "./components/WalletConnection";
import NFTGallery from "./components/NFTGallery";
import StakingInterface, { LockPeriod } from "./components/StakingInterface";
// import RewardsDashboard from "./components/RewardsDashboard";
// import Notification from "./components/Notification";

export default function HomePage() {
  const handleStake = (nft: any, lockPeriod: LockPeriod) => {
    console.log("Staking NFT:", nft, "con lockPeriod:", lockPeriod);
    // Lógica de staking
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
    <main className="dashboard">
      {/* Header con título centrado y botón alineado a la derecha */}
      <div className="dashboard__header">
        <h1 className="dashboard__title">Mi DApp de Staking</h1>
        <div className="dashboard__wallet">
          <WalletConnection />
        </div>
      </div>

      {/* Dos columnas: NFTs y Staking */}
      <div className="dashboard__columns">
        <section className="dashboard__column">
          <NFTGallery />
        </section>

        <section className="dashboard__column">
          <StakingInterface
            nft={{ mint: "fakeMint", name: "Fake NFT", image: "" }}
            onStake={handleStake}
          />
        </section>
      </div>

      {/* <section className="dashboard__section">
        <RewardsDashboard
          rewards={12.34}
          onClaim={handleClaim}
          history={fakeHistory}
        />
      </section>

      <Notification message="¡Bienvenido a la DApp!" type="info" /> */}
    </main>
  );
}
