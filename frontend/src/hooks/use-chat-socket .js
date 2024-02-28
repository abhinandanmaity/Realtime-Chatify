import { useEffect } from "react";
import { useSocket } from "@/components/Provider/SocketProvider";


export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey
}) => {
  // const { socket } = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(updateKey, (message) => {
      
    });

    socket.on(addKey, (message) => {
      
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    }
  }, [addKey, queryKey, socket, updateKey]);
}