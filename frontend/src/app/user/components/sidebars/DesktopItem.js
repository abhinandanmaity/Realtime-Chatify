
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import Avatar_ from '../Avatar';
import axios from 'axios';
import { useConversations } from '@/hooks/useConversations';
import { useDispatch, useSelector } from 'react-redux';
import { ChatState } from '@/app/Provider/ChatProvider';
import { Badge } from '@mui/material';
import { MdAttachment } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { setChatid } from '@/redux/slice/conversationidSlice'


const DesktopItem = ({ params }) => {

    // const { group, user } = useConversations();
    const router = useRouter();
    const pathname = usePathname()

    // console.log("params?.conversationid")
    // // console.log(params?.conversationid)
    // // console.log(params)
    // // console.log(router)
    // console.log(pathname)
    // Get the creation time (timestamp) from the MongoDB _id field
    // const creationTime = ObjectId(documentId).getTimestamp();

    // Calculate the difference between the current time and the creation time
    const currentTime = new Date();
    // const ageInMilliseconds = currentTime - creationTime;

    // const ageInSeconds = Math.floor(ageInMilliseconds / 1000);

    if (pathname == "/user") {
        const dispatch = useDispatch()
        dispatch(setChatid(""))
    }
    const currentChat = useSelector(state => state.currentchatid)
    const { onlineUsers, notification, setFetchnotification, fetchnotification, inputfieldsearch, setInputfieldsearch } = ChatState()

    const [user, setUser] = useState()
    const [group, setGroup] = useState()
    const [user_search, setUser_search] = useState()
    const [group_search, setGroup_search] = useState()

    useEffect(() => {

        const data = {}

        axios.post('/api/conversation/get-conversations', data)
            .then((res) => {

                // return res.data
                // console.log("conversations")
                // console.log(res.data)
                setUser(res.data.conversations)
                setGroup(res.data.groups)
                // setFetchnotification(!fetchnotification)
                if (fetchnotification == "notnotification") {

                    setFetchnotification("notification")
                } else {
                    setFetchnotification("notnotification")
                }
            })
            .catch((callback) => {

                // console.log("callback")
            })

        //   return () => {}
    }, [fetchnotification])

    useEffect(() => {

        const data = {}

        axios.post('/api/conversation/get-conversations', data)
            .then((res) => {

                // return res.data
                // console.log("conversations")
                // console.log(res.data)
                setUser(res.data.conversations)
                setGroup(res.data.groups)
                // setFetchnotification(!fetchnotification)
            })
            .catch((callback) => {

                // console.log("callback")
            })
        //   return () => {}
    }, [])

    // const dispatch = useDispatch();

    // console.log(" -- user -- ")
    // console.log(user)
    // console.log(notification)
    // console.log(currentChat?.value)
    // console.log("DesktopItem -- ", onlineUsers)

    const fetchUsers = async () => {

        if (inputfieldsearch?.trim().length <= 0) {
            setInputfieldsearch("");
            return;
        }

        const regexPattern = new RegExp(inputfieldsearch, 'i');
        const filteredNames = user.filter(name => regexPattern.test(name._doc.name));
        // console.log(filteredNames)
        setUser_search(filteredNames)

        const filteredNames_group = group.filter(name => regexPattern.test(name.Groupname));
        // console.log(filteredNames)
        setGroup_search(filteredNames_group)
        // setFriends(filteredNames)
    };

    useEffect(() => {

        fetchUsers();

    }, [inputfieldsearch])


    return (
        <>
            {(inputfieldsearch.length <= 0 && user) && user.map((item) => {
                return (
                    // bg-cyan-700
                    (currentChat?.value == item.chatid ? <li className='w-full pl-2 pb-1' key={item._doc._id}>

                        <Link href={`/user/conversations/${item.chatid}`}>
                            <div className="appearance-none relative px-3.5 lmd:px-4 py-3.5 lmd:py-4 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
                    bg-sky-800 hover:bg-sky-800
                    transition
                    ">

                                <div className="flex flex-row justify-center items-center pl-1.5">
                                    <div className="">
                                        <Avatar_ className='' image={item._doc.image} _id={item._doc._id} />
                                    </div>
                                    <div className="">

                                        <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item && item._doc.length > 19 ? (item._doc.name).slice(0, 17) + " ..." : item._doc.name}</div>
                                        {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                        {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                            <MdAttachment className="text-white text-lg " />
                                        </div> attachment</div>}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-end">
                                    <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                    {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

                                    {/* {(notification && notification.has(item.chatid)) && <div className="">

                                        <Badge badgeContent={notification.get(item.chatid)} color="success" />
                                    </div>} */}

                                </div>

                            </div>
                        </Link>
                    </li>
                        :
                        <li className='w-full pl-2 pb-1 ' key={item._doc._id}>
                            {(item.notification > 0) ?
                                <Link href={`/user/conversations/${item.chatid}`}>
                                    <div className="appearance-none relative px-3.5 lmd:px-4 py-3.5 lmd:py-4 border-green-700 placeholder:slate-400 text-black rounded-3xl border-2 focus:outline-none focus:ring-green-700 focus:border-green-700 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
                bg-green-200 hover:bg-green-200
                transition
                ">

                                        <div className="flex flex-row justify-center items-center pl-1.5">
                                            <div className="">
                                                <Avatar_ className='' image={item._doc.image} _id={item._doc._id} />
                                            </div>
                                            <div className="">

                                                <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-black">{item && item._doc.length > 19 ? (item._doc.name).slice(0, 17) + " ..." : item._doc.name}</div>
                                                {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                                {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                                    <MdAttachment className="text-black text-lg" />
                                                </div> attachment</div>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center items-end">
                                            <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) < 202) ? "a few seconds" : item.time}</div>
                                            {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}
                                            {/* <div className="text-white pr-2">io</div> */}
                                            {(item.notification > 0) && <div className="text-white pr-2 relative z-0">

                                                <Badge badgeContent={item.notification} color="success"
                                                    className=''
                                                />
                                            </div>}
                                        </div>

                                    </div>
                                </Link>
                                :

                                <Link href={`/user/conversations/${item.chatid}`}>
                                    <div className="appearance-none relative px-3.5 lmd:px-4 py-3.5 lmd:py-4 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm  bg-slate-700 flex justify-between cursor-pointer
                    hover:bg-slate-600
                    transition
                    ">

                                        <div className="flex flex-row justify-center items-center pl-1.5">
                                            <div className="">
                                                <Avatar_ className='' image={item._doc.image} _id={item._doc._id} />
                                            </div>
                                            <div className="">

                                                <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item && item._doc.length > 19 ? (item._doc.name).slice(0, 17) + " ..." : item._doc.name}</div>
                                                {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                                {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                                    <MdAttachment className="text-white text-lg" />
                                                </div> attachment</div>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center items-end">
                                            <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                            {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

                                            {/* {(notification && notification.has(item.chatid)) && <div className="">

                                                <Badge badgeContent={notification.get(item.chatid)} color="success" />
                                            </div>} */}

                                        </div>

                                    </div>
                                </Link>
                            }
                        </li>)
                )
            })
            }
            {(inputfieldsearch.length >= 1 && user_search) && user_search.map((item) => {
                return (
                    // bg-cyan-700
                    (currentChat?.value == item.chatid ? <li className='w-full pl-2 pb-1' key={item._doc._id}>

                        <Link href={`/user/conversations/${item.chatid}`}>
                            <div className="appearance-none relative px-3.5 lmd:px-4 py-3.5 lmd:py-4 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
                    bg-sky-800 hover:bg-sky-800
                    transition
                    ">

                                <div className="flex flex-row justify-center items-center pl-1.5">
                                    <div className="">
                                        <Avatar_ className='' image={item._doc.image} _id={item._doc._id} />
                                    </div>
                                    <div className="">

                                        <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item && item._doc.length > 19 ? (item._doc.name).slice(0, 17) + " ..." : item._doc.name}</div>
                                        {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                        {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                            <MdAttachment className="text-white text-lg" />
                                        </div> attachment</div>}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-end">
                                    <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                    {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

                                    {/* {(notification && notification.has(item.chatid)) && <div className="">

                                        <Badge badgeContent={notification.get(item.chatid)} color="success" />
                                    </div>} */}

                                </div>

                            </div>
                        </Link>
                    </li>
                        :
                        <li className='w-full pl-2 pb-1 ' key={item._doc._id}>
                            {(item.notification > 0) ?
                                <Link href={`/user/conversations/${item.chatid}`}>
                                    <div className="appearance-none relative px-3.5 lmd:px-4 py-3.5 lmd:py-4 border-green-700 placeholder:slate-400 text-black rounded-3xl border-2 focus:outline-none focus:ring-green-700 focus:border-green-700 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
                bg-green-200 hover:bg-green-200
                transition
                ">

                                        <div className="flex flex-row justify-center items-center pl-1.5">
                                            <div className="">
                                                <Avatar_ className='' image={item._doc.image} _id={item._doc._id} />
                                            </div>
                                            <div className="">

                                                <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-black">{item && item._doc.length > 19 ? (item._doc.name).slice(0, 17) + " ..." : item._doc.name}</div>
                                                {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                                {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                                    <MdAttachment className="text-black text-lg" />
                                                </div> attachment</div>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center items-end">
                                            <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                            {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}
                                            {/* <div className="text-white pr-2">io</div> */}
                                            {(item.notification > 0) && <div className="text-white pr-2 relative z-0">

                                                <Badge badgeContent={item.notification} color="success"
                                                    className=''
                                                />
                                            </div>}
                                        </div>

                                    </div>
                                </Link>
                                :

                                <Link href={`/user/conversations/${item.chatid}`}>
                                    <div className="appearance-none relative px-3.5 lmd:px-4 py-3.5 lmd:py-4 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm  bg-slate-700 flex justify-between cursor-pointer
                    hover:bg-slate-600
                    transition
                    ">

                                        <div className="flex flex-row justify-center items-center pl-1.5">
                                            <div className="">
                                                <Avatar_ className='' image={item._doc.image} _id={item._doc._id} />
                                            </div>
                                            <div className="">

                                                <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item && item._doc.length > 19 ? (item._doc.name).slice(0, 17) + " ..." : item._doc.name}</div>
                                                {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                                {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                                    <MdAttachment className="text-white text-lg" />
                                                </div> attachment</div>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center items-end">
                                            <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                            {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

                                            {/* {(notification && notification.has(item.chatid)) && <div className="">

                                                <Badge badgeContent={notification.get(item.chatid)} color="success" />
                                            </div>} */}

                                        </div>

                                    </div>
                                </Link>
                            }
                        </li>)
                )
            })
            }

            {(inputfieldsearch.length <= 0 && group) && group.map((item) => {
                return (

                    (currentChat?.value == item.chatid ?
                        <li className='w-full pl-2 pb-1' key={item._doc._id}>

                            <Link href={`/user/conversations/${item.chatid}`}>
                                <div className="appearance-none relative px-3.5 lmd:px-4 py-3.5 lmd:py-4 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
                    bg-sky-800 hover:bg-sky-800
                    transition
                    ">

                                    <div className="flex flex-row justify-center items-center pl-1.5">
                                        <div className="">
                                            <Avatar_ className='' image={item.Groupimage} />
                                        </div>
                                        <div className="">

                                            <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item.Groupname}</div>
                                            {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                            {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                                <MdAttachment className="text-white  text-lg" />
                                            </div> attachment</div>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-end">
                                        <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                        {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

                                        {/* {(notification && notification.has(item.chatid)) && <div className="">

                                            <Badge badgeContent={notification.get(item.chatid)} color="success" />
                                        </div>} */}

                                    </div>

                                </div>
                            </Link>
                        </li>
                        :
                        <li className='w-full pl-2 pb-1' key={item._doc._id}>
                            {(item.notification > 0) ? <Link href={`/user/conversations/${item.chatid}`}>
                                <div className="appearance-none relative px-3.5 lmd:px-4 py-3.5 lmd:py-4 border-green-700 placeholder:slate-400 text-black rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-green-700 focus:z-10 placeholder:text-sm  bg-green-200 flex justify-between cursor-pointer
                    hover:bg-green-200
                    transition
                    ">

                                    <div className="flex flex-row justify-center items-center pl-1.5">
                                        <div className="">
                                            <Avatar_ className='' image={item.Groupimage} />
                                        </div>
                                        <div className="">

                                            <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-black">{item.Groupname}</div>
                                            {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                            {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                                <MdAttachment className="text-black  text-lg" />
                                            </div>attachment</div>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-end">
                                        <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                        {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}
                                        {/* <div className="text-white">io</div> */}

                                        {(item.notification > 0) && <div className="text-white pr-2 relative z-0">

                                            <Badge badgeContent={item.notification} color="success"
                                                className=''
                                            />
                                        </div>}
                                    </div>

                                </div>
                            </Link>
                                :
                                <Link href={`/user/conversations/${item.chatid}`}>
                                    <div className="appearance-none relative px-3.5 lmd:px-4 py-3.5 lmd:py-4 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm bg-slate-700  flex justify-between cursor-pointer
                    hover:bg-slate-600
                    transition
                    ">

                                        <div className="flex flex-row justify-center items-center pl-1.5">
                                            <div className="">
                                                <Avatar_ className='' image={item.Groupimage} />
                                            </div>
                                            <div className="">

                                                <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item.Groupname}</div>
                                                {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                                {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                                    <MdAttachment className="text-white text-lg" />
                                                </div> attachment</div>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center items-end">
                                            <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                            {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}
                                            {/* {(notification && notification.has(item.chatid)) && <div className="">

                                                <Badge badgeContent={notification.get(item.chatid)} color="success" />
                                            </div>} */}
                                        </div>

                                    </div>
                                </Link>
                            }
                        </li>)
                )
            })
            }
            {(inputfieldsearch.length >= 1 && group_search) && group_search.map((item) => {
                return (

                    (currentChat?.value == item.chatid ?
                        <li className='w-full pl-2 pb-1' key={item._doc._id}>

                            <Link href={`/user/conversations/${item.chatid}`}>
                                <div className="appearance-none relative px-3.5 lmd:px-4 py-3.5 lmd:py-4 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
                    bg-sky-800 hover:bg-sky-800
                    transition
                    ">

                                    <div className="flex flex-row justify-center items-center pl-1.5">
                                        <div className="">
                                            <Avatar_ className='' image={item.Groupimage} />
                                        </div>
                                        <div className="">

                                            <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item.Groupname}</div>
                                            {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                            {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex ">
                                                <div className='pr-1.5'>
                                                    <MdAttachment className="text-white text-lg" />
                                                </div>
                                                attachment</div>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-end">
                                        <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                        {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

                                        {/* {(notification && notification.has(item.chatid)) && <div className="">

                                            <Badge badgeContent={notification.get(item.chatid)} color="success" />
                                        </div>} */}

                                    </div>

                                </div>
                            </Link>
                        </li>
                        :
                        <li className='w-full pl-2 pb-1' key={item._doc._id}>
                            {(item.notification > 0) ? <Link href={`/user/conversations/${item.chatid}`}>
                                <div className="appearance-none relative px-3.5 lmd:px-4 py-3.5 lmd:py-4 border-green-700 placeholder:slate-400 text-black rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-green-700 focus:z-10 placeholder:text-sm  bg-green-200 flex justify-between cursor-pointer
                    hover:bg-green-200
                    transition
                    ">

                                    <div className="flex flex-row justify-center items-center pl-1.5">
                                        <div className="">
                                            <Avatar_ className='' image={item.Groupimage} />
                                        </div>
                                        <div className="">

                                            <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-black">{item.Groupname}</div>
                                            {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                            {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                                <MdAttachment className="text-black  text-lg" />
                                            </div>attachment</div>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-end">
                                        <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                        {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}
                                        {/* <div className="text-white">io</div> */}

                                        {(item.notification > 0) && <div className="text-white pr-2 relative z-0">

                                            <Badge badgeContent={item.notification} color="success"
                                                className=''
                                            />
                                        </div>}
                                    </div>

                                </div>
                            </Link>
                                :
                                <Link href={`/user/conversations/${item.chatid}`}>
                                    <div className="appearance-none relative px-3.5 lmd:px-4 py-3.5 lmd:py-4 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm bg-slate-700  flex justify-between cursor-pointer
                    hover:bg-slate-600
                    transition
                    ">

                                        <div className="flex flex-row justify-center items-center pl-1.5">
                                            <div className="">
                                                <Avatar_ className='' image={item.Groupimage} />
                                            </div>
                                            <div className="">

                                                <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item.Groupname}</div>
                                                {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                                {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                                    <MdAttachment className="text-white text-lg" />
                                                </div>attachment</div>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center items-end">
                                            <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                            {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}
                                            {/* {(notification && notification.has(item.chatid)) && <div className="">

                                                <Badge badgeContent={notification.get(item.chatid)} color="success" />
                                            </div>} */}
                                        </div>

                                    </div>
                                </Link>
                            }
                        </li>)
                )
            })
            }

        </>
    )
}

export default DesktopItem


