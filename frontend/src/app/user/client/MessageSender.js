"use client"

import React, { useState, useEffect } from 'react'
import InputMessage from '../components/input/InputMessage'
import CldUploadButton from './CldUploadButton'
import { PiLinkBold } from "react-icons/pi";
import { GoPaperAirplane } from "react-icons/go";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setmessages } from '@/redux/slice/messagesSlice';
import { io } from 'socket.io-client';

const MessageSender = ({ mychat_id, setMessages, socketuserid, setSocket }) => {


    // const dispatch = useDispatch()
    // const socket = io("http://localhost:3000")

    const [content, setContent] = useState("")
    const [attachments, setAttachments] = useState()

    const [socketConnected, setSocketConnected] = useState(false);
    const [room, setRoom] = useState("");
    const [socketID, setSocketId] = useState("");
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);

    const handlechange = (e) => {

        if (e.target.name == "content") {
            setContent(e.target.value);
        }
    }

    const handlesend = (e) => {

        e.preventDefault();
        let data = {
            id: mychat_id,
            content
        }

        axios.post('/api/chat/send-chat', data)
            .then((res) => {
                setContent("");
            })
            .catch((callback) => {

                // console.log("callback")
            })
    }

    // const handlesendSocket = (e) => {
    //     e.preventDefault();

    //     socket.emit("message", message);
    //     setContent("");
    // };

    // const joinRoomHandler = (e) => {
    //     e.preventDefault();

    //     socket.emit("join-room", roomName);
    //     setRoomName("");
    // };

    // useEffect(() => {

    //     setSocket(socket);
    //     socket.emit("setup", socketuserid)
    //     socket.on("connection", ()=> setSocketConnected(true))

    //     socket.on("join-chat", (room)=>{

    //         socket.join(room);
    //     })
    // }, [])


    return (

        <>
            <div className="">

                <div
                    className="
        py-4 
        px-4 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
                >
                    <CldUploadButton
                    // options={{ maxFiles: 1 }}
                    // onUpload={handleUpload}
                    // uploadPreset="pgc9ehd5"
                    >
                        {/* <HiPhoto size={30} className="text-sky-500" /> */}

                        {/* hiphoto */}

                    </CldUploadButton>
                    <form
                        // onSubmit={handleSubmit(onSubmit)}
                        className="flex items-center gap-2 lg:gap-4 w-full"
                    >
                        <InputMessage
                            // id="message"
                            // register={register}
                            // errors={errors}
                            // required
                            // placeholder="Write a message"
                            content={content}
                            handlechange={handlechange}
                        />
                        <button
                            type="button"
                            className=""
                            onClick={handlesend}
                        >
                            <GoPaperAirplane className="text-white text-xl font-bold" />

                        </button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default MessageSender