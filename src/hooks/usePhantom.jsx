import React, { useState, useCallback, useEffect } from 'react';

/*
* This function holds the logic for deciding if a Phantom Wallet is
* connected or not
*/
const checkIfWalletIsConnected = async (setWalletAddress) => {
  try {
    const { solana } = window;

    if (solana) {
      if (solana.isPhantom) {
        console.log('Phantom wallet found!');
        const response = await solana.connect({ onlyIfTrusted: true });
        const walletAddress = response.publicKey.toString();
        console.log(
          'Connected with Public Key:',
          walletAddress
        );
        setWalletAddress(walletAddress)
      }
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }
  } catch (error) {
    console.error(error);
  }
};

const usePhantom = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = useCallback(async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  }, [setWalletAddress]);

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected(setWalletAddress);
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [setWalletAddress]);

  return {
    connectWallet,
    walletAddress
  }
}

export default usePhantom;