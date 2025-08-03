import WebSocket, { WebSocketServer } from "ws";
import { connectRedis, redisPublisher, redisSubscriber } from "./redis";
import { binanceSocket } from "./binanceSocket";

const wss = new WebSocketServer({
    port: 3000
})
console.log(`webSocket running on port ssshhh`);

const clients = new Set<WebSocket>();


wss.on("connection", (ws)=>{

    clients.add(ws);

    ws.on("close", ()=>{
        clients.delete(ws);
    })
});

(async() =>{
    await connectRedis();
})();

await redisSubscriber.subscribe("bitcoin:Updates", (message) =>{
    for(let client of clients){
        if(client.readyState == WebSocket.OPEN){
            client.send(message);

        }
    }
})

let latestTrade: string | null = null;

binanceSocket.on("message", (data) => {
        latestTrade = data.toString();
});

setInterval(() => {
        if (latestTrade) {
            try {
                const trade = JSON.parse(latestTrade);
                const formatted = {
                    symbol : trade.s,
                    price: trade.p,
                    quantity: trade.q,
                    time: new Date(trade.T).toLocaleTimeString()
                };
                redisPublisher.publish("bitcoin:Updates", JSON.stringify(formatted));
            } catch (err) {
                console.error("Failed to parse trade:", err);
            }
            latestTrade = null;
        }
}, 500);