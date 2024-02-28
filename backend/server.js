const dotenv = require("dotenv");
dotenv.config()
const express = require("express");
const path = require("path");
// const http = require('http');
// const { Server } = require('socket.io');
// import { Server } from "socket.io";
// import { createServer } from "http";
const { Server } = require('socket.io');
const http = require('http');
const { createServer } = require('http');



const app = express();
const server = createServer(app);

const port = process.env.PORT || '3000'

app.use(express.json());


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join(__dirname1, "/frontend/build")));

  // app.get("*", (req, res) =>
  //   res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  // );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------


// const server = http.createServer(app);
// const io = new Server(server);

// const io = require("socket.io")(server, {
//     pingTimeout: 60000,
//     cors: {
//         origin: "http://localhost:3000",
//         // credentials: true,
//     },
// })

// io.on("connection", (socket) => {
//     console.log("User Connected  ", socket.id);

//     socket.on("message", (message) => {
//         // console.log({ room, message });
//         //   socket.to(room).emit("receive-message", message);
//         io.emit("receive-message", message);
//     });

//     socket.on("join-room", (room) => {
//         socket.join(room);
//         console.log(`User joined room  ${room}`);
//     });

//     socket.on("disconnect", () => {
//         console.log("User Disconnected", socket.id);
//     });
// });



// const io = require("socket.io")(server, {
//     pingTimeout: 60000,
//     cors: {
//       origin: "http://localhost:3000",
//       // credentials: true,
//     },
//   });

// console.log("process.env.FRONTEND_URL")
// console.log(process.env.FRONTEND_URL)
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    // origin: `${process.env.FRONTEND_URL}`,
    // origin: "http://localhost:3001",
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

// let onlineUsers = new Set();
const onlineUsers = new Map();

io.on("connection", (socket) => {
  // console.log("Connected to socket.io", socket.id);

  socket.on("setup", (userData) => {
    socket.join(userData);

    // Add user to onlineUsers set
    // onlineUsers.add(userData);
    // io.emit('updateOnlineUsers', Array.from(onlineUsers));

    // Add user to onlineUsers map
    onlineUsers.set(userData, socket);
    io.emit('updateOnlineUsers', Array.from(onlineUsers.keys()));

    // console.log("userdata -- ", userData);
    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
    // console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => {

    // console.log("typing ", room.socketID)
    socket.in(room.selectedChatCompare).emit("typing", { id: room.socketID, username: room.socketusername, roomid: room.selectedChatCompare })
  });
  socket.on("stop typing", (room) => {

    // console.log("stop ", room.socketID)
    socket.in(room.selectedChatCompare).emit("stop typing", { id: room.socketID, username: room.socketusername, roomid: room.selectedChatCompare })
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    // console.log(chat)
    // console.log(newMessageRecieved)
    if (!chat) return 
    // console.log("chat.users not defined");

    chat.forEach((user) => {
      // console.log(newMessageRecieved.sender._id)
      if (user == newMessageRecieved.sender._id) return;
      // console.log(user, "user")
      socket.in(user).emit("message-recieved", {newMessageRecieved: newMessageRecieved, user: user});
      // socket.to(newMessageRecieved.room_id).emit("message-recieved", newMessageRecieved);
    });
  });

  socket.on("disconnect", () => {
    const userId = Array.from(onlineUsers.keys()).find(key => onlineUsers.get(key) === socket);
    if (userId) {
      // console.log("USER DISCONNECTED : ", userId);
      onlineUsers.delete(userId);
      io.emit('updateOnlineUsers', Array.from(onlineUsers.keys()));
    }
  });

  // socket.off("setup", (userData) => {
  //   console.log("USER DISCONNECTED");
  //   socket.leave(userData);

  //   onlineUsers.delete(userData);
  //   io.emit('updateOnlineUsers', Array.from(onlineUsers));
  // });

});


server.listen(port, () => {
  console.log(`Server listening at ${port}`)
})

