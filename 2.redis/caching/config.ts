// import { redis } from "bun";

export const config = {
    db: process.env.DB,
    port : process.env.PORT,
    redis: process.env.REDIS
}