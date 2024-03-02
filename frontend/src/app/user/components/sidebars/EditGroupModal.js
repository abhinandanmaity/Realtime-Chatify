'use client';

import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Button } from '@mui/material'
import Modal from '../modals/Modal'
import axios from 'axios'
import { RxCrossCircled } from "react-icons/rx";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChatState } from '@/app/Provider/ChatProvider';



const EditGroupModal = ({ isOpen, onClose, show, setShow, searchInput, setSearchInput, groupname, setGroupname, friends, setFriends, selectedfriend, setSelectedfriend, selectedfriendSet, setSelectedfriendSet, data }) => {

    const inputref = useRef(null)
    const { setUpdategroup, updategroup } = ChatState();

    const [isbtnLoading, setIsbtnLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState("")
    const [updatedimage, setUpdatedimage] = useState(data && data?._doc?.Groupimage ? data?._doc?.Groupimage : "")

    const fetchUsers = async () => {

        if (searchInput.trim().length <= 0) {
            setSearchInput("");
            setFriends()
            return;
        }
        try {
            setIsLoading(true)
            setFriends()
            // console.log(inputValue)
            const response = await axios.post('/api/setting/finduser', { searchInput });
            // const op = []
            // response.data.conversations.map((item) => {
            //     if (item.name)
            //         op.push(item)
            // })
            // console.log(response.data.conversations)
            const regexPattern = new RegExp(searchInput, 'i');
            const filteredNames = response.data.conversations.filter(name => regexPattern.test(name.name));
            // console.log(filteredNames)


            let arra = []
            filteredNames.forEach(elemen => {

                let i = 1;
                data._doc.participants.forEach(element => {

                    if (element == elemen._id) {
                        // console.log(element)
                        // console.log(elemen._id)
                        i = 0;
                    }
                });
                if (i == 1) {
                    // console.log("i == 1")
                    arra.push(elemen)
                }
            });

            // console.log(arra)
            setFriends(arra)
            // return filteredNames;
        } catch (error) {
            console.error('Error fetching users:', error);
            // return [];
            setFriends([])
        } finally {
            setIsLoading(false)
        }
    };

    const handleInputChange = (e) => {

        // console.log(e)
        if (e.target.name == "searchInput") {

            setSearchInput(e.target.value);
        } else if (e.target.name == "groupname") {

            setGroupname(e.target.value);
        } else if (e.target.name == "description") {
            setDescription(e.target.value);
        }
    }

    const handleupdateimage = (e) => {

        e.preventDefault();
        let data = {
            groupnamename, description, updatedimage
        }

        axios.post('/api/account/edit-profile', data)
            .then((res) => {


            })
            .catch((callback) => {

                // console.log("callback")
            })
    }

    const handleSelectfriend = (user) => {

        // console.log("selected")
        setSelectedfriend([...selectedfriend, user])
        setSelectedfriendSet(new Set([...selectedfriendSet, user.email]))

        setSearchInput("")
        setFriends()
        inputref.current.focus()
    }
    const handleDeletefriend = (user) => {

        // console.log(user)
        const updatefriend = selectedfriend.filter((element) =>
            element._id !== user._id
        )

        setSelectedfriend(updatefriend)
        // console.log(user)
        // console.log(updatefriend)

        const updateEmails = new Set(selectedfriendSet)
        updateEmails.delete(user.email)
        setSelectedfriendSet(updateEmails)
    }


    const [profile, setProfile] = useState()
    const [imageLoading, setImageLoading] = useState(false)
    const [profile_image, setProfile_image] = useState("")

    const editGroup = (e) => {

        e.preventDefault()
        setIsbtnLoading(true)

        let mess_ = groupname.trim()
        let mess = description.trim()
        let name_ = mess_.length;
        let description_ = mess.length;

        if (!data) {
            return;
        }

        let dat;
        if (profile_image != "" || profile_image.length > 1) {
            if (name_ > 0 && description_ > 0) {
                dat = {
                    Groupname: groupname, Groupdesc: description, Groupimage: profile_image, participants: selectedfriend, id: data._doc._id
                }
            }
            else if (name_ > 0) {
                dat = {
                    Groupname: groupname, Groupimage: profile_image, participants: selectedfriend, id: data._doc._id
                }
            }
            else if (description_ > 0) {
                dat = {
                    Groupdesc: description, Groupimage: profile_image, participants: selectedfriend, id: data._doc._id
                }
            } else {
                dat = {
                    Groupimage: profile_image, participants: selectedfriend, id: data._doc._id
                }
            }
        } else {

            if (name_ > 0 && description_ > 0) {
                dat = {
                    Groupname: groupname, Groupdesc: description, Groupimage: updatedimage, participants: selectedfriend, id: data._doc._id
                }
            }
            else if (name_ > 0) {
                dat = {
                    Groupname: groupname, Groupimage: updatedimage, participants: selectedfriend, id: data._doc._id
                }
            }
            else if (description_ > 0) {
                dat = {
                    Groupdesc: description, Groupimage: updatedimage, participants: selectedfriend, id: data._doc._id
                }
            } else {
                dat = {
                    Groupimage: updatedimage, participants: selectedfriend, id: data._doc._id
                }
            }
        }
        // console.log(data)
        axios.post('/api/chat/create-group-addparticipants', { isGroupChat: true, participants: selectedfriend, id: data._doc._id })
            .then((res) => {

                axios.post('/api/chat/edit-group', dat)
                    .then((res) => {

                        if (updategroup == "notupdategroup") {

                            setUpdategroup("updategroup")
                        } else {
                            setUpdategroup("notupdategroup")
                        }
                        setGroupname("");
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
            .finally(() => { setIsbtnLoading(false) })


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

                setProfile()
                setProfile_image(data.secure_url)
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



    useEffect(() => {

        // setUpdatedimage(URL.createObjectURL(profile))
    }, [profile])
    // const handlegetfriends = (e) => {

    useEffect(() => {

        fetchUsers()

    }, [searchInput])

    useEffect(() => {

        const checkFocus = () => {
            setShow(document.activeElement === inputref.current);
            // console.log("in")
        }
        // const checkFocusout = () => {
        //     setShow(document.activeElement === inputref.current);
        //     setSearchInput("")
        // setFriends()
        //     console.log("out")
        // }

        // console.log("triggered")
        document.addEventListener('focusin', checkFocus)
        document.addEventListener('focusout', checkFocus)
        return () => {
            document.removeEventListener('focusin', checkFocus)
            document.removeEventListener('focusout', checkFocus)
        }
    }, [])

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
                                Edit Group
                            </div>
                            <p className="mt-1 text-sm leading-6 text-gray-600">

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
                                    <label htmlFor="email-address" className="sr-only">Group name</label>
                                    <input id="groupname" name="groupname" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2.5 border-slate-500 placeholder:slate-400 text-slate-300 rounded-lg border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs sm:text-sm bg-slate-700" placeholder="Group name" value={groupname} onChange={handleInputChange} />
                                </div>
                                <div className=''>
                                    <label htmlFor="email-address" className="sr-only">Description</label>
                                    <input id="description" name="description" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2.5 border-slate-500 placeholder:slate-400 text-slate-300 rounded-lg border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs sm:text-sm bg-slate-700" placeholder="Description"
                                        onChange={handleInputChange}
                                        value={description} />
                                </div>


                                <div>
                                    <div className='pt-1'>
                                        <label htmlFor="email-address" className="sr-only">Search Friend</label>
                                        <input id="searchInput" name="searchInput" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2.5 border-slate-500 placeholder:slate-400 text-slate-300 rounded-lg border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs sm:text-sm bg-slate-700" placeholder="Search Friend" value={searchInput} onChange={handleInputChange}
                                            ref={inputref}
                                        // onKeyDown={handleKeydown} 
                                        //     onFocus={handleFocus}
                                        // onBlur={handleBlur}
                                        />

                                        <div className="pt-3">
                                            <ul
                                                className='rounded-2xl bg-slate-700 
                                            absolute 
                                  right-4                                       left-4  sm:right-6                                     sm:left-6
                                             z-50'>
                                                {
                                                    (friends && friends.map((item) => {

                                                        return (
                                                            (selectedfriendSet && !selectedfriendSet.has(item.email)) ? (<li className='text-sm text-slate-200 hover:bg-slate-800  hover:text-slate-100 p-2.5 pt-1 h-full  cursor-pointer rounded-md'
                                                                key={item._id} onClick={() => handleSelectfriend(item)}
                                                            >
                                                                {item.name}
                                                            </li>) : <></>
                                                        )
                                                    })
                                                    )

                                                }
                                                {isLoading && <div className=' text-slate-300 items-center flex justify-center m-2.5 text-sm'>
                                                    Loading...
                                                </div>}
                                                {(show && !friends && !isLoading) && <div className=' text-slate-300 items-center flex justify-center m-2.5 text-sm'>
                                                    No friend found
                                                </div>}
                                            </ul>
                                        </div>


                                    </div>
                                    <label
                                        htmlFor="photo"
                                        className=" pt-1
                    block 
                    text-xs 
                    font-semibold 
                    leading-6 
                    text-gray-300
                  "
                                    >
                                        Add participants
                                    </label>
                                    <div className="min-h-10">
                                        <div className="mt-2 flex flex-wrap items-center gap-x-1">

                                            <div className="flex gap-1 ">

                                                {selectedfriend && selectedfriend.map((item) => {

                                                    return (

                                                        <div className=" rounded-2xl bg-slate-300 flex  text-center justify-center p-1" key={item._id}>
                                                            <div className=' text-center font-bold text-black text-xs pl-0.5 pt-0.5 pb-0.5'
                                                            >
                                                                {item.name}
                                                            </div>
                                                            <div className="pl-1.5">                                  <div className=' text-red-600 hover:bg-red-500 hover:text-gray-100 rounded-full  cursor-pointer'
                                                                onClick={() => handleDeletefriend(item)}>
                                                                <RxCrossCircled className="text-xl font-semibold"
                                                                />
                                                            </div>
                                                            </div>                             </div>
                                                    )
                                                })}




                                            </div>                        </div>

                                    </div>



                                </div>

                                <div className='flex items-center pl-3 pt-4 pb-5'>
                                    <div className=" pr-9">
                                        {!data || data?._doc?.Groupimage == "" ?

                                            <Avatar sx={{ width: 34, height: 34 }}
                                            />
                                            :
                                            <Avatar
                                                sx={{ width: 34, height: 34 }}
                                                src={(profile_image && profile_image != "") ? profile_image : data?._doc?.Groupimage}
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
                            className='w-full bg-cyan-600 text-white hover:bg-cyan-900 hover:text-white rounded-2xl py-1 lmd:py-1.5'
                        >
                            Close
                        </button>
                        {isbtnLoading ? <button
                            // disabled={isLoading}
                            // type="submit"
                            type="button"
                            // fullWidth
                            // variant="contained"
                            // sx={{ mt: 3, mb: 1 }}
                            className='w-full bg-cyan-900 text-white rounded-2xl py-1 lmd:py-2 item-center cursor-not-allowed'
                        // onClick={createGroup}
                        >
                            <Box sx={{}}>
                                <CircularProgress className='font-extrabold' size={20} />
                            </Box>
                        </button> : <button
                            // disabled={isLoading}
                            // type="submit"
                            type="button"
                            // fullWidth
                            // variant="contained"
                            // sx={{ mt: 3, mb: 1 }}
                            className='w-full bg-cyan-600 text-white hover:bg-cyan-900 hover:text-white rounded-2xl py-1.5 lmd:py-2 text-sm'
                            onClick={editGroup}
                        >
                            Update
                        </button>}
                    </div>

                </div>

            </Modal>

        </>
    )
}

export default EditGroupModal