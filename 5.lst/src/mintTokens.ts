import { createBurnCheckedInstruction, getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";


const LST_RATE = 960000000; 
const base58Secret = process.env.PRIVATE_KEY!;

const payer = Keypair.fromSecretKey(bs58.decode(base58Secret));
const mintAdd = new PublicKey(process.env.TOKEN_MINT!);
const fromAddress = process.env.PUBLIC_ADDRESS!


const connection = new Connection("https://api.devnet.solana.com");
export const mintTokens = async ( toAddress: string, amount: number) => {
    console.log("Minting tokens");

    // console.log(fromAddress);
    console.log(toAddress);
    // console.log()
    const to = new PublicKey(toAddress);
    // const from = new PublicKey(fromAddress);


  const DECIMALS = 9;
  const RATE = 0.96;

  const rawAmount = amount * RATE * 10 ** DECIMALS;
  const amt = BigInt(Math.floor(rawAmount)); // ✅ safe BigInt

    // create or get ata
    const associatedAcc = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mintAdd,
        to
    )

    console.log("Ata acc created for user:",associatedAcc.address);

    // mintTO
    const signature = await mintTo(
        connection,
        payer,
        mintAdd,
        associatedAcc.address,
        payer,
        amt
    );
    console.log("mint tx sign:", signature);

    console.log(`Minted ${amt} MySOL to ${to.toBase58()}`);



}

export const burnTokens = async ( toAddress: string, amount: number) => {
    console.log("Burning tokens");

     const associatedTokenAccount = await getAssociatedTokenAddress(mintAdd, payer.publicKey);
    console.log(associatedTokenAccount);
    const transaction = new Transaction().add(
        createBurnCheckedInstruction(
            associatedTokenAccount,
            mintAdd,
            payer.publicKey,
            amount* 10**9,
            9
        )
    );

    const txnSignature = await sendAndConfirmTransaction(connection, transaction, [payer]);
    console.log(`Burned ${amount} from ${toAddress}: ${txnSignature}`);
}

export const sendNativeTokens = async (toAddress: string, amount: number) => {
  console.log("🔁 Sending native tokens...");

  const to = new PublicKey(toAddress);
  const from = new PublicKey(fromAddress); // Make sure this is defined in your scope

  // Convert SOL to lamports (1 SOL = 1_000_000_000 lamports)
  const lamports = BigInt(Math.floor(amount * 1_000_000_000));

  if (lamports <= 0n) {
    throw new Error("Amount too small to convert to lamports");
  }

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: to,
      lamports,
    })
  );

  const txnSignature = await sendAndConfirmTransaction(connection, transaction, [payer]);

  console.log(`✅ Sent ${amount} SOL to ${to.toBase58()} — Txn: ${txnSignature}`);
};