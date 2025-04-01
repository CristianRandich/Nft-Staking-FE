"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import StakingInterface from "./StakingInterface";
import Image from "next/image";

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

    if (wallet.publicKey) {
      fetchNFTsFromBackend();
    }
  }, [wallet.publicKey]); // ✅ Corrección de dependencia exacta

  if (!wallet.connected) {
    return <p className="nft-gallery__title">Conecta tu wallet para ver tus NFTs.</p>;
  }

  return (
    <div className="nft-gallery"> {/* ✅ Envuelve todo en la clase .nft-gallery para aplicar fondo y padding */}
      <h2 className="nft-gallery__title">Tus NFTs</h2>
  
      <div className="nft-gallery__grid"> {/* ✅ Grid layout definido en el CSS para mostrar múltiples NFTs */}
        {loading ? (
          <p>Cargando NFTs...</p>
        ) : nfts.length === 0 ? (
          // ✅ Si no hay NFTs, muestra uno falso para probar staking
          <StakingInterface nft={{ mint: "", name: "Fake NFT", image: "" }} onStake={() => {}} />
        ) : (
          nfts.map((nft) => (
            <div className="nft-gallery__card" key={nft.mint}> {/* 🔧 CAMBIO: antes era "nft-card" */}
              {nft.image ? (
                <Image
                  src={nft.image}
                  alt={nft.name}
                  className="nft-gallery__image" // 🔧 CAMBIO: antes era "nft-image"
                  width={300}
                  height={300}
                />
              ) : (
                <div className="nft-image-placeholder">Imagen no disponible</div>
              )}
              <h3 className="nft-gallery__name">{nft.name}</h3> {/* 🔧 CAMBIO: antes era "nft-name" */}
              <StakingInterface nft={nft} onStake={() => {}} />
            </div>
          ))
        )}
      </div>
    </div>
  );
  }
