import axios from "axios"
import { useEffect, useRef, useState } from "react"


export const useRefrese = (conversationid, refr) => {
  
    const [refers, setRefers] = useState()
    let r = null

    useEffect(() => {

        // setLoadingprofile(true)
        const data = {
            id: conversationid
        }
        axios.post('/api/chat/get-groupProfile', data)
            .then((res) => {

                // return res.data
                setRefers(res.data.group)
                // console.log(refers)
                // r = res.data.group
            })
            .catch((callback) => {

                console.log("callback")
            })
            // .finally(() => setLoadingprofile(false))
    }, [refr])

    return refers;
}
