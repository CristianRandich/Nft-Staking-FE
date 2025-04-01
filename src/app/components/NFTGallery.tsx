"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import StakingInterface from "./StakingInterface";
import Image from "next/image"; // ✅ Usamos <Image /> de Next.js

interface NFT {
  mint: string;
  name: string;
  image: string;
}
interface RawNFT {
  mint?: string;
  id?: string;
  name?: string;
  image?: string;
}

export default function NFTGallery() {
  const wallet = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNFTsFromBackend = async () => {
      if (!wallet.publicKey) return;

      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nfts/${wallet.publicKey.toBase58()}`
        );

        const data = await res.json();
        console.log("Respuesta backend NFTs:", data);

        if (res.ok && data.success) {
          const nftList: NFT[] = data.data.map((nft: RawNFT) => ({
            mint: nft.mint || nft.id || "",
            name: nft.name || "NFT sin nombre",
            image: nft.image || "",
          }));
          setNfts(nftList);
        } else {
          console.error("Error en la respuesta del servidor:", data.message);
        }
      } catch (err) {
        console.error("Error al obtener NFTs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTsFromBackend();
  }, [wallet.publicKey?.toBase58()]);

  if (!wallet.connected) {
    return <p className="nft-gallery__title">Conecta tu wallet para ver tus NFTs.</p>;
  }

  return (
    <div className="nft-grid">
      <h2 className="nft-gallery__title">Tus NFTs</h2>

      {loading ? (
        <p>Cargando NFTs...</p>
      ) : nfts.length === 0 ? (
        <StakingInterface nft={{ mint: "", name: "Fake NFT", image: "" }} onStake={() => {}} />
      ) : (
        nfts.map((nft) => (
          <div className="nft-card" key={nft.mint}>
            {nft.image ? (
              <Image
                src={nft.image}
                alt={nft.name}
                className="nft-image"
                width={300}
                height={300}
              />
            ) : (
              <div className="nft-image-placeholder">Imagen no disponible</div>
            )}
            <h3 className="nft-name">{nft.name}</h3>
            <StakingInterface nft={nft} onStake={() => {}} />
          </div>
        ))
      )}
    </div>
  );
}