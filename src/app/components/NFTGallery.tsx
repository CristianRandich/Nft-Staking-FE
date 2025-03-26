"use client";
import React, { useEffect, useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity, Nft } from "@metaplex-foundation/js";
import { useWallet } from "@solana/wallet-adapter-react";
import StakingInterface from "./StakingInterface";
export default function NFTGallery() {
  const wallet = useWallet();
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [loading, setLoading] = useState(false);
  const connection = new Connection("https://api.devnet.solana.com");


  useEffect(() => {
    const fetchNFTs = async () => {
      if (!wallet.publicKey) return;

      setLoading(true);
      try {
        const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));
        const all = await metaplex.nfts().findAllByOwner({ owner: wallet.publicKey });
        const filtered = all.filter((item): item is Nft => item.model === "nft");
        setNfts(filtered);
      } catch (error) {
        console.error("Error al obtener NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [wallet.publicKey?.toBase58()]); // evitar recrear conexión

  if (!wallet.publicKey) {
    return <p>Conecta tu wallet para ver tus NFTs.</p>;
  }

  return (
    <div className="nft-grid">
      <h2 className="nft-gallery__title">Tus NFTs</h2>

      {loading ? (
        <p>Cargando NFTs...</p>
      ) : nfts.length === 0 ? (
        <p>No se encontraron NFTs.</p>
      ) : (
        nfts.map((nft) => (
          <div className="nft-card" key={nft.mint.address.toBase58()}>
            {nft.json?.image ? (
              <img src={nft.json.image} alt={nft.name} className="nft-image" />
            ) : (
              <div className="nft-image-placeholder">Imagen no disponible</div>
            )}
            <h3 className="nft-name">{nft.name}</h3>
            <p className="nft-collection">
  Collection: {nft.collection?.address.toBase58() || "Desconocida"}
</p>

            <StakingInterface
              nft={{
                mint: nft.mint.address.toBase58(),
                name: nft.name,
                image: nft.json?.image || "",
              }}
              onStake={() => {}}
            />
          </div>
        ))
      )}
    </div>
  );
}