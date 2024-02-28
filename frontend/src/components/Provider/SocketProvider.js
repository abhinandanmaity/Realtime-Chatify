"use client";

import {

  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { io as ClientIO } from "socket.io-client";

const SocketContext = createContext({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO)("http://localhost:3000", {
      path: "/api/socket/socketio",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      console.log("A new user has connected");
      setIsConnected(true);
    });

    // socket.on("message", ( message ) => {
    //   console.log(message);
    //   socket.to.emit("receive-message", message);
    // });

    socketInstance.on("disconnect", () => {

      console.log("User has disconnected");

      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    }
  }, []);

  return (

    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}