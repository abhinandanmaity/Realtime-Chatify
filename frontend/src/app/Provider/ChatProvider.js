"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from 'socket.io-client';
import axios from 'axios'

// import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

  // console.log(process.env.BACKEND_URL)
  // let socket = io(`${process.env.BACKEND_URL}`)
  // let socket = io("http://localhost:3000")
  let socket = io("https://realtime-chatify-6065.onrender.com")

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState(new Map());
  const [fetchnotification, setFetchnotification] = useState("notnotification");
  const [chats, setChats] = useState();
  const [socketstore, setSocketstore] = useState(socket);
  const [socketID, setSocketID] = useState();
  const [socketusername, setSocketusername] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [mobilefooterselect, setMobilefooterselect] = useState("chat");
  const [updateprofile, setUpdateprofile] = useState("notupdateprofile");
  const [updategroup, setUpdategroup] = useState("notupdategroup");
  const [inputfieldsearch, setInputfieldsearch] = useState("")

  useEffect(() => {

    axios.post('/api/account/get-current-user')
      .then((res) => {
        // console.log(res.data)
        // console.log(" -- chatProvider -- ")
        socket.emit("setup", res.data._id)
        setSocketstore(socket)
        setSocketConnected(true);
        setSocketID(res.data._id);
        setSocketusername(res.data.username);
      })
      .catch(() => {

        // console.log("callback curr")
      })
    socket.on("connection", () => setSocketConnected(true))

  }, [])


  useEffect(() => {

    socket.on('updateOnlineUsers', (users) => {
      setOnlineUsers(users)
    });
  })




  return (
    <ChatContext.Provider
      value={{
        onlineUsers,
        setOnlineUsers,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
        socketstore,
        socketID,
        socketusername,
        socketConnected,
        setFetchnotification,
        fetchnotification,
        mobilefooterselect,
        setMobilefooterselect,
        updateprofile,
        setUpdateprofile,
        updategroup,
        setUpdategroup,
        inputfieldsearch,
        setInputfieldsearch
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;