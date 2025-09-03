import { randomUUIDv5, randomUUIDv7 } from "bun";
import { randomUUID } from "crypto";
import express from "express";
import { v4 as uuidv4 } from 'uuid';

import http from 'http';
import WebSocket, { WebSocketServer } from "ws";

const app = express();
app.use(express.json())

type chatMessage = {
    id: string,
    username:string,
    text: string,
    ts:number //timestamp
};

const server = http.createServer(app)
const port = 3000
server.listen(()=>{
    console.log("server listening on 3000")
})

const wss = new WebSocketServer({
    server
})
// in memory
const rooms = new Map<string, chatMessage[]>();
rooms.set('general', []);

const client = new Map<WebSocket, {
    username?: string;
    room:string
}>();

const broadCastToRoom = (room:string, payload:any) =>{

}
wss.on('connection', (ws: WebSocket) =>{
    client.set(ws,{room:"general"});
    console.log("new connection connected");

    const history = rooms.get("general") || [];
    ws.send(JSON.stringify({
        type:'histroy',
        messages: history
    }))


    ws.on('message', (data)=>{
        try{
            console.log("hi");

            const msg = JSON.parse(data.toString());

            if(msg.type === 'join'){
                const meta = client.get(ws)!;
                meta.username = msg.username ?? `User-${Math.floor(Math.random() * 1000)}`;

                const sysMsg : chatMessage = {
                    id: uuidv4(),
                    username:"System",
                    text:`${meta.username} joined the chat.`,
                    ts:Date.now(),

                };
                rooms.get(meta.room)?.push(sysMsg);
                broadCastToRoom(meta.room,{
                    type:'system',
                    message:sysMsg
                });
                

            }else if(msg.type == 'message'){


            }else{
                console.warn("unknown msg type..", msg);
            }

        }catch(err){

        }

    })

    ws.on("close", ()=>{



    })
})