"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";

interface NFT {
  mint: string;
  name: string;
  image: string;
}

interface StakingInterfaceProps {
  nft: NFT;
  onStake: (nft: NFT) => void;
}

export default function StakingInterface({ nft }: StakingInterfaceProps) {
  const { publicKey, connected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [userNFT, setUserNFT] = useState<NFT | null>(null);

  const handleStake = async () => {
    if (!userNFT) return;
    setLoading(true);
    try {
      const payload = { nftId: userNFT.mint, lockPeriod: 1 };
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL1}/api/freeze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      alert(res.ok ? `NFT staked ✅\nTx: ${data.transaction}` : `Error: ${data.message || data.error}`);
    } catch (err) {
      console.error("Error staking NFT:", err);
      alert("Error staking NFT");
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!userNFT) return;
    setLoading(true);
    try {
      const payload = { nftId: userNFT.mint };
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL1}/api/unfreeze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      alert(res.ok ? `NFT unstaked ✅\nTx: ${data.transaction}` : `Error: ${data.message || data.error}`);
    } catch (err) {
      console.error("Error unstaking NFT:", err);
      alert("Error unstaking NFT");
    } finally {
      setLoading(false);
    }
  };

  const handleInitialize = async () => {
    setInitializing(true);
    try {
      const payload = { rewardPerSecond: 1 };
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/initialize-pool`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await res.json();
      alert(res.ok ? "Contrato inicializado con éxito ✅" : "Error al inicializar contrato ❌");
    } catch (err) {
      console.error("Error en initialize:", err);
      alert("Fallo al inicializar contrato ❌");
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchNFTs = async () => {
      if (!publicKey) {
        if (isMounted) setUserNFT(null); // ✅ Limpiar NFT si no hay wallet
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nfts/${publicKey.toBase58()}`);
        const result = await res.json();
        if (res.ok && result.success && Array.isArray(result.data) && result.data.length > 0) {
          const nftData = result.data[0];
          if (isMounted) {
            setUserNFT({
              mint: nftData.mint || nftData.id || "",
              name: nftData.name || "Unnamed NFT",
              image: nftData.image || "",
            });
          }
        } else {
          if (isMounted) setUserNFT(null);
        }
      } catch (err) {
        console.error("Error buscando NFTs desde backend:", err);
        if (isMounted) setUserNFT(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNFTs();
    return () => {
      isMounted = false; // ✅ Evita actualizar el estado si el componente se desmonta
    };
  }, [publicKey, nft]);

  return (
    <div className="staking-page">
      <div className="staking">
        <h3 className="staking__title">
          {!connected
            ? "Conecta tu wallet para ver tus NFTs."
            : loading
            ? "Buscando NFTs..."
            : !userNFT
            ? "NFTs no encontrados."
            : `Staking NFT: ${userNFT.name}`}
        </h3>

        {connected && userNFT?.image && (
          <Image
            src={userNFT.image}
            alt={userNFT.name}
            className="staking__image"
            width={300}
            height={300}
            unoptimized
          />
        )}

        {connected && userNFT && (
          <div className="staking__buttons">
            <button className="staking__confirm-btn" onClick={handleStake}>STAKE</button>
            <button className="staking__confirm-btn" onClick={handleUnstake}>UNSTAKE</button>
          </div>
        )}

        {connected && !loading && (
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
  );
}