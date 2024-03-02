import React, { useRef } from 'react'
import MessageBox from './MessageBox'

const Body = ({ messages, mychat_id }) => {


    return (
        <>
            <div className="flex-1 overflow-y-auto scrollbar-hide"
            >
                {/* {messages.map((message, i) => ( */}
                <MessageBox
                    // isLast={i === messages.length - 1}
                    // key={message.id}
                    messages={messages}
                    mychat_id={mychat_id}
                />
                {/* ))} */}
                <div className="pt-9"

                />
            </div>
        </>
    )
}

export default Body