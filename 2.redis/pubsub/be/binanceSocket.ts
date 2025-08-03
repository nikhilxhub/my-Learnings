import WebSocket from "ws";

export const binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

binanceSocket.on("error", (err) => {
    console.error("Binance WebSocket error:", err);
});