
import { NextResponse } from "next/server";
import { Server } from "socket.io";


// export async function POST(req, res) {

//     // console.log("fhoi")
//     if (res.socket.server.io) {

//         // console.log("Socket is already run")
//         return NextResponse.json({ conversations: conversations }, { status: 200 })
//     } else {

//         // console.log("Socket is initializing")
//         const httpServer = res.socket.server;
//         const io = new Server(httpServer, {
//             /* options */
//             // cors: {
//             //     origin: ["http://localhost:3000/"],
//             //     methods: ["GET", "POST"]
//             // }
//         });

//         io.on("connection", (socket) => {
//             // console.log("a user connected");

//             socket.on("disconnect", () => {
//                 // console.log("user disconnected");
//             });

//             // socket.on("message", (msg) => {
//             //   // console.log("message: " + msg);
//             //   io.emit("message", msg); // Broadcast message to all connected clients
//             //   // Optionally, you can store the message in a database here
//             // });
//         });
//         res.socket.server.io = io;
//         return NextResponse.json({ conversations: conversations }, { status: 200 })


//     }

//     // res.end();
// }


export async function POST(req) {


    // try {

    //     const body = await req.json();

        // const {searchInput} = body;
        if (res.socket.server.io) {

            // console.log("Socket is already run")
            // return NextResponse.json({ conversations: conversations }, { status: 200 })
        } else {

            // console.log("Socket is initializing")
            const httpServer = res.socket.server;
            const io = new Server(httpServer, {
                /* options */
                // cors: {
                //     origin: ["http://localhost:3000/"],
                //     methods: ["GET", "POST"]
                // }
            });

            io.on("connection", (socket) => {
                // console.log("a user connected");

                socket.on("disconnect", () => {
                    // console.log("user disconnected");
                });

                // socket.on("message", (msg) => {
                //   // console.log("message: " + msg);
                //   io.emit("message", msg); // Broadcast message to all connected clients
                //   // Optionally, you can store the message in a database here
                // });
            });
            res.socket.server.io = io;
            // return NextResponse.json({ conversations: conversations }, { status: 200 })


        }
        res.end();
    //     return NextResponse.json({}, { status: 200 })
    // } catch (error) {

    //     return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    // }
}