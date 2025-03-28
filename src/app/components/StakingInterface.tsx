"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface NFT {
  mint: string;
  name: string;
  image: string;
}

interface StakingInterfaceProps {
  nft: NFT;
  onStake: (nft: NFT) => void;
}

export default function StakingInterface({ nft, onStake }: StakingInterfaceProps) {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [userNFT, setUserNFT] = useState<NFT | null>(null);

  const handleStake = () => {
    console.log("Staking", userNFT);
    if (userNFT) onStake(userNFT);
  };

  const handleUnstake = () => {
    console.log("Unstaking", userNFT);
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!publicKey) return;

      setLoading(true);
      try {
        // Simulación: reemplaza con tu llamada real
        await new Promise((res) => setTimeout(res, 1000));

        const foundNFTs: NFT[] = [
          {
            mint: "mint123",
            name: "Staking NFT #1",
            image: "https://placekitten.com/300/300"
          }
        ];

        setUserNFT(foundNFTs.length > 0 ? foundNFTs[0] : null);
      } catch (err) {
        console.error("Error buscando NFTs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [publicKey]);

  return (
    <div className="staking-page">
      <div className="staking">
        <h3 className="staking__title">
          {!publicKey
            ? "Conecta tu wallet para ver tus NFTs."
            : loading
            ? "Buscando NFTs..."
            : !userNFT
            ? "NFTs no encontrados."
            : `Staking NFT: ${userNFT.name}`}
        </h3>

        {userNFT?.image && (
          <img src={userNFT.image} alt={userNFT.name} className="staking__image" />
        )}

        <div className="staking__buttons">
          <button className="staking__confirm-btn" onClick={handleStake}>
            STAKE
          </button>
          <button className="staking__confirm-btn" onClick={handleUnstake}>
            UNSTAKE
          </button>
        </div>
      </div>
    </div>
  );
}
