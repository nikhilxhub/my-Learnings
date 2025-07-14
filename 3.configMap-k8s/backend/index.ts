console.log("Hello via Bun!");

import express from "express"
const app = express();

console.log(process.env.PORT)
console.log(process.env.DATABASE_URL)

app.get("/", (req,res)=>{

    res.json({
        db:process.env.DATABASE_URL,
        port: process.env.PORT
    })
})
app.listen(process.env.PORT)