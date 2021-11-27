import React, { useState, useEffect, useCallback } from 'react';

import useProvider from '../hooks/useProvider';

// Mock gifs
//import { TEST_GIFS } from '../config/mock.jsx';

const useGif = (walletAddress) => {
  const [gifList, setGifList] = useState(null);
  const { 
    program,
    provider,
    baseAccount,
    SystemProgram,
    getAccount  
  } = useProvider();

  const getGifList = async() => {
    try {
      const account = await getAccount();
      console.log(account)

      console.log("Got the account", account)
      setGifList(account.gifList)

    } catch (error) {
      console.log("Error in getGifList: ", error)
      setGifList(null);
    }
  }

  const createGifAccount = async () => {
    try {
      console.log("ping")
      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount]
      });
      console.log("Created a new BaseAccount w/ address:", baseAccount.publicKey.toString())
      await getGifList();

    } catch(error) {
      console.log("Error creating BaseAccount account:", error)
    }
  }

  const sendGif = async (value) => {
    try {
      await program.rpc.addGif(value, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log("GIF successfully sent to program", value)

      await getGifList();
    } catch (error) {
      console.log("Error sending GIF:", error)
    }
  };

  const addLike = async (value) => {
    try {
      await program.rpc.addLike(value, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log("GIF successfully added like", value)

      await getGifList();
    } catch (error) {
      console.log("Error sending GIF:", error)
    }
  };


  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
      // Call Solana program here.
      getGifList();
    }
  }, [walletAddress]);

  return {
    gifList,
    createGifAccount,
    sendGif,
    addLike
  }
}

export default useGif;