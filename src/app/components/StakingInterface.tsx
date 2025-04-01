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
  const [initializing, setInitializing] = useState(false);

  const handleStake = async () => {
    if (!userNFT) return;
    try {
      setLoading(true);
      const payload = { nftId: userNFT.mint, lockPeriod: 1 }; // Ajusta lockPeriod si es necesario
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL1}/api/freeze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`NFT staked successfully. Tx: ${data.transaction}`);
      } else {
        alert(`Error staking NFT: ${data.message || data.error}`);
      }
    } catch (err) {
      console.error("Error staking NFT:", err);
      alert("Error staking NFT");
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!userNFT) return;
    try {
      setLoading(true);
      const payload = { nftId: userNFT.mint };
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL1}/api/unfreeze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`NFT unstaked successfully. Tx: ${data.transaction}`);
      } else {
        alert(`Error unstaking NFT: ${data.message || data.error}`);
      }
    } catch (err) {
      console.error("Error unstaking NFT:", err);
      alert("Error unstaking NFT");
    } finally {
      setLoading(false);
    }
  };


  const handleInitialize = async () => {
    try {
      setInitializing(true);
      const payload = { rewardPerSecond: 1 };
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/initialize-pool`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Contrato inicializado con éxito ✅");
      } else {
        alert("Error al inicializar contrato ❌");
      }
    } catch (err) {
      console.error("Error en initialize:", err);
      alert("Fallo al inicializar contrato ❌");
    } finally {
      setInitializing(false);
    }
  };
  
  

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!publicKey) return;
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nfts/${publicKey.toBase58()}`
        );
        const result = await res.json();

        console.log("Respuesta backend NFTs:", result);

        if (res.ok && result.success && Array.isArray(result.data) && result.data.length > 0) {
          const nftData = result.data[0];
          setUserNFT({
            mint: nftData.mint || nftData.id || "",
            name: nftData.name || "Unnamed NFT",
            image: nftData.image || "",
          });
        } else {
          setUserNFT(null);
        }
      } catch (err) {
        console.error("Error buscando NFTs desde backend:", err);
        setUserNFT(null);
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
          {userNFT && (
            <>
              <button className="staking__confirm-btn" onClick={handleStake}>
                STAKE
              </button>
              <button className="staking__confirm-btn" onClick={handleUnstake}>
                UNSTAKE
              </button>
            </>
          )}
          {publicKey && !loading && (
            <button
              className="staking__confirm-btn staking__confirm-btn--top"
              onClick={handleInitialize}
              disabled={initializing}
            >
              {initializing ? "Inicializando..." : "Inicializar Contrato"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
