"use client"

import React, { useEffect, useState, useRef } from 'react'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux';
import Image from "next/image";
// import { ChatState } from '@/app/Provider/ChatProvider';


const MessageBox = ({ messages, mychat_id }) => {

    // console.log(messages)

    // const messages = useSelector(state => state.messages)
    // let onlineuser = useSelector(state => state.onlineuser)
    const bottomref = useRef(null)

    // const { onlineUsers } = ChatState();


    useEffect(() => {

        bottomref?.current?.scrollIntoView();

    }, [messages])

    useEffect(() => {

        bottomref?.current?.scrollIntoView();

    }, [])
    // useEffect(() => {

    //     onlineuser = useSelector(state => state.onlineuser);

    // })

    // console.log("messages && messages[0]?._doc?.attachments")
    // // console.log( messages[0]?._doc?.attachments)
    // console.log("MessageBox -- ", messages)

    return (
        <>
            <div className="pl-3 pr-3 pt-2 "

            >
                {/* h-screen  
            overflow-y-auto scrollbar-hide  */}

                {messages && messages?.map((item) => {

                    return (<div className="pt-1.5 " key={item._doc._id}>

                        {item._doc.chat != mychat_id ?
                            <div
                                // className={container}
                                className="text-white flex gap-3"
                            >
                                <div
                                    // className={avatar}
                                    className='pt-2.5'
                                >
                                    {!item.receiverimage || item.receiverimage == "" ?

                                        <Avatar sx={{ width: 18, height: 18 }}
                                        />
                                        : <Avatar
                                            sx={{ width: 18, height: 18 }}
                                            src={item.receiverimage}
                                        />
                                    }

                                </div>
                                <div
                                // className={body}
                                >
                                    <div className="flex flex-col items-start gap-1 text-white ">
                                        <div className="">
                                            {/* {format(new Date(data.createdAt), 'p')} */}
                                            <div className="">
                                                <span className="font-bold text-gray-100 text-xxs">{item?.reciverusername?.length > 27 ? (item?.reciverusername)?.slice(0, 25) + " ..." : item.reciverusername}</span>
                                                <span className="pl-2 text-gray-300 text-xxxs ">{item._doc.messagedate}</span>
                                            </div>
                                        </div>

                                        <div className="">

                                            {(item._doc.attachments != "" && item._doc.attachments != undefined && item._doc.attachments?.length > 1) &&
                                                <Image
                                                    alt="Image"
                                                    height={170}
                                                    width={150}
                                                    // onClick={() => setImageModalOpen(true)}
                                                    src={item._doc.attachments}
                                                    className="
object-cover 

hover:scale-110 
transition 
translate
"
                                                />
                                            }

                                        </div>


                                        {item._doc?.content && <div className=" bg-yellow-700 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl max-w-56 xxs:max-w-64 pt-2.5 pb-2.5 pl-3.5 pr-2.5">
                                            <div className="text-xs text-white items-end flex justify-end">{item._doc.content}</div>
                                            <div className="text-xxs text-white items-start flex justify-start pr-14 pt-1">{item._doc.messagetime}</div>

                                        </div>}



                                    </div>
                                    {/* Message image */}
                                    {/* <div className={message}>
                            <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
                            {data.image ? (
                                <Image
                                    alt="Image"
                                    height="288"
                                    width="288"
                                    onClick={() => setImageModalOpen(true)}
                                    src={data.image}
                                    className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
                                />
                            ) : (
                                <div>{data.body}</div>
                            )}
                        </div> */}
                                    {/* {isLast && isOwn && seenList.length > 0 && (
                            <div
                                className="
            text-xs 
            font-light 
            text-gray-500
            "
                            >
                                {`Seen by ${seenList}`}
                            </div>
                        )} */}
                                    {/* seen */}
                                </div>
                            </div>
                            :

                            <div
                                // className={container}
                                className="text-white flex justify-end gap-3"

                            >
                                <div
                                // className={body}
                                >
                                    <div className="flex flex-col items-end gap-1 text-white ">
                                        <div className="">
                                            {/* {format(new Date(data.createdAt), 'p')} */}
                                            <div className="">
                                                <span className="font-bold text-gray-100 text-xxs">{item?.senderusername?.length > 27 ? (item?.senderusername)?.slice(0, 25) + " ..." : item.senderusername}</span>
                                                <span className="pl-2 text-gray-300 text-xxxs ">{item._doc.messagedate}</span>
                                            </div>
                                        </div>


                                        {(item._doc.attachments != "" && item._doc.attachments != undefined && item._doc.attachments?.length > 1) &&
                                                <Image
                                                    alt="Image"
                                                    height={170}
                                                    width={150}
                                                    // onClick={() => setImageModalOpen(true)}
                                                    src={item._doc.attachments}
                                                    className="
object-cover 

hover:scale-110 
transition 
translate
"
                                                />
                                            }

                                        {item._doc.content && <div className=" bg-cyan-800 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl max-w-56 xxs:max-w-64 pt-2.5 pb-2.5 pl-3.5 pr-2.5">
                                            <div className="text-xs text-white">{item._doc.content}</div>
                                            <div className="text-xxs text-white items-end flex justify-end pl-14 pt-1">{item._doc.messagetime}</div>

                                        </div>}

                                    </div>
                                    {/* Message image */}
                                    {/* <div className={message}>
                            <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
                            {data.image ? (
                                <Image
                                    alt="Image"
                                    height="288"
                                    width="288"
                                    onClick={() => setImageModalOpen(true)}
                                    src={data.image}
                                    className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
                                />
                            ) : (
                                <div>{data.body}</div>
                            )}
                        </div> */}
                                    {/* {isLast && isOwn && seenList.length > 0 && (
                            <div
                                className="
            text-xs 
            font-light 
            text-gray-500
            "
                            >
                                {`Seen by ${seenList}`}
                            </div>
                        )} */}
                                    {/* seen */}
                                </div>

                                <div
                                    // className={avatar}
                                    className='pt-2.5'
                                >
                                    {!item.senderimage || item.senderimage == "" ?

                                        <Avatar sx={{ width: 18, height: 18 }}
                                        />
                                        : <Avatar
                                            sx={{ width: 18, height: 18 }}
                                            src={item.senderimage}
                                        />
                                    }

                                </div>

                            </div>}

                    </div>)
                })}

                <div

                    ref={bottomref}
                >

                </div>
            </div>

        </>
    )
}

export default MessageBox