
// import { Server } from "socket.io";
import { NextResponse } from "next/server";
import { Server as ServerIO } from "socket.io";
// const { Server } = require("socket.io");
let io;

export async function GET(req, res) {

    // console.log("socket")
    // // console.log(res?.socket?.server?.io)

    // if (res?.socket?.server?.io) {

    //     // console.log("Socket is already run")
    // } else {

    //     // console.log("Socket is initializing")
    // const httpServer = res?.socket?.server;
    // const io = new Server(httpServer, {
    //     /* options */
    //     cors:{
    //       origin:["http://localhost:3000"],
    //       methods:["GET", "POST"]
    //     },
    //     addTrailingSlash: false,
    // });
    // const io = new Server(res.socket)
    // res.socket.server.io = io;

    // io.on("connection", (socket) => {
    //     // console.log("a user connected");

    //     socket.on("disconnect", () => {
    //         // console.log("user disconnected");
    //     });

    //     // socket.on("message", (msg) => {
    //     //   // console.log("message: " + msg);
    //     //   io.emit("message", msg); // Broadcast message to all connected clients
    //     //   // Optionally, you can store the message in a database here
    //     // });
    // });
    // // // console.log(res)


    // const io = new Server(res.socket.server);

    // io.on('connection', (socket) => {
    //   // console.log('a user connected');

    //   socket.on('disconnect', () => {
    //     // console.log('user disconnected');
    //   });

    //   socket.on('message', (msg) => {
    //     // console.log('message:', msg);
    //     io.emit('message', msg); // Broadcast message to all connected clients
    //   });
    // });

    // res.socket.server.io = io;

    // }

    try {

        if (res?.socket?.server?.io) {

            // console.log("Socket is already run")
        } else {
            // io = new Server(res.socket.server, {
            //     /* options */
            //     cors: {
            //         origin: ["http://localhost:3000/"],
            //         methods: ["GET", "POST"]
            //     }
            // })

            // io.on('connection', (socket) => {
            //     // console.log('a user connected');

            //     socket.on('disconnect', () => {
            //         // console.log('user disconnected');
            //     });

            //     // socket.on('message', (msg) => {
            //     //     // console.log('message:', msg);
            //     //     io.emit('message', msg); // Broadcast message to all connected clients
            //     // });
            // });


            const path = "/api/socket";
            const httpServer = res.socket.server;
            const io = new ServerIO(httpServer, {
                path: path,
                // @ts-ignore
                addTrailingSlash: false,
            });
            res.socket.server.io = io;
        }
        return NextResponse.json({ data: "success" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }

    // try {

    //     const body = await req.json();

    // const {searchInput} = body;
    // if (res?.socket?.server?.io) {

    //     // console.log("Socket is already run")
    //     return NextResponse.json({ conversations: conversations }, { status: 200 })
    // } else {

    //     // console.log("Socket is initializing")
    //     const httpServer = res.socket.server;
    //     const io = new Server(httpServer, {
    //         /* options */
    //         // cors: {
    //         //     origin: ["http://localhost:3000/"],
    //         //     methods: ["GET", "POST"]
    //         // }
    //     });

    //     io.on("connection", (socket) => {
    //         // console.log("a user connected");

    //         socket.on("disconnect", () => {
    //             // console.log("user disconnected");
    //         });

    //         // socket.on("message", (msg) => {
    //         //   // console.log("message: " + msg);
    //         //   io.emit("message", msg); // Broadcast message to all connected clients
    //         //   // Optionally, you can store the message in a database here
    //         // });
    //     });
    //     res.socket.server.io = io;
    //     return NextResponse.json({ conversations: conversations }, { status: 200 })

    // }
    // res.end();
    //     return NextResponse.json({}, { status: 200 })
    // } catch (error) {

    // return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    // }
}