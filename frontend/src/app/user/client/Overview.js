"use client"

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Avatar, Badge, Button } from '@mui/material'
import { MdDeleteOutline } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import AddFriend from './AddFriend';
import RequestFriend from './RequestFriend';
// import { IoMdAdd } from "react-icons/io";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import Avatar_ from '../components/Avatar';
import AvatarGroup_ from '../components/AvatarGroup';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { useremail } from '@/redux/slice/user/sessionSlice';


const Overview = () => {

    // const dispatch = useDispatch()
    // dispatch(useremail());
    // const currentuser = useSelector((state) => state.session.value)
    // // console.log("email")
    // console.log(currentuser)

    // const { data: session, status, update } = useSession();
    // console.log(session.status == "authenticated")
    // console.log(session)
    // console.log(data)

    const [overview, setOverview] = useState(false)
    const [user, setUser] = useState()

    // const Profil = () => {
    //     if (email) {
    //         const data = {
    //             email
    //         }
    //         // console.log("data", data)

    //         axios.post('/api/account/get-profile', data)
    //             .then((res) => {

    //                 // console.log(res.data)
    //             })
    //             .catch((callback) => {

    //                 // console.log("callback")
    //             })
    //     }
    // }
    // Profil();



    // useEffect(() => {

    //     const data = {
    //         email: session.user.email
    //     }
    //     console.log("data", data)

    //     axios.post('/api/account/get-profile', data)
    //         .then((res) => {

    //             // console.log(res.data)
    //             setUser(res.data);
    //         })
    //         .catch((callback) => {

    //             // console.log("callback")
    //         })

    // }, [session])

   

    return (
        <>

            <div className="hidden md:block scrollbar-hide overflow-y-auto h-screen">

                <div className="pl-4 pb-2 z-20">

                    <div className="text-slate-300 text-sm pb-1 pt-12">Overview</div>
                    <div className="flex flex-col xs:flex-row justify-start gap-3 xxs:gap-7">

                        <Button
                            onClick={() => { setOverview(false) }}
                            type="button"
                            // fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 0 }}
                            className='text-xs lmd:text-sm w-full bg-cyan-600  text-white hover:bg-cyan-900 hover:text-white rounded-2xl'
                        >

                            <div className=" flex flex-row gap-2 items-center">
                                <MdOutlinePersonAddAlt className='text-white text-lg lsm:text-xl' />
                                <div className="text-slate-200">Add Friend</div>
                            </div>

                        </Button>

                        <Button
                            onClick={() => { setOverview(true) }}
                            type="button"
                            // fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 0 }}
                            className='text-xs lmd:text-sm w-full bg-cyan-600  text-white hover:bg-cyan-900 hover:text-white rounded-2xl'
                        >
                            <div className=" flex flex-row gap-2">
                                <FaUserFriends className='text-white text-lg lsm:text-xl' />
                                <div className="text-slate-200">Friend Request</div>
                            </div>
                        </Button>
                    </div>
                </div>

                <div className="pl-4 pt-10">
                    {overview == false ? <AddFriend /> : <RequestFriend />}
                </div>

            </div>

        </>
    )
}

export default Overview



{/* <div className=''><div className="mb-2">
                        {/* {data.isGroup ? <AvatarGroup users={data.users} /> : */}

//     <Avatar_
//         className=''
//         image={user && user.image}
//     />
//     {/* } */}
// </div>
// <div className='text-white pt-3.5 pb-3'>
//     {/* {title} */}
//     {user ? user.name : <div className='h-5'>{" "}</div>}
// </div>
// <div className="text-slate-200 flex flex-wrap text-xs md:text-sm">{user && user.email}</div>
// <div className="text-sm text-slate-200">
//     {/* {statusText} */}
//     Joined on
//     34
//     {user ? (user.createdAt).slice(0, 10) : <div className='h-1'><span></span></div>
//     }

// </div>

// <div className="flex gap-10 mt-12 mb-9">
//     <div

//         // onClick={() => setConfirmOpen(true)}

//         className="flex flex-col gap-3 items-center  hover:opacity-85">
//         <div className="flex items-center justify-center">
//             <MdDeleteOutline className='text-xl text-red-400' />

//         </div>
//         <div className="cursor-pointer text-sm font-light text-red-400">
//             Delete Account
//         </div>
//     </div>
// </div>

{/* <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">

                    </div>

                    <div className="text-white">
                        signout
                    </div> */}
// </div>

// <div className="text-white fixed top-14 right-8" onClick={handleSignout}>
//     <PiSignOutBold className='text-2xl cursor-pointer' />
// </div> */}


