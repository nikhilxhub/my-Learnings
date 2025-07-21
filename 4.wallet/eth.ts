
// Solana does not support multiple addresses per account
//  the way Ethereum does.

import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { ethers } from "ethers";

const mnemonicPhrase = generateMnemonic();
console.log("Mnemonic is:", mnemonicPhrase);

// Get seed from mnemonic
const seed = mnemonicToSeedSync(mnemonicPhrase);

// Create root node from seed
const rootNode = ethers.HDNodeWallet.fromSeed(seed);

for (let i = 0; i < 4; i++) {
    // const path = `m/44'/60'/0'/0/${i}`;
    const path = `m/44'/60'/${i}'/0'/0'`

    const child = rootNode.derivePath(path);
    console.log(`Wallet ${i}:`);
    console.log("Address:", child.address);
    console.log("Private Key:", child.privateKey);
}
