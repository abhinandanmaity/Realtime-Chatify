"use client"

import React from 'react'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { BsPersonFillAdd } from "react-icons/bs";
import { ChatState } from '@/app/Provider/ChatProvider';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MobileItem from './MobileItem';


const MobileFooter = () => {

  const { mobilefooterselect, setMobilefooterselect } = ChatState()
  const router = useRouter()

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

  return (
    <>

      <div className="md:hidden ">

        <MobileItem />

        <div className="
        fixed 
        justify-evenly 
        w-full 
        bottom-0 
        z-20 
        flex 
        flex-row
        items-center 
        left-0 
        right-0
        bg-slate-900
        pl-5 pr-5
        pt-1.5 pb-1.5
        rounded-xl
        ">
          {/* border-t-[1px] */}
          {/* <div className="bg-slate-600  border-t-2 border-slate-500"> */}

          <div className="pt-1 pb-1" onClick={() => setMobilefooterselect("chat")}>

            {mobilefooterselect == "chat" ? <div className='flex flex-col items-center'><HiChatBubbleLeftRight className="h-7 w-7 text-slate-300 cursor-pointer" />
              <div className="text-slate-100 text-sm font-semibold leading-loose cursor-pointer">Messages</div>
            </div> : <div className='flex flex-col items-center'><HiChatBubbleLeftRight className="h-6 w-6 text-slate-400 cursor-pointer" />
              <div className="text-slate-200 text-xs font-semibold leading-loose cursor-pointer">Messages</div>
            </div>}
          </div>
          <div className="pt-1.5 pb-1.5" onClick={() => setMobilefooterselect("add")}>

            {mobilefooterselect == "add" ? <div className='flex flex-col items-center'><BsPersonFillAdd className="h-7 w-7 text-slate-300 cursor-pointer" />
              <div className="text-slate-100 text-sm font-semibold leading-loose cursor-pointer">Friends</div>
            </div> : <div className='flex flex-col items-center'><BsPersonFillAdd className="h-6 w-6 text-slate-400 cursor-pointer" />
              <div className="text-slate-200 text-xs font-semibold leading-loose cursor-pointer">Friends</div>
            </div>}
          </div>
          <div className="pt-1.5 pb-1.5" onClick={handleSignout}>

            {<div className='flex flex-col items-center'><IoIosLogOut className="h-7 w-7 text-slate-400 cursor-pointer" />
              <div className="text-slate-200 text-xs font-semibold leading-loose cursor-pointer">Logout</div>
            </div>}
          </div>
          {/* </div> */}

        </div>
      </div>
    </>
  )
}

export default MobileFooter