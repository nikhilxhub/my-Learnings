import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";


const LST_RATE = 960000000; 
const base58Secret = process.env.PRIVATE_KEY!;

const payer = Keypair.fromSecretKey(bs58.decode(base58Secret));
const mintAdd = new PublicKey(process.env.TOKEN_MINT!);



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

export const burnTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Burning tokens");
}

export const sendNativeTokens = async (fromAddress: string, toAddress: string, amount: number) => {
    console.log("Sending native tokens");
}