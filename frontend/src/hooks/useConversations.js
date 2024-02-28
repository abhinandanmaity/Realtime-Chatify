import axios from "axios"
import { useEffect, useState } from "react"


export const useConversations = () => {

    const [user, setUser] = useState()
    const [group, setGroup] = useState()

    useEffect(() => {
      
        const data = {}

        axios.post('/api/conversation/get-conversations', data)
            .then((res) => {

                // return res.data
                // console.log("conversations")
                // console.log(res.data)
                setUser(res.data.conversations)
                setGroup(res.data.groups)
            })
            .catch((callback) => {

                console.log("callback")
            })
    
    //   return () => {}
    })

    // useEffect(() => {
      
    //     const data = {}

    //     axios.post('/api/conversation/get-conversations', data)
    //         .then((res) => {

    //             // return res.data
    //             // console.log("conversations")
    //             // console.log(res.data)
    //             setUser(res.data.conversations)
    //             setGroup(res.data.groups)
    //         })
    //         .catch((callback) => {

    //             console.log("callback")
    //         })
    
    // //   return () => {}
    // }, [])

  return {user, group}
}
