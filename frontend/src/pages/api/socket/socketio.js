import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

// import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/socketio";
    const httpServer = res.socket.server;
    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
    });

    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log("api socket api");

      // socket.on('input-change', msg => {
      //   console.log("socket -- api")
      //   socket.emit('update-input', msg)
      // })

      socket.on('input-change', msg => {
        socket.broadcast.emit('update-input', msg)
      })
      
      // socket.on('send-message', (msg) => {
      //   console.log("api socket api --- 12");
      //   // console.log(msg)
      //   io.emit('receive-message', msg)
      // })

      // socket.emit('welcome', `This is the message ${socket.id}`)
    })
  }

  res.end();
}

export default ioHandler;