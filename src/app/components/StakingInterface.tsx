"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";

interface RawNFT  {
  mint: string;
  id?: string;
  name: string;
  image: string;
}

interface StakingInterfaceProps {
  nft: RawNFT ;
  onStake: (nft: RawNFT ) => void;
}

export default function StakingInterface({ nft }: StakingInterfaceProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _nft = nft;
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [userNFTs, setUserNFTs] = useState<RawNFT []>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedNFT = userNFTs[currentIndex] || null;

  const handleStake = async () => {
    if (!selectedNFT) return;
    setLoading(true);
    try {
      const payload = { nftId: selectedNFT.mint, lockPeriod: 1 };
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
    if (!selectedNFT) return;
    setLoading(true);
    try {
      const payload = { nftId: selectedNFT.mint };
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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % userNFTs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + userNFTs.length) % userNFTs.length);
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!publicKey) return;
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nfts/${publicKey.toBase58()}`);
        const result = await res.json();
        if (res.ok && result.success && Array.isArray(result.data)) {
          const mappedNFTs: RawNFT [] = result.data.map((nft: RawNFT) => ({
            mint: nft.mint || nft.id || "",
            name: nft.name || "Unnamed NFT",
            image: nft.image || "",
          }));
          setUserNFTs(mappedNFTs);
          setCurrentIndex(0);
        } else {
          setUserNFTs([]);
        }
      } catch (err) {
        console.error("Error buscando NFTs desde backend:", err);
        setUserNFTs([]);
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
            : !selectedNFT
            ? "NFTs no encontrados."
            : `Staking NFT: ${selectedNFT.name}`}
        </h3>

        <div className="staking__nft-carousel">
          {userNFTs.length > 1 && (
            <button onClick={handlePrev} className="staking__arrow-btn">◀</button>
          )}

          {selectedNFT?.image && (
            <Image
              src={selectedNFT.image}
              alt={selectedNFT.name}
              className="staking__image"
              width={300}
              height={300}
              unoptimized
            />
          )}

          {userNFTs.length > 1 && (
            <button onClick={handleNext} className="staking__arrow-btn">▶</button>
          )}
        </div>

        <div className="staking__buttons">
          {selectedNFT && (
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
