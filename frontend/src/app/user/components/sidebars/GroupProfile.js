"use client"

import React, { useState, useEffect } from 'react'
import { PiSignOutBold } from "react-icons/pi";
import { Avatar, Badge } from '@mui/material';
import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from "react-icons/ci";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import axios from 'axios'
import EditGroupModal from './EditGroupModal';
import DeleteGroupModal from './DeleteGroupModal';
import ConfirmationModal from './ConfirmationModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setGroupprofile } from '@/redux/slice/groupprofileSlice';
// import {useRefrese} from '@/app/hooks/useRefrese';
import { ChatState } from '@/app/Provider/ChatProvider';


const GroupProfile = ({ data, curruser, conversationid }) => {


    const dispatch = useDispatch()
    const { updategroup, onlineUsers } = ChatState();

    const isActive = false;
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [show, setShow] = useState(false);
    const [refr, setRefr] = useState();
    const [searchInput, setSearchInput] = useState("")
    const [groupname, setGroupname] = useState("")
    const [friends, setFriends] = useState()
    const [selectedfriend, setSelectedfriend] = useState([])
    const [selectedfriendSet, setSelectedfriendSet] = useState(new Set())
    // const [groupdata, setGroupdata] = useState(data)


    const onClose = () => {

        setIsOpen(false)
        setSearchInput("")
        setFriends()
        setSelectedfriendSet(new Set())
        setSelectedfriend([])
        setGroupname("")
    }

    const adminExistMemberGroup = (userid) => {

        // e.preventDefault()

        if (!data) {
            return;
        }
        setRefr("true")
        // console.log(data)
        axios.post('/api/chat/admin-exist-member', { memberid: userid, id: data._doc._id })
            .then((res) => {

                const dat = {
                    id: conversationid
                }
                axios.post('/api/chat/get-groupProfile', dat)
                    .then((res) => {

                        // const dispatch = useDispatch()
                        dispatch(setGroupprofile(res.data.group))

                        // setGroupdata(() => res.data.group)
                        // data = res.data.group
                        // console.log("data -- 1")
                        // console.log(data)
                    })
                    .catch((callback) => {

                        // console.log("callback")
                    })

                toast.success('Remove Successfully', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            })
            .catch((callback) => {

                // console.log("callback")
            })
            .finally(() => setRefr("false"))
    }



    useEffect(() => {

        // setLoadingprofile(true)
        const dat = {
            id: conversationid
        }
        axios.post('/api/chat/get-groupProfile', dat)
            .then((res) => {

                dispatch(setGroupprofile(res.data.group))

                // console.log(updategroup)

            })
            .catch((callback) => {

                // console.log("callback")
            })
    }, [])
    useEffect(() => {

        // setLoadingprofile(true)
        const dat = {
            id: conversationid
        }
        axios.post('/api/chat/get-groupProfile', dat)
            .then((res) => {

                dispatch(setGroupprofile(res.data.group))

                // console.log("-- updategroup --")
            })
            .catch((callback) => {

                // console.log("callback")
            })
    }, [updategroup])

    const groupdata = useSelector(state => state.groupprofile)
    // console.log(groupdata)
    // console.log(groupdata)
    // // console.log(r)
    // console.log(refres)
    // console.log(curruser._id)
    // console.log(data._doc.admin)

    // useEffect(() => {

    //     // console.log("groupdata")

    // }, [groupdata])

    return (
        <>
            <ConfirmationModal confirmOpen={confirmOpen} onClose={() => setConfirmOpen(false)}
                data={data} />
            <DeleteGroupModal isOpenDelete={isOpenDelete} onClose={() => setIsOpenDelete(false)}
                dat={data}
            />
            <EditGroupModal
                isOpen={isOpen}
                onClose={onClose}
                show={show}
                setShow={setShow}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                groupname={groupname}
                setGroupname={setGroupname}
                friends={friends}
                setFriends={setFriends}
                selectedfriend={selectedfriend}
                setSelectedfriend={setSelectedfriend}
                selectedfriendSet={selectedfriendSet}
                setSelectedfriendSet={setSelectedfriendSet}
                data={groupdata.value}
            />

            {((curruser && groupdata) && curruser._id == groupdata.value?._doc?.admin) && <div className="relative cursor-pointer left-8 text-2xl" onClick={() => { setIsOpen(true) }}>
                <CiEdit />
            </div>}
            {/* <div className="relative cursor-pointer left-8 text-2xl" onClick={() => { setIsOpen(true) }}>
                <CiEdit />
            </div> */}

            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                <div className="flex flex-col items-center">
                    <div className="mb-5">

                        {groupdata && (groupdata.value?._doc?.Groupimage == undefined || groupdata.value?._doc?.Groupimage == "") ?
                            (isActive ? <Badge
                                overlap="Circular" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} variant='dot' color='success'                  >
                                <Avatar sx={{ width: 44, height: 44 }}
                                />
                            </Badge>
                                : <Avatar sx={{ width: 44, height: 44 }}
                                />)
                            : (isActive ? <Badge
                                overlap="Circular" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} variant='dot' color='success'                  >
                                <Avatar
                                    sx={{ width: 44, height: 44 }}
                                    src={groupdata && groupdata.value?._doc?.Groupimage}
                                />
                            </Badge> : <Avatar
                                sx={{ width: 44, height: 44 }}
                                src={groupdata && groupdata.value?._doc?.Groupimage}
                            />)
                        }                       </div>
                    <div className='text-sm font-semibold'>
                        {groupdata.value?._doc?.Groupname}
                    </div>
                    <div>
                        <div
                            className="
                                    mt-1 
                                    text-xs 
                                    text-gray-900
                                    flex
                                  "
                        >
                            <div className="mr-1">

                                Created on
                            </div>
                            {(groupdata != undefined && groupdata.value?._doc?.createdAt != undefined) ? ((groupdata.value?._doc?.createdAt).slice(0, 10)) : ""}
                        </div>
                    </div>


                </div>


            </div>
            <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">


                    {groupdata.value?._doc?.Groupdesc && (<div className='mt-10'>
                        <div className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  
                                " >
                            <div className='font-semibold mt-2'> Description :</div>
                            <div className='flex flex-wrap text-sm'>{groupdata.value?._doc?.Groupdesc}</div>
                        </div>
                    </div>
                    )}

                    <div>
                        <dt
                            className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                  pt-9
                                "
                        >
                            Accounts
                        </dt>
                        {/* <dd 
                                className="
                                  mt-1 
                                  text-sm 
                                  text-gray-900 
                                  sm:col-span-2
                                "
                              >
                                {data.users.map((user) => user.email).join(', ')}
                              </dd> */}
                        <div className="mt-2 text-sm">
                            {
                                groupdata && groupdata.value?.participant?.map((item) => {
                                    return (
                                        <div className="flex flex-row justify-between items-center pl-3 pr-3 pt-2.5">
                                            <div className="flex flex-row justify-start items-center pl-1.5">
                                                <div className="">
                                                    {(!item?.image || item?.image == "") ?
                                                        (onlineUsers.includes(item._id) ? <Badge
                                                            overlap="Circular" anchorOrigin={{ horizontal: "left", vertical: "bottom" }} variant='dot' color='success'                  >
                                                            <Avatar sx={{ width: 31, height: 31 }}
                                                            />
                                                        </Badge>
                                                            : <Avatar sx={{ width: 31, height: 31 }}
                                                            />)
                                                        : (onlineUsers.includes(item._id) ? <Badge
                                                            overlap="Circular" anchorOrigin={{ horizontal: "left", vertical: "bottom" }} variant='dot' color='success'                  >
                                                            <Avatar
                                                                sx={{ width: 31, height: 31 }}
                                                                src={item && item?.image}
                                                            />
                                                        </Badge> : <Avatar
                                                            sx={{ width: 31, height: 31 }}
                                                            src={item && item?.image}
                                                        />)
                                                    }
                                                </div>
                                                <div className="">

                                                    <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-black">{item?.name}</div>
                                                    {(item && item?.email) && <div className="text-xxs lmd:text-xs pl-3">{item?.email.length > 17 ? (item?.email).slice(0, 17) + " ..." : item?.email}</div>}
                                                </div>
                                            </div>

                                            <div className="item-center text-center">                       {item._id != groupdata.value?._doc?.admin ? (curruser._id == groupdata.value?._doc?.admin && <div className=""
                                                onClick={() => adminExistMemberGroup(item._id)}>
                                                <PiSignOutBold className="text-red-600 text-md font-bold cursor-pointer" />
                                            </div>) :
                                                <div className="bg-green-200 rounded-xl">
                                                    <div className='p-0.5 text-green-800 pl-1.5 pr-1.5 text-xs'>

                                                        admin

                                                    </div>
                                                </div>
                                            }
                                            </div>                         </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </dl>

                <div className=" my-14">
                    <div className="">
                        {((curruser && groupdata) && curruser._id == groupdata.value?._doc?.admin) && <div

                            onClick={() => { setIsOpenDelete(true) }}

                            className="flex flex-col gap-3 items-center  hover:opacity-85 justify-between pb-4">
                            <div className="flex items-center justify-between">
                                <MdDeleteOutline className='text-xl text-red-600' />

                            </div>
                            <div className="cursor-pointer text-sm text-red-500">
                                Delete Group
                            </div>
                        </div>}

                        {(curruser && groupdata) && curruser._id != groupdata.value?._doc?.admin &&

                            (<div className=" pl-3.5 pr-3.5 "

                            >
                                <div

                                    onClick={() => setConfirmOpen(true)}

                                    className="flex items-center  hover:opacity-85 justify-between bg-red-200 rounded-lg cursor-pointer ">
                                    <div className="flex items-center p-3"

                                    >
                                        <PiSignOutBold className='text-xl text-red-600' />

                                    </div>
                                    <div className="text-sm  text-red-500 p-3">
                                        Exit Group
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>


        </>
    )
}

export default GroupProfile