import express from "express"
import { burnTokens, mintTokens, sendNativeTokens } from "./mintTokens";

const app = express();
app.use(express.json());



app.post("/helius",async (req,res)=>{

    const fromAddress = req.body.fromAddress;
    const toAddress = req.body.toAddress;
    const amount = req.body.amount;
    const type = "received_native_sol";
    try{

        if (type === "received_native_sol") {
            await mintTokens(fromAddress, toAddress, amount);
        } else {
            // What could go wrong here?


            // ans-- any other event could be sent to this endpoint and you'll still burn tokens and send sol.
            await burnTokens(fromAddress, toAddress, amount);
            await sendNativeTokens(fromAddress, toAddress, amount);
        }

        res.send('Transaction successful');
    }catch(e){
        
        console.log("some error:", e);
        res.send('Transaction failed');
    }
})

app.listen(3000, () =>{

    console.log("server is running on port 300")
})