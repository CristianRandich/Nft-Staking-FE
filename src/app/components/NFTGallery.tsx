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
  const { publicKey, connected } = useWallet(); // ✅ Añadido `connected` para verificar conexión
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNFTsFromBackend = async () => {
      if (!connected || !publicKey) {
        setNfts([]); // ✅ Limpiar NFTs si se desconecta la wallet
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nfts/${publicKey.toBase58()}`
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

    fetchNFTsFromBackend(); // ✅ Ejecutar solo si cambia la wallet o estado de conexión
  }, [publicKey, connected]);

  // ✅ Mostrar solo mensaje si la wallet no está conectada
  if (!connected) {
    return (
      <div className="nft-gallery">
        <h2 className="nft-gallery__title">Conecta tu wallet para ver tus NFTs.</h2>
      </div>
    );
  }

  return (
    <div className="nft-gallery"> {/* ✅ Envuelve todo en .nft-gallery para aplicar fondo y padding */}
      <h2 className="nft-gallery__title">Tus NFTs</h2>

      <div className="nft-gallery__grid"> {/* ✅ Galería con layout en grid */}
        {loading ? (
          <p>Cargando NFTs...</p>
        ) : nfts.length === 0 ? (
          // ✅ Wallet conectada pero sin NFTs: mostramos un NFT falso
          <StakingInterface
            nft={{ mint: "", name: "Fake NFT", image: "" }}
            onStake={() => {}}
          />
        ) : (
          // ✅ Wallet conectada y hay NFTs: los listamos todos
          nfts.map((nft) => (
            <div className="nft-gallery__card" key={nft.mint}>
              {nft.image ? (
                <Image
                  src={nft.image}
                  alt={nft.name}
                  className="nft-gallery__image"
                  width={300}
                  height={300}
                />
              ) : (
                <div className="nft-image-placeholder">Imagen no disponible</div>
              )}
              <h3 className="nft-gallery__name">{nft.name}</h3>
              <StakingInterface nft={nft} onStake={() => {}} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
