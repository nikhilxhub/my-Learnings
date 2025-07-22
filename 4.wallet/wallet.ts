import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import express from "express"
import bs58 from "bs58"


const app = express();

app.use(express.json());

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// Returns: "https://api.devnet.solana.com"

app.post("/create-wallet", (req,res) =>{

    const mnemonic = generateMnemonic();
    res.json({
        mnemonic
    })

})

app.post("/create-acc-in-wallet", (req,res)=>{

    const { mnemonic, accountIndex } = req.body;
    if(!mnemonic || typeof accountIndex !== "number"){
        return res.status(400).json({
            msg:"mnemonic & accoutIdx required"
        })
    }

    try{

        const seed = mnemonicToSeedSync(mnemonic);

        const path = `m/44'/501'/${accountIndex}'/0'/0'`;

        const node = derivePath(path,seed.toString("hex")).key;

        const keyPair = Keypair.fromSeed(node);
        const publicKey = keyPair.publicKey.toBase58();
        const privateKey = bs58.encode(keyPair.secretKey);

        res.json({
            publicKey,
            privateKey
        })

    }catch(e){
        console.error("error:",  e);
        res.status(500).json({
            msg: "failed to generate account"
        })
    }
})

app.get("/balance", async (req,res) =>{

    const { publicKey } = req.body;
    if(!publicKey){
        return res.status(400).json({
            msg: "public key required"
        })
    }

    try{

        const pubKey = new PublicKey(publicKey);
        const balance = await connection.getBalance(pubKey);
        res.json({
            balance: balance
        })



    }catch(e){
        console.error("error:",  e);
        res.status(500).json({
            msg: "failed to fetch balance"
        })
    }
})


app.listen(3000, ()=>{
    console.log("im running dude.......");
})