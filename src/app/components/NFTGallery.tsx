"use client";
import React, { useEffect, useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity, Nft } from "@metaplex-foundation/js";
import { useWallet } from "@solana/wallet-adapter-react";

export default function NFTGallery() {
  const wallet = useWallet();
  const [nfts, setNfts] = useState<Nft[]>([]);
  const connection = new Connection(clusterApiUrl("devnet"));

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!wallet.publicKey) return;
      const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));
      try {
        const allNFTs = await metaplex.nfts().findAllByOwner(wallet.publicKey).run();
        const filteredNFTs = allNFTs.filter((item): item is Nft => item.model === "nft");
        setNfts(filteredNFTs);
      } catch (error) {
        console.error("Error al obtener NFTs:", error);
      }
    };
    fetchNFTs();
  }, [wallet.publicKey, connection]);

  return (
    <div className="nftGalleryContainer">
      <h2 className="nftGalleryTitle">Tus NFTs</h2>
      {nfts.length === 0 ? (
        <p>No se encontraron NFTs.</p>
      ) : (
        <div className="nftGalleryGrid">
          {nfts.map((nft, index) => (
            <div key={index} className="nftCard">
              <img
                src={nft.json?.image || ""}
                alt={nft.name}
                className="nftImage"
              />
              <h3 className="nftName">{nft.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
