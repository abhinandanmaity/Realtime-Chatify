"use client"

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import InputSearchfriend from '../input/InputSearchfriend'
import { IoMdAdd } from "react-icons/io";
import Button from '@mui/material/Button';
// import Button from '@mui/joy/Button';
import UserList from '../UserList';
import GroupModal from './GroupModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { useremail } from '@/redux/slice/user/sessionSlice';
import { Avatar, Badge } from '@mui/material';
import { PiSignOutBold } from "react-icons/pi";
import axios from 'axios';
import ProfileDrawer from '../modals/ProfileDrawer';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { setUserprofile } from '@/redux/slice/userprofileSlice'
import { ChatState } from '@/app/Provider/ChatProvider';

const DesktopSidebar = () => {


    const dispatch = useDispatch()

    const router = useRouter()
    const [curruser, setCurruser] = useState()
    const { inputfieldsearch, setInputfieldsearch } = ChatState()

    useEffect(() => {

        axios.post('/api/account/get-current-user')
            .then((res) => {
                // console.log(res.data)
                setCurruser(res.data)
            })
            .catch(() => {

                // console.log("callback curr")
            })
    }, [])



    const [isOpen, setIsOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // const currentuser = useSelector((state) => state.session.value)
    // // console.log("email")
    // console.log(currentuser)

    const [user, setUser] = useState()
    const [loadingprofile, setLoadingprofile] = useState(true)

    // console.log("user", user)

    const handleSignout = () => {

        signOut()
            .then(() => {

                router.push("/sign-in")
                window.location.reload();

                toast.success('Sign Out Successfully', {
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

                if (callback) {

                    if (callback.error) {

                        toast.error('Poor Network Connection', {
                            position: "bottom-center",
                            autoClose: 941,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    if (callback.ok && !callback.error) {

                        router.push("/sign-in")
                        window.location.reload();

                        toast.success('Sign Out Successfully', {
                            position: "bottom-center",
                            autoClose: 941,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }
            })
    }

    const handleShowprofile = () => {

        setLoadingprofile(true)
        const data = {}
        axios.post('/api/account/get-profile', data)
            .then((res) => {

                // return res.data
                // console.log(res.data)
                setUser(res.data)
                setLoadingprofile(false)
            })
            .catch((callback) => {

                // console.log("callback")
            })
    }
    useEffect(() => {

        setLoadingprofile(true)
        const data = {}
        axios.post('/api/account/get-profile', data)
            .then((res) => {

                // return res.data
                // console.log(res.data)
                setUser(res.data)
                setLoadingprofile(false)
            })
            .catch((callback) => {

                // console.log("callback")
            })
    }, [])

    dispatch(setUserprofile(user))

    return (
        <>
            <ProfileDrawer
                loadingprofile={loadingprofile}
                data={user}
                curruser={curruser}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />

            <GroupModal isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="
               fixed hidden md:block w-max 
            ">
                <div className="flex justify-normal pb-3 pt-2">

                    <div className="pl-2 pt-4 pr-1.5">
                        <InputSearchfriend />
                    </div>

                    <button
                        onClick={() => { setIsOpen(true) }}
                        // type="button"
                        // fullWidth
                        // variant="contained"
                        // sx={{ mt: 2, mb: 0 }}
                        className='text-xs lmd:text-sm bg-cyan-700 text-white hover:bg-cyan-900 hover:text-white rounded-xl pl-2 pr-2 pt-1 mt-2 '
                    >
                        <div className="flex flex-row">
                            <span className='pr-0.5 text-lg font-extrabold'><IoMdAdd /></span>
                            Group
                        </div>
                    </button>
                    {/* <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Toggle modal
                    </button> */}


                </div>

                <div className="
                
                h-screen
                pb-40
                overflow-y-auto 
                scrollbar-hide
                "
                >

                    <UserList />
                </div>


                <div className="text-white fixed bottom-3 left-6 w-72 lmd:w-82" >

                    <div className="flex flex-row justify-between  items-center
                    border-2
                    border-slate-700
                    bg-slate-800
                    rounded-lg
                    py-2.5 px-1.5
                    z-40
                    "
                    // onClick={handleShowprofile}
                    >
                        <div className="px-1.5 flex flex-row items-center">

                            <div className="cursor-pointer"
                                onClick={() => setDrawerOpen(true)}                      >
                                {(curruser && curruser.image != undefined && curruser.image != "") ? <Avatar
                                    src={curruser && curruser.image}
                                    sx={{ width: 28, height: 28 }} /> :

                                    <Avatar
                                        sx={{ width: 28, height: 28 }}
                                    />
                                }
                            </div>
                            <div className="pl-2 text-xs lmd:text-sm text-slate-200">
                                {curruser && curruser.name}
                            </div>
                        </div>
                        <PiSignOutBold
                            onClick={handleSignout} className='text-lg cursor-pointer ' />
                    </div>
                </div>

            </div>


        </>
    )
}

export default DesktopSidebar