import { createClient } from "redis";
import { config } from "./config";

const redisClient = createClient({
    url:config.redis as string
})

async function connectRedis() {
    await redisClient.connect();
    console.log('redis connected')
}

redisClient.on("error", (e)=>{
    console.log("redis error:", e)
})

connectRedis();

export default redisClient;