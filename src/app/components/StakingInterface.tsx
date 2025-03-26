"use client";
import React, { useState } from "react";

export enum LockPeriod {
  Unlocked = "Unlocked",
  OneYear = "OneYear",
  TwoYears = "TwoYears",
}

interface NFT {
  mint: string;
  name: string;
  image: string;
}

interface StakingInterfaceProps {
  nft: NFT;
  onStake: (nft: NFT, lockPeriod: LockPeriod) => void;
}

export default function StakingInterface({ nft, onStake }: StakingInterfaceProps) {
  const [selectedLock, setSelectedLock] = useState<LockPeriod>(LockPeriod.Unlocked);

  const handleStake = () => {
    onStake(nft, selectedLock);
  };

  return (
    <div className="staking">
      <h3 className="staking__title">Staking NFT: {nft.name}</h3>

      <img src={nft.image} alt={nft.name} className="staking__image" />

      <div className="staking__lock-options">
        {[
          { value: LockPeriod.Unlocked, multiplier: "0.5X", label: "Unlocked" },
          { value: LockPeriod.OneYear, multiplier: "5X", label: "Locked 1Y" },
          { value: LockPeriod.TwoYears, multiplier: "15X", label: "Locked 2Y" },
        ].map((option) => (
          <label key={option.value} className="staking__lock-option">
            <input
              type="radio"
              name="lock"
              value={option.value}
              checked={selectedLock === option.value}
              onChange={() => setSelectedLock(option.value)}
              className="staking__lock-radio"
            />
            <div className="staking__lock-content">
              <span className="staking__lock-label">{option.multiplier}</span>
              <span className="staking__lock-status">{option.label}</span>
            </div>
          </label>
        ))}
      </div>

      <button className="staking__confirm-btn" onClick={handleStake}>
        CONFIRMAR STAKING
      </button>
    </div>
  );
}
