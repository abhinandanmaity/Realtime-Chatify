"use client"

import { Avatar, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Modal from '../modals/Modal'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ChatState } from '@/app/Provider/ChatProvider';


const EditprofileModal = ({ isOpen, onClose, image }) => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [updatedimage, setUpdatedimage] = useState(image ? image : "")
    const [isLoading, setIsLoading] = useState(false)

    const { setUpdateprofile, updateprofile } = ChatState();

    const handlechange = (e) => {

        if (e.target.name == "name") {
            setName(e.target.value);
        }
        else if (e.target.name == "description") {
            setDescription(e.target.value);
        }
    }

    const [profile, setProfile] = useState()
    const [imageLoading, setImageLoading] = useState(false)
    const [profile_image, setProfile_image] = useState("")

    const handleupdate = (e) => {

        e.preventDefault();

        // console.log(" -- updatedimage -- ")
        // console.log(profile_image)
        // setUpdatedimage("")

        let mess_ = name.trim()
        let mess = description.trim()
        let name_ = mess_.length;
        let description_ = mess.length;

        let data;
        if(profile_image != "" || profile_image.length > 1){
            if (name_ > 0 && description_ > 0) {
                data = {
                    name, desc: description, image: profile_image
                }
            }
            else if (name_ > 0) {
                data = {
                    name, image: profile_image
                }
            }
            else if (description_ > 0) {
                data = {
                    desc: description, image: profile_image
                }
            } else {
                data = {
                    image: profile_image
                }
            }
        }else{

            if (name_ > 0 && description_ > 0) {
                data = {
                    name, desc: description, image: updatedimage
                }
            }
            else if (name_ > 0) {
                data = {
                    name, image: updatedimage
                }
            }
            else if (description_ > 0) {
                data = {
                    desc: description, image: updatedimage
                }
            } else {
                data = {
                    image: updatedimage
                }
            }
        }
        
        
        // console.log(data)
        setIsLoading(true)
        axios.post('/api/account/edit-profile', data)
            .then((res) => {

                if(updateprofile == "notupdateprofile"){

                    setUpdateprofile("updateprofile")
                }else{
                    setUpdateprofile("notupdateprofile")
                }
                setName("");
                setDescription("");
                onClose()

            })
            .catch((callback) => {

                toast.error('Slow Internet Speed', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // console.log("callback")
            })
            .finally(() => { setIsLoading(false) })
    }

    const handleimagechange = (e) => {

        e.preventDefault()
        // setProfile("")
        setProfile(() => "")
    }

    const handleupload = (e) => {

        e.preventDefault();

        // const axios = require('axios').default;

        if (!profile || !profile.name || !profile.size) {

            toast.error("Choose your file first", {
                position: "bottom-center",
                autoClose: 901,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const fileSize = (profile.size / 1000)
        const fileExt = profile.name.split(".")[1].toLowerCase()

        if (fileSize > 1700) {

            toast.error("File size must be less than 1700kb", {
                position: "bottom-center",
                autoClose: 901,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (!["jpg", "png", "jpeg"].includes(fileExt)) {

            toast.error("File extension must be in jpg or png", {
                position: "bottom-center",
                autoClose: 901,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        setImageLoading(true);

        const data = new FormData();
        data.append("file", profile)
        data.append('cloud_name', 'flyingbird')
        data.append('upload_preset', 'Squiggiy-S-upload');

        fetch('https://api.cloudinary.com/v1_1/flyingbird/image/upload', {

            method: 'POST',
            body: data
        })
            .then(r => r.json())
            .then((data) => {

                // setProfile(data.secure_url)
                setProfile_image(data.secure_url)
                setProfile()
                toast.success('image upload successfully', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // console.log(data)
            }).catch((err) => {

                setImageLoading(false);
                toast.error("Check internet connection", {
                    position: "bottom-center",
                    autoClose: 901,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    // useEffect(() => {

    //     setUpdatedimage(URL.createObjectURL(profile))
    // }, [profile])


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>

                <div className="">
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-6">
                            <div
                                className="
                text-sm 
                font-semibold 
                leading-7 
                text-slate-200
              "
                            >
                                Edit Profile
                            </div>
                            <p className="mt-1 text-xs leading-6 text-gray-300">
                                Edit your profile information
                            </p>

                            <div className="mt-5 flex flex-col gap-y-2">
                                {/* <Input
                                    disabled={isLoading}
                                    label="Name"
                                    id="name"
                                    // errors={errors}
                                    required
                                // register={register}
                                /> */}

                                <div className='pt-1'>
                                    <label htmlFor="email-address" className="sr-only">Name</label>
                                    <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2.5 border-slate-500 placeholder:slate-400 text-slate-300 rounded-lg border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs sm:text-sm bg-slate-700" placeholder="Name"
                                        onChange={handlechange}
                                        value={name} />
                                </div>
                                <div className=''>
                                    <label htmlFor="email-address" className="sr-only">Description</label>
                                    <input id="description" name="description" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2.5 border-slate-500 placeholder:slate-400 text-slate-300 rounded-lg border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs sm:text-sm bg-slate-700" placeholder="Description"
                                        onChange={handlechange}
                                        value={description} />
                                </div>
                                <div className='flex items-center pl-3 pt-4 pb-5'>
                                    <div className=" pr-9">
                                        {!image || image == "" ?

                                            <Avatar sx={{ width: 34, height: 34 }}
                                            />
                                            :
                                            <Avatar
                                                sx={{ width: 34, height: 34 }}
                                                src={(profile_image && profile_image != "") ? profile_image : image}
                                            />
                                        }
                                    </div>
                                    {/* <button
                                        type="button"
                                        className="bg-cyan-600 hover:bg-cyan-700 text-xs pt-1 pb-1 pl-3 pr-3 rounded-2xl
                                        shadow-xl"
                                    // onClick={handleupdateimage}
                                    >
                                        Change
                                    </button> */}

                                    {(!profile || profile == "") && <Button component="label"
                                        className="bg-cyan-600 hover:bg-cyan-700 text-xs pt-1 pb-1 pl-3 pr-3 rounded-2xl
                                    shadow-xl text-white"
                                    // sx={{
                                    //     width: 20,
                                    //     height: 30,
                                    //     padding: 1
                                    // }}
                                    >
                                        {/* choose */}

                                        {/* <button> */}
                                        Change

                                        <input hidden accept="image/*" multiple type="file" onChange={(e) => {

                                            setProfile(e.target.files[0])
                                            // console.log("input field")
                                            // console.log(e.target.files[0])
                                        }} />

                                    </Button>}

                                    {(profile && profile != "") && <button type="button" className='bg-cyan-600 hover:bg-cyan-700 text-xs pt-1.5 pb-1.5 pl-3.5 pr-3.5 rounded-2xl
                                        shadow-xl text-white'
                                        onClick={handleupload}>
                                        upload
                                    </button>}

                                </div>


                            </div>
                        </div>
                    </div>

                    <div
                        className="
            flex 
            items-center 
            justify-end 
            gap-x-4
          "
                    >

                        <button
                            // secondary
                            onClick={onClose}
                            type="button"
                            // fullWidth
                            // variant="contained"
                            // sx={{ mt: 3, mb: 1 }}
                            className='w-full bg-cyan-600 text-white hover:bg-cyan-900 hover:text-white rounded-2xl py-1 lmd:py-1.5 text-sm'
                        >
                            Close
                        </button>


                        {isLoading ? (
                            <button
                                // type="submit"
                                type="button"
                                fullWidth
                                variant="contained"
                                // sx={{ mt: 3, mb: 1 }}
                                className='w-full text-white bg-cyan-900 rounded-2xl py-1.5 lmd:py-2 text-sm cursor-not-allowed item-center'
                            >
                                <Box sx={{}}>
                                    <CircularProgress className='font-extrabold' size={20} />
                                </Box>
                                {/* display: 'flex' */}
                            </button>
                        ) : (
                            <button
                                // type="submit"
                                type="button"
                                fullWidth
                                variant="contained"
                                // sx={{ mt: 3, mb: 1 }}
                                className='w-full bg-cyan-600 text-white hover:bg-cyan-900 hover:text-white rounded-2xl py-1.5 lmd:py-2 text-sm'
                                onClick={handleupdate}
                            >
                                update
                            </button>
                        )}


                    </div>
                </div>

            </Modal>

        </>
    )
}

export default EditprofileModal