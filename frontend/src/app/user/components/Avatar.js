import React from 'react'
import Image from 'next/image'
import { Avatar, Badge } from '@mui/material'
import { ChatState } from '@/app/Provider/ChatProvider';


const Avatar_ = ({ image, _id }) => {

    const isActive = false;
    const { onlineUsers } = ChatState();

    // console.log(_id)

    return (
        <>
            <div className="relative z-0">
                <div

                //             className="
                //     h-9  
                //     w-9 
                //     md:h-11 
                //     md:w-11
                //   "
                >
                    {!image || image == "" ?
                        (onlineUsers?.includes(_id) ? <Badge
                            overlap="Circular" anchorOrigin={{ horizontal: "left", vertical: "bottom" }} variant='dot' color='success'                  >
                            <Avatar sx={{ width: 34, height: 34 }}
                            />
                        </Badge>
                            : <Avatar sx={{ width: 34, height: 34 }}
                            />)
                        : (onlineUsers?.includes(_id) ? <Badge
                            overlap="Circular" anchorOrigin={{ horizontal: "left", vertical: "bottom" }} variant='dot' color='success'                  >
                            <Avatar
                                sx={{ width: 34, height: 34 }}
                                src={image}
                            />
                        </Badge> : <Avatar
                            sx={{ width: 34, height: 34 }}
                            src={image}
                        />)
                    }
                </div>
                {/* {isActive ? (
                    <span
                        className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-1 
            right-1.5
            h-1 
            w-1 
            md:h-1.5 
            md:w-1.5
          "
                    />
                ) : null} */}
            </div>
        </>
    )
}

export default Avatar_