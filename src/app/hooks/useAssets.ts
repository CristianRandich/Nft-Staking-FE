import { useState, useEffect } from "react";
import { NFT } from "@/types";

export const useAssets = (walletAddress: string | null) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
 
  
  useEffect(() => {
    if (!walletAddress) return;

    const fetchAssets = async () => {
      setLoading(true);
      try {
        console.log(`Fetching NFTs for wallet: ${walletAddress}`);

        const response = await fetch(
          // 🔴 Aquí debes poner el endpoint real de tu backend para buscar NFTs
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/fetch-assets/${walletAddress}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "omit", // sin cookies
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error al obtener NFTs:", errorText);
          throw new Error(`Error del servidor: ${response.statusText}`);
        }

        const data: NFT[] = await response.json();
setNfts(data);
      } catch (error) {
        console.error("Error al obtener NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [walletAddress]);

  return { nfts, loading };
};
