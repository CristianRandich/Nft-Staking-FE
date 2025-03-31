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

  const handleStake = () => {
    if (userNFT) onStake(userNFT);
  };

  const handleUnstake = () => {
    console.log("Unstaking", userNFT);
  };

  const handleInitialize = async () => {
    try {
      setInitializing(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/initialize-pool`, {
        method: "POST",
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nfts/${publicKey.toBase58()}`);
        const result = await res.json();

        if (res.ok && result.success && result.data.nfts.length > 0) {
          // Suponiendo que cada NFT tiene { id, name, image }:
          const nftData = result.data.nfts[0]; // Solo uno para esta interfaz
          setUserNFT({
            mint: nftData.id || "", // o usa el campo correcto del backend
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
          {userNFT ? (
            <>
              <button className="staking__confirm-btn" onClick={handleStake}>
                STAKE
              </button>
              <button className="staking__confirm-btn" onClick={handleUnstake}>
                UNSTAKE
              </button>
            </>
          ) : publicKey && !loading ? (
            <button
              className="staking__confirm-btn staking__confirm-btn--top" // se agrego clase staking__confirm-btn--top  para visualizar el boton a un lado de el de wallet 
              onClick={handleInitialize}
              disabled={initializing}
            >
              {initializing ? "Inicializando..." : "Inicializar Contrato"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
