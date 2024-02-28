import { useEffect, useState, useMemo } from "react"
import React from 'react'
// import { WebSocket } from "ws"
// import { useSocket } from "../Provider/SocketProvider"
// import { io as ClientIO } from "socket.io-client";
// import { io } from 'socket.io-client'
// let socket;

const Inputsocketmessage = () => {

  const [inputmes, setInputmes] = useState("")
  const [list, setList] = useState()

  // const socket = new (ClientIO)("http://localhost:3000", {
  //   path: "/api/socket/socketio",
  //   addTrailingSlash: false,
  // });
  // const { isConnected, socket } = useSocket() 


  // useEffect(() => {
  //   socketInitializer()
  // }, [])

  // const socketInitializer = async () => {
  //   socket = useSocket() 

  //   socket.on('connect', () => {
  //     console.log('connected')
  //   })

  //   socket.on('update-input', msg => {
  //     setInput(msg)
  //   })
  // }

  // const handlesubmes = (e) => {

  //   e.preventDefault()
  //   // console.log("socket")
  //   // console.log(isConnected)
  //   // console.log(socket)
  //   // socket.on("message", message );
  //   // socket.emit("send_message", inputmes);
  //   // socket.emit('send-message', inputmes)
  //   socket.emit('input-change', inputmes)
  //   setInputmes("")
  // }

  // useEffect(() => {

  //   // socket.on("received_message", (data) => {
  //   //   // console.log(data);
  //   //   setList([...list, data]);
  //   // });
  //   // if(socket && isConnected){

  //   // const socket = new (ClientIO)("http://localhost:3000", {
  //   //   path: "/api/socket/socketio",
  //   //   addTrailingSlash: false,
  //   // });

  //     console.log("connected")

  //     // socket.on('update-input', (msg) => {
  //     //   setList([...list, msg])
  //     // })
  //     // socket.on('welcome', (msg) => {
  //     //  console.log(msg)
  //     // })
  //     socket.on('receive-message', (msg) => {
  //      console.log(msg)
  //     })
  //     // console.log("list")
  //     // console.log(list)
  //   // }
  // }, [])


  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  // const [inputValue, setInputValue] = useState('');

  // useEffect(() => {
  //   const socket = new WebSocket('ws://localhost:3000/api/websocket');

  //   socket.onopen = () => {
  //     console.log('WebSocket connected');
  //     setWs(socket);
  //   };

  //   socket.onmessage = (event) => {
  //     const message = event.data;
  //     console.log('Received message:', message);
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   };

  //   return () => {
  //     // socket.close();
  //   };
  // }, []);

  const sendMessage = (e) => {

    e.preventDefault()

    if (ws && inputmes) {
      ws.send(inputmes);
      setInputmes('');
    }
  };

  const handlech = (e) => {

    if (e.target.name == 'inputmes') {
      setInputmes(e.target.value)
    }
  }

  return (
    <>

      {/* <input name="inputmes" id="inputmes" type="text" className='w-60 p-3 bg-gray-300 text-black border border-red-400 rounded-xl' value={inputmes} onChange={handlech} />
      <button type="submit" className='p-2 bg-green-200' onClick={sendMessage}>send</button>

      <div className="font-extrabold text-black text-xl">
        Message are
      </div> */}
      <div className='pt-6'>
        {list && list.map((chat) => (
          <div key={chat.message} className="text-lg font-bold text-black">
            {/* {chat.message} */}
          </div>
        ))}
      </div>
    </>
  )
}

export default Inputsocketmessage