"use client"

import React, { useState, useEffect } from 'react'
import UserList from '../UserList'
import { IoMdAdd } from 'react-icons/io'
import InputSearchfriend from '../input/InputSearchfriend'
import axios from 'axios';
import ProfileDrawer from '../modals/ProfileDrawer';
import GroupModal from './GroupModal';
import { setUserprofile } from '@/redux/slice/userprofileSlice'
import { useSelector, useDispatch } from 'react-redux'
import MobileOverview from './MobileOverview'
import { ChatState } from '@/app/Provider/ChatProvider';
import { Avatar } from '@mui/material'


const MobileItem = () => {

    const { mobilefooterselect, setMobilefooterselect, inputfieldsearch, setInputfieldsearch } = ChatState()
    const dispatch = useDispatch()

    const [curruser, setCurruser] = useState()

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

    const [user, setUser] = useState()
    const [loadingprofile, setLoadingprofile] = useState(true)


    useEffect(() => {

        setLoadingprofile(true)
        const data = {}
        axios.post('/api/account/get-profile', data)
            .then((res) => {

                // return res.data
                // console.log(res.data)
                setUser(res.data)
                setLoadingprofile(false)
                dispatch(setUserprofile(user))
            })
            .catch((callback) => {

                // console.log("callback")
            })
    }, [])


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

            {mobilefooterselect == "chat" ? <><div className=" ">
                <div className="fixed w-full left-0 right-0   z-20 bg-slate-900">
                    <div className="flex justify-between pb-3 pt-2">
                        <div className="flex justify-start">
                            <div className="pl-3 pt-4 pr-1.5">
                                <div className='container mx-auto'>
                                    <label htmlFor="email-address" className="sr-only">Name</label>
                                    <input id="inputfieldsearch" name="inputfieldsearch" type="text" autoComplete="name" className="appearance-none relative block px-3 lmd:px-5 py-3 lmd:py-3.5 border-slate-500 placeholder:slate-400 text-slate-200 rounded-xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs lmd:text-sm bg-slate-700 container mx-auto" placeholder="Search user"
                                        value={inputfieldsearch}
                                        onChange={(e) => setInputfieldsearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => { setIsOpen(true) }}
                                // type="button"
                                // fullWidth
                                // variant="contained"
                                // sx={{ mt: 2, mb: 0 }}
                                className='text-xs lmd:text-sm bg-cyan-700 text-white hover:bg-cyan-900 hover:text-white rounded-xl pl-2 pr-2 pt-1 mt-4'
                            >
                                <div className="flex flex-row">
                                    <span className='pr-0.5 text-lg font-extrabold'><IoMdAdd /></span>
                                    Group
                                </div>
                            </button>
                        </div>

                        <div className="pr-3 pt-4">
                            <div className="cursor-pointer pr-3"
                                onClick={() => setDrawerOpen(true)}                      >
                                {(curruser && curruser.image != undefined && curruser.image != "") ? <Avatar
                                    src={curruser && curruser.image}
                                    sx={{ width: 37, height: 37 }} /> :

                                    <Avatar
                                        sx={{ width: 37, height: 37 }}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Toggle modal
</button> */}


            </div>

                <div className="
pt-20
h-screen
pb-40
overflow-y-auto 
scrollbar-hide
"
                >

                    <UserList />
                </div>
            </> :

                <>
                    <div className="
                    h-screen
                    scrollbar-hide
                    overflow-y-auto

                   ">
                        <MobileOverview />
                    </div>
                </>}
        </>
    )
}

export default MobileItem