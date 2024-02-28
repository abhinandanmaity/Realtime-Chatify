"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Badge } from '@mui/material'
import Link from 'next/link'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaArrowLeftLong } from "react-icons/fa6";
// import axios from 'axios';
import ProfileDrawer from '../components/modals/ProfileDrawer';
import axios from 'axios'
import { ChatState } from '@/app/Provider/ChatProvider';
import { useRouter } from 'next/navigation';


const Header = ({ user, group, loadingprofile, conversationid, istyping, typingid, typingroomid, typingselectedChatCompare }) => {

    const dropdownref = useRef(null);
    const { onlineUsers } = ChatState();
    const router = useRouter();

    const isActive = false;

    const [dropdown, setDropdown] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isOpendrop, setIsOpendrop] = useState(false);
    const [curruser, setCurruser] = useState()


    const handleunfriend = () => {

        // if (!user) {
        //     return
        // }
        // const data = {
        //     email: user.email,
        //     _id: user._id
        // }

        // axios.post('/api/friend/unfriend')
        //     .then((res) => {
        //         // console.log(res.data)
        setIsOpendrop(!isOpendrop)
        //         router.push("/user")
        //         window.location.reload();
        //     })
        //     .catch(() => {

        //         // console.log("callback curr")
        //     })
    }


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

    useEffect(() => {

        const handleOutsideClick = (event) => {

            if (dropdownref.current && dropdownref.current.contains(event.target)) {
                setIsOpendrop(false)
            }
        };
        const checkFocus = () => {
            setDropdown(document.activeElement === dropdownref.current);
            // console.log("in")
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);

        }

        // document.addEventListener('focusin', checkFocus)
        // document.addEventListener('focusout', checkFocus)
        // return () => {
        //     document.removeEventListener('focusin', checkFocus)
        //     document.removeEventListener('focusout', checkFocus)
        // }
    }, [])
    // console.log(onlineUsers.includes(user?._id))

    return (

        <>
            <ProfileDrawer
                conversationid={conversationid}
                loadingprofile={loadingprofile}
                data={user}
                group={group}
                curruser={curruser}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />

            <div className="pt-3.5 ">
                <div
                    className="
        
        w-full 
        flex 
        px-4
        sm:px-0 
        py-3 
        pr-4 
        lg:pr-6 
        justify-between 
        items-center 
        shadow-sm
        
      "
                >
                    <div className="flex gap-1 items-center">
                        <Link
                            href="/user"
                            className="
            md:hidden 
            block 
            transition 
            cursor-pointer
            pr-4
          "
                        >
                            <FaArrowLeftLong className="text-white text-xl font-bold" />

                        </Link>
                        <div>
                            {!group ? <div className="cursor-pointer" onClick={() => setDrawerOpen(true)}>
                                {/* {conversation.isGroup ? ( */}
                                {user && (!user.image || user.image == "") ?
                                    (onlineUsers.includes(user?._id) ? <Badge
                                        overlap="Circular" anchorOrigin={{ horizontal: "left", vertical: "bottom" }} variant='dot' color='success'                  >
                                        <Avatar sx={{ width: 39, height: 39 }}
                                        />
                                    </Badge>
                                        : <Avatar sx={{ width: 39, height: 39 }}
                                        />)
                                    : (onlineUsers.includes(user?._id) ? <Badge
                                        overlap="Circular" anchorOrigin={{ horizontal: "left", vertical: "bottom" }} variant='dot' color='success'                  >
                                        <Avatar
                                            sx={{ width: 39, height: 39 }}
                                            src={user && user.image}
                                        />
                                    </Badge> : <Avatar
                                        sx={{ width: 39, height: 39 }}
                                        src={user && user.image}
                                    />)
                                }
                            </div> :
                                <div className="cursor-pointer" onClick={() => setDrawerOpen(true)}>
                                    {/* {conversation.isGroup ? ( */}
                                    {group && (!group._doc.Groupimage || group._doc.Groupimage == "") ?
                                        (isActive ? <Badge
                                            overlap="Circular" anchorOrigin={{ horizontal: "left", vertical: "bottom" }} variant='dot' color='success'                  >
                                            <Avatar sx={{ width: 39, height: 39 }}
                                            />
                                        </Badge>
                                            : <Avatar sx={{ width: 39, height: 39 }}
                                            />)
                                        : (isActive ? <Badge
                                            overlap="Circular" anchorOrigin={{ horizontal: "left", vertical: "bottom" }} variant='dot' color='success'                  >
                                            <Avatar
                                                sx={{ width: 39, height: 39 }}
                                                src={group && group._doc.Groupimage}
                                            />
                                        </Badge> : <Avatar
                                            sx={{ width: 39, height: 39 }}
                                            src={group && group._doc.Groupimage}
                                        />)
                                    }
                                </div>}
                        </div>
                        {/* ) : ( */}
                        {/* <Avatar user={otherUser} /> */}
                        {/* )} */}
                        <div className="flex flex-col pl-2.5">
                            {/* <div>{conversation.name || otherUser.name}</div> */}
                            <div className='text-white text-sm'>{user && user.name}</div>
                            <div className='text-white text-sm'>{group && group._doc.Groupname}</div>
                            <div className="text-xs font-light text-white ">
                                {/* {statusText} */}

                                <div>
                                    {(!group && user) && ((!istyping && onlineUsers.includes(user?._id)) ? <div className='text-green-500 text-xxs'>Online</div> : (!istyping && <div className='text-red-500 text-xxs'>Offline</div>))}
                                </div>

                                <div>
                                    {(typingroomid == typingselectedChatCompare && istyping) ? (typingid == undefined ? <></> : <div className='text-xxs text-white'>{typingid && typingid.slice(0, 21)} typing...</div>) : <div></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <HiEllipsisHorizontal
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
        "
                /> */}

                    {/* <div classname="relative inline-block" ref={dropdownref}>
                
<PiDotsThreeOutlineVerticalFill className="text-white text-xl font-bold cursor-pointer" onClick={() => { setIsOpendrop(!isOpendrop) }} />

                        {isOpendrop ?
                            < div className=" flex flex-col fixed top-16 right-7 bg-slate-950 items-start rounded-tl-xl rounded-bl-xl rounded-br-xl border-2 border-slate-700 z-30"
                                
                            >
                                <div className="text-slate-200 hover:bg-slate-700 py-1.5 pl-2.5 font-medium text-sm w-40 pt-1 cursor-pointer">My Profile</div>
                                <div className="text-slate-200 hover:bg-slate-700 py-1.5 pl-2.5 font-medium text-sm w-40 cursor-pointer">Edit Profile</div>
                                <div className="text-slate-200 hover:bg-slate-700 py-1.5 pl-2.5 font-medium text-sm w-40 cursor-pointer">Clear chat</div>
                                <div className="text-slate-200 hover:bg-slate-700 py-1.5 pl-2.5 font-medium text-sm w-40 pb-1 cursor-pointer">Unfriend</div>
                            </div> : ""}
                    </div> */}

                    <div class="relative inline-block text-left">
                        <div>
                            <button type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold " id="menu-button" aria-expanded="true" aria-haspopup="true">
                                <PiDotsThreeOutlineVerticalFill className="text-white text-xl font-bold cursor-pointer" onClick={() => { setIsOpendrop(!isOpendrop) }} />

                            </button>
                        </div>

                        {/* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
                        {isOpendrop && <div className="absolute right-5 z-30 mt-2 w-52 origin-top-right rounded-md bg-slate-100 shadow-xl transition-all duration-300 ease-in-out" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1" role="none">
                                {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                                <Link href="/user" className="text-gray-900 block px-4 py-2 text-sm hover:bg-cyan-100 " role="menuitem" tabindex="-1" id="menu-item-0"
                                    onClick={() => { setIsOpendrop(!isOpendrop) }}
                                >Search Friend</Link>
                                {(user && user != undefined && !group) && <div className="text-gray-900 block px-4 py-2 text-sm hover:bg-cyan-100 cursor-pointer" role="menuitem" tabindex="-1" id="menu-item-1"
                                    onClick={handleunfriend}
                                >Unfriend</div>}
                                <div className="text-gray-900 block px-4 py-2 text-sm hover:bg-cyan-100 cursor-pointer" role="menuitem" tabindex="-1" id="menu-item-2"
                                    onClick={() => { setIsOpendrop(!isOpendrop) }}
                                >Clear Chat</div>
                            </div>
                        </div>}
                    </div>


                </div>

            </div >
        </>
    )
}

export default Header


