console.log("Hello via Bun!");

import { Keypair } from "@solana/web3.js";
import bs58 from "bs58"
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";


//1. generate mnemonics from bip
const mnemonic = generateMnemonic();
console.log("my Mnemonic: ",mnemonic);

//2.derive seed from mnemonic
// seed is a binary number
const seed = mnemonicToSeedSync(mnemonic);
console.log("my seed is: ", seed);

//3. (hd- wallets) m/purpose'/coin_type/account
//  purpose--> 44' for BIP44, which is a standard for HD wallets
// coint_type---> 0' for Bitcoin, 60' for Ethereum, 501' for solana

for(let i = 0; i < 4; i++){
    const path = `m/44'/501'/${i}'/0'/0'`
    // const path = `m/44'/501'/0'/0'/${i}'`//multiple addres within in same acc

    const Node = derivePath(path, seed.toString("hex")).key;


    //4.create public private key pairs

    const keypair = Keypair.fromSeed(Node);
    console.log(`public Key is ${i}: `, keypair.publicKey.toBase58());
    //since secretKey(private key) is in unit8 array formart using bs58
    console.log(`private Key is ${i}: `, bs58.encode(keypair.secretKey));

}

