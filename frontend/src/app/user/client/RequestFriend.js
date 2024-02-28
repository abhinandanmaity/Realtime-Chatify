"use client"

import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material'
import React from 'react'
import { PiCheckCircleDuotone } from "react-icons/pi";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
// import ClearSharpIcon from '@mui/icons-material/ClearSharp';
// import CheckSharpIcon from '@mui/icons-material/CheckSharp';


const RequestFriend = () => {

    const [request, setRequest] = useState()

    // console.log("request")
    // // console.log(request)

    // {
    //     request && request.map((item)=>{
    //         console.log("item ", item)
    //     })
    // }


    const handlesubmitaccept = (email) => {
        // e.preventDefault();

        const data = {
            email, reques: true
        };

        // console.log(data)

        axios.post(`/api/friend/accept-friendrequest`, data)
            .then(() => {

                let data_ = {
                    receiveremail: email,
                    isGroupChat: false
                }

                axios.post(`/api/chat/create-chat`, data_)
                    .then(() => {

                        toast.success('Accept Successfully', {
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

                        if (callback.response.data.error) {

                            toast.error('Slow internet connection', {
                                position: "bottom-center",
                                autoClose: 941,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    })

            })
            .catch((callback) => {
                // console.log(callback)
                // console.log("callback")
                // console.log(callback.response.data.error)

                if (callback.response.data.error) {

                    toast.error('Internal Server Error !', {
                        position: "bottom-center",
                        autoClose: 941,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
    }

    const handlesubmitreject = (email) => {

        // e.preventDefault();


        const data = {
            email, reques: false
        };

        axios.post(`/api/friend/accept-friendrequest`, data)
            .then(() => {

                toast.success('Request Reject Successfully', {
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
                // console.log(callback)
                // console.log("callback")
                // console.log(callback.response.data.error)

                if (callback.response.data.error) {

                    toast.error('Check Your Internet connection', {
                        position: "bottom-center",
                        autoClose: 941,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

            })


    }

    useEffect(() => {

        const data = {}
        axios.post(`/api/friend/get-friendrequest`, data)
            .then((res) => {

                // console.log(res.data.friends)
                setRequest(res.data.friends)
            })
            .catch((callback) => {
                // console.log(callback)
                // console.log("callback")

            })

    }, [handlesubmitaccept, handlesubmitreject])

    return (
        <>

            <div className="">
                <div className="text-xl text-white font-extrabold pb-6">Friends Request</div>

                {request && request.map((item) => {
                    return (

                        <div className="mt-2">
                            <div className=" appearance-none relative px-4 lmd:px-5 py-2.5 lmd:py-3 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm  bg-slate-700 flex justify-between "
                                key={item._id}
                            >

                                <div className="flex flex-row items-center pl-1.5">
                                    <div className="">
                                        {item.senderimage != undefined ? <Avatar
                                            src={item.senderimage}
                                            sx={{ width: 37, height: 37 }} /> :

                                            <Avatar
                                                sx={{ width: 37, height: 37 }}
                                            />
                                        }
                                    </div>
                                    <div className="">

                                        <div className="text-xs lmd:text-sm pl-3 text-white">{item.sendername}</div>
                                        <div className="text-xxs lmd:text-xs pl-3">{item.sender}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    {/* <div className="text-xxxs lmd:text-xxs">a few seconds</div> */}
                                    <div className='pr-3.5'>
                                        <PiCheckCircleDuotone className="bg-green-700 rounded-full text-xl lmd:text-2xl cursor-pointer text-white"
                                            onClick={() => { handlesubmitaccept(item.sender) }} />
                                    </div>
                                    <div >
                                        <RxCrossCircled className="bg-red-600 rounded-full text-xl lmd:text-2xl cursor-pointer text-white"
                                            onClick={() => { handlesubmitreject(item.sender) }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                }

            </div>
        </>
    )
}

export default RequestFriend