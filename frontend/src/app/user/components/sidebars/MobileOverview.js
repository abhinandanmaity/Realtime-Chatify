"use client"

import React, { useState } from 'react'
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { Button } from '@mui/material'
import AddFriend from '../../client/AddFriend';
import RequestFriend from '../../client/RequestFriend';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MobileOverview = () => {


    const [overview, setOverview] = useState(false)

    return (
        <>
            <div className="">
                <div className=" pb-2 z-20 
              
                ">
                    <div className="">
                        <div className="text-slate-200 text-sm pb-1 pt-10">Overview</div>
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
                </div>

                {/* <div className="">
                    {overview == false ?
                        <div className=''>
                            <div className="text-xl text-white font-extrabold pb-6">Add Friends</div>
                            <div className="flex flex-col gap-2">

                                <div className="flex flex-row gap-2  ">
                                    <input id="searchInput" name="searchInput" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2.5 border-slate-500 placeholder:slate-400 text-slate-300 rounded-lg border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs sm:text-sm bg-slate-700" placeholder="Search User"

                                        value={searchInput} onChange={handleInputChange}
                                        ref={inputref}
                                    />
                                    {!isbtnLoading ?
                                        <Button
                                            type="button"
                                            // fullWidth
                                            variant="contained"
                                            sx={{ mt: 0, mb: 0 }}
                                            className='text-xs lmd:text-sm  bg-cyan-600  text-white hover:bg-cyan-900 hover:text-white rounded-2xl '
                                            onClick={handlesubmit}
                                        >
                                            Add

                                        </Button> :
                                        <Button
                                            type="button"
                                            // fullWidth
                                            variant="contained"
                                            sx={{ mt: 0, mb: 0 }}
                                            className='text-xs lmd:text-sm  text-white  hover:text-white bg-cyan-900 hover:bg-cyan-900 rounded-2xl cursor-not-allowed'
                                        >
                                            <Box sx={{ display: 'flex' }}>
                                                <CircularProgress className='font-extrabold' size={25} />
                                            </Box>

                                        </Button>
                                    }
                                </div>
                            </div>

                        </div>
                        : <></>}
                </div> */}
                <div className="
                h-screen
                overflow-y-auto
                scrollbar-hide
                pt-4
                pb-12
                ">
                    {overview == false ?
                        <div>
                            <AddFriend />
                        </div>
                        :
                        <RequestFriend />}
                </div>

            </div>
        </>
    )
}

export default MobileOverview