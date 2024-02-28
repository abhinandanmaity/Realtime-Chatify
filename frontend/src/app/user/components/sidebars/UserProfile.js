"use client"

import React, { useState, useEffect } from 'react'
import EditprofileModal from './EditprofileModal'
import { Avatar, Badge } from '@mui/material';
import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from "react-icons/ci";
import DeleteAccountModal from './DeleteAccountModal';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setUserprofile } from '@/redux/slice/userprofileSlice'
import { ChatState } from '@/app/Provider/ChatProvider';



const UserProfile = ({ data, curruser }) => {

  const dispatch = useDispatch()
  const { onlineUsers, updateprofile } = ChatState();

  const [friend, setFriend] = useState()

  const isActive = true;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  //   useEffect(() => {

  //     setLoadingprofile(true)
  //     const data = {
  //         id: params.conversationid,
  //     }
  //     axios.post('/api/friend/get-friendprofile', data)
  //         .then((res) => {

  //             // return res.data
  //             // console.log(res.data.conversations)
  //             setFriend(res.data)
  //             // setLoadingprofile(false)
  //         })
  //         .catch((callback) => {

  //             console.log("callback")
  //         })
  // })


  // console.log(curruser)

  useEffect(() => {

    // const data = {}
    axios.post('/api/account/get-profile', {})
      .then((res) => {

        // return res.data
        // console.log(res.data)
        // console.log(updateprofile)
        dispatch(setUserprofile(res.data))
      })
      .catch((callback) => {

        // console.log("callback")
      })
  }, [])
  useEffect(() => {

    // const data = {}
    axios.post('/api/account/get-profile', {})
      .then((res) => {
        // console.log("-- updateprofile -- ")
        // return res.data
        // console.log(res.data)
        dispatch(setUserprofile(res.data))
      })
      .catch((callback) => {

        // console.log("callback")
      })
  }, [updateprofile])

  const userdata = useSelector(state => state.userprofile)

  // console.log(data.value?.image)

  return (
    <>

      <DeleteAccountModal isOpenDelete={isOpenDelete} onClose={() => setIsOpenDelete(false)} />
      <EditprofileModal isOpen={isOpen} onClose={() => setIsOpen(false)} image={data.image} />


      {((curruser && data) && curruser.email == data.email) && <div className="relative cursor-pointer left-8 text-2xl" onClick={() => { setIsOpen(true) }}>
        <CiEdit />
      </div>}

      {(data && data.email == userdata.value?.email) ?

        <div className="relative mt-6 flex-1 px-4 sm:px-6">
          <div className="flex flex-col items-center">
            <div className="mb-5">

              {(!userdata && (userdata.value?.image == undefined || userdata.value?.image == "")) ?
                (onlineUsers.includes(userdata.value?._id) ? <Badge
                  overlap="Circular" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} variant='dot' color='success'                  >
                  <Avatar sx={{ width: 44, height: 44 }}
                  />
                </Badge>
                  : <Avatar sx={{ width: 44, height: 44 }}
                  />)
                : (onlineUsers.includes(userdata.value?._id) ? <Badge
                  overlap="Circular" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} variant='dot' color='success'                  >
                  <Avatar
                    sx={{ width: 44, height: 44 }}
                    src={userdata && userdata.value?.image}
                  />
                </Badge> : <Avatar
                  sx={{ width: 44, height: 44 }}
                  src={userdata && userdata.value?.image}
                />)
              }                       </div>
            <div className='text-sm font-semibold'>
              {userdata.value?.name}
            </div>
            <div className="text-xs text-gray-500">
              {userdata.value?.email}
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

                  Joined on
                </div>
                {(userdata != undefined && userdata.value?.createdAt != undefined) ? ((userdata.value?.createdAt).slice(0, 10)) : ""}
              </div>
            </div>

            <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
              <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">


                {userdata.value?.desc && (<div className='mt-10'>
                  <div className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  
                                " >
                    <div className='font-semibold mt-2'> Description :</div>
                    <div className='flex flex-wrap'>{userdata.value?.desc}</div>
                  </div>
                </div>
                )}

              </dl>
              {((curruser && userdata) && curruser.email == userdata.value?.email) && <div className="flex justify-center gap-10 my-14"
                onClick={() => { setIsOpenDelete(true) }}>
                <div className="">
                  <div

                    // onClick={() => setConfirmOpen(true)}

                    className="flex flex-col gap-3 items-center  hover:opacity-85">
                    <div className="flex items-center justify-center">
                      <MdDeleteOutline className='text-xl text-red-600' />

                    </div>
                    <div className="cursor-pointer text-sm  text-red-500">
                      Delete Account
                    </div>
                  </div>
                </div>
              </div>}

            </div>
          </div>


        </div>
        :
        <div className="relative mt-6 flex-1 px-4 sm:px-6">
          <div className="flex flex-col items-center">
            <div className="mb-5">

              {(!data && (data?.image == undefined || data?.image == "")) ?
                (onlineUsers.includes(data._id) ? <Badge
                  overlap="Circular" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} variant='dot' color='success'                  >
                  <Avatar sx={{ width: 44, height: 44 }}
                  />
                </Badge>
                  : <Avatar sx={{ width: 44, height: 44 }}
                  />)
                : (onlineUsers.includes(data._id) ? <Badge
                  overlap="Circular" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} variant='dot' color='success'                  >
                  <Avatar
                    sx={{ width: 44, height: 44 }}
                    src={data && data?.image}
                  />
                </Badge> : <Avatar
                  sx={{ width: 44, height: 44 }}
                  src={data && data?.image}
                />)
              }                       </div>
            <div className='text-sm font-semibold'>
              {data?.name}
            </div>
            <div className="text-xs text-gray-500">
              {data?.email}
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

                  Joined on
                </div>
                {(data != undefined && data?.createdAt != undefined) ? ((data?.createdAt).slice(0, 10)) : ""}
              </div>
            </div>

            <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
              <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">


                {data?.desc && (<div className='mt-10'>
                  <div className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  
                                " >
                    <div className='font-semibold mt-2'> Description :</div>
                    <div className='flex flex-wrap'>{data?.desc}</div>
                  </div>
                </div>
                )}

              </dl>
              {((curruser && data) && curruser.email == data?.email) && <div className="flex justify-center gap-10 my-14"
                onClick={() => { setIsOpenDelete(true) }}>
                <div className="">
                  <div

                    // onClick={() => setConfirmOpen(true)}

                    className="flex flex-col gap-3 items-center  hover:opacity-85">
                    <div className="flex items-center justify-center">
                      <MdDeleteOutline className='text-xl text-red-600' />

                    </div>
                    <div className="cursor-pointer text-sm  text-red-500">
                      Delete Account
                    </div>
                  </div>
                </div>
              </div>}

            </div>
          </div>


        </div>
      }

    </>
  )
}

export default UserProfile