import express from "express"
import { burnTokens, mintTokens, sendNativeTokens } from "./mintTokens";

const app = express();
app.use(express.json());



app.post("/helius",async (req,res)=>{
    const {  toAddress, amount,type } = req.body;

    // const type = "received_native_sol";

    // from add is my wallet acc add
    if (!toAddress || !amount) {
        return res.status(400).send('Invalid request: Missing parameters');
    }
    try{

        if (type === "sol") {
            await mintTokens( toAddress, amount);
        } else if(type === "withdraw"){
            // What could go wrong here?


            // ans-- any other event could be sent to this endpoint and you'll still burn tokens and send sol.
            // await burnTokens(fromAddress, toAddress, amount);
            // await sendNativeTokens(fromAddress, toAddress, amount);
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