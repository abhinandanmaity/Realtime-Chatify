"use client"

import React, { useState } from 'react'
import Profile from './client/Overview'
import { useSession } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux'
import { useremail } from '@/redux/slice/user/sessionSlice';
import MobileFooter from './components/sidebars/MobileFooter';

const User = () => {

    // const [open, setOpen] = useState(true);
    //     const { data: session, status, update } = useSession();
    //   console.log(session);

    // const dispatch = useDispatch()
    // dispatch(useremail());
    // const currentuser = useSelector((state) => state.session.value)

    return (
        <>

            <div className="md:pl-82 lmd:pl-96 ">
                <div className=" flex flex-col">

                    {/* <div className='h-screen
pb-12
overflow-y-auto 
scrollbar-hide'> */}
                        <Profile
                        // session={session}
                        />
                    {/* </div> */}
                    <MobileFooter />

                </div>
            </div>
        </>
    )
}

// side transition --------------->>>>>>>>>>>>>>>>>>>>>>>>>>>
{/* <Transition.Child
    as={Fragment}
    enter="transform transition ease-in-out duration-500"
    enterFrom="translate-x-full"
    enterTo="translate-x-0"
    leave="transform transition ease-in-out duration-500"
    leaveFrom="translate-x-0"
    leaveTo="translate-x-full"
>
    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">

    </Dialog.Panel>
</Transition.Child> */}
export default User