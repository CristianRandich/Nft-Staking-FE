export const getNFTsByWallet = async (walletAddress: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nfts/${walletAddress}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al obtener NFTs');
      return data.data.nfts;
    } catch (err) {
      console.error('Error en getNFTsByWallet:', err);
      return [];
    }
  };
  
  export const freezeNFT = async (nftId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/freeze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nftId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al congelar NFT');
      return data;
    } catch (err) {
      console.error('Error al congelar NFT:', err);
      return null;
    }
  };
  
  export const unfreezeNFT = async (nftId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unfreeze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nftId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al descongelar NFT');
      return data;
    } catch (err) {
      console.error('Error al descongelar NFT:', err);
      return null;
    }
  };
  