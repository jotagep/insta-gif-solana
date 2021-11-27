import React from 'react';

import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';

// Idl from epic project nft on devnet
import idl from '../programs/idl.json';
import kp from '../keypair.json'
import { CLOSING } from 'ws';

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

// Get keypair for the account that will hold the GIF data.
const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
const baseAccount = web3.Keypair.fromSecretKey(secret)

// Get our program's id from the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: "processed"
}

const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(
    connection, window.solana, opts.preflightCommitment,
  );
	return provider;
}

const useProvider = () => {
  const provider = getProvider();
  const program = new Program(idl, programID, provider);

  const getAccount = async () => {
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
    return account;
  }

  return {
    program,
    provider,
    baseAccount,
    SystemProgram,
    getAccount
  }
}

export default useProvider;