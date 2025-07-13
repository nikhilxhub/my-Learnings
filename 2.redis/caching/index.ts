import express from "express"
import { config } from "./config";
import prismaClient from "./prisma/db";
import redisClient from "./redis";
// import { PrismaClient } from "@prisma/client";


const app = express();
app.use(express.json());
let start,end, totalTime;

app.post('/users', async(req,res) =>{
    const { name, email} = req.body;
    if(!name || !email){
        res.status(400).json({
            e: 'name ,email required'
        })
        return;
    }

    try{
        const existingUser = await prismaClient.user.findFirst({
            where:{
                // name: name,
                email
            }
        })

        const result = await prismaClient.user.create({
            data:{
                name,
                email
            }
        })

        await redisClient.del('users');

        const allUsers = await prismaClient.user.findMany();

        await redisClient.set('users', JSON.stringify(allUsers),{
            EX: 3600
        });

        res.status(200).json({
            user: result,
            existingUser: existingUser? 'ExistingUser added' : 'New User added'
        })

    }catch(e){
        console.error(e);

    }
})

app.get('/users', async (req, res) =>{
    start = Date.now();
    try{
        const users = await prismaClient.user.findMany();
        await redisClient.del('users');
        await redisClient.set('users', JSON.stringify({
            EX:3600
        }));

        const end = Date.now();

        const totalTime = end - start;

        res.status(200).json({
            users,
            time:`${totalTime} ms`,
            source:'postgres'
        })
    }catch(e){
        console.error(e);
    }

})

app.get('/users/redis', async (req, res) =>{
    start = Date.now();
    try{
        const users = await redisClient.get('users');
        end = Date.now();

        totalTime = end- start;
        res.status(200).json({
            users :JSON.parse(users as string),
            time:`${totalTime} ms`,
            source:"redis"
            // eror:'internal server error'
        })
    }catch(e){
        console.error(e);
    }

})


app.listen(config.port, ()=>{
    console.log(`server is running on port ${config.port}`);

})