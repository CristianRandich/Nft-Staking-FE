"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import StakingInterface from "./StakingInterface";

interface NFT {
  mint: string;
  name: string;
  image: string;
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
        if (res.ok && data.success) {
          const nftList: NFT[] = data.data.nfts.map((nft: any) => ({
            mint: nft.id,
            name: nft.metadata?.name || "NFT sin nombre",
            image: nft.metadata?.image || "",
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
        // Mostrar botón de inicializar cuando no hay NFTs
        <StakingInterface
          nft={{ mint: "", name: "Fake NFT", image: "" }}
          onStake={() => {}}
        />
      ) : (
        nfts.map((nft) => (
          <div className="nft-card" key={nft.mint}>
            {nft.image ? (
              <img src={nft.image} alt={nft.name} className="nft-image" />
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
