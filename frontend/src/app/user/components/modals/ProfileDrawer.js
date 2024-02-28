'use client';

import { Fragment, useMemo, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { IoClose, IoTrash } from 'react-icons/io5'
import { IoIosCloseCircleOutline } from "react-icons/io";

// import useOtherUser from '@/app/hooks/useOtherUser';
// import useActiveList from '@/app/hooks/useActiveList';

// import ConfirmModal from './ConfirmModal';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import UserProfile from '../sidebars/UserProfile';
import GroupProfile from '../sidebars/GroupProfile';
import { CiEdit } from "react-icons/ci";


const ProfileDrawer = ({ loadingprofile, data, group, isOpen, onClose, curruser, conversationid }) => {

    const [confirmOpen, setConfirmOpen] = useState(false);

    //   const otherUser = useOtherUser(data);
    // console.log("data", data)
    // console.log(profile)


    return (
        <>
            {/* <ConfirmModal 
        isOpen={confirmOpen} 
        onClose={() => setConfirmOpen(false)}
      /> */}
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-40" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div
                                            // overflow-y-scroll

                                            className="flex h-full flex-col  bg-white py-6 shadow-xl overflow-y-scroll scrollbar-hide">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-end">
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-xl bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
                                                            onClick={onClose}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <IoIosCloseCircleOutline className="h-7 w-7  text-black" aria-hidden="true" />
                                                        </button>


                                                    </div>
                                                </div>
                                            </div>

                                            {(loadingprofile == true && (data == undefined || group == undefined)) ? <div className='flex justify-center items-center h-screen'>
                                                <div className="flex flex-row items-center">
                                                    <Box sx={{ display: 'flex', mr: 2 }}>
                                                        <CircularProgress className='font-extrabold' size={25} />
                                                    </Box>
                                                    Loading...</div>                              </div>
                                                :
                                                // (
                                                (data && data.profile) ? <UserProfile data={data} curruser={curruser} /> :
                                                    <GroupProfile data={group} curruser={curruser}
                                                        conversationid={conversationid} />

                                                // ((data && data.isGroup) && <GroupProfile data={data} />)
                                                // )
                                            }


                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default ProfileDrawer;