import  redis  from "redis";

export const redisSubscriber = redis.createClient({
    url :  "redis://localhost:6379"
})

export const redisPublisher = redis.createClient({
    url :  "redis://localhost:6379"
})

export async function connectRedis() {
    try{
        await redisPublisher.connect();
        await redisSubscriber.connect();

        console.log("successfully connected to redis");


    }catch(e){
        console.error("error connecting to redis", e);
    }
}