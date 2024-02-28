import React from 'react'

const useOtheruser = (setUser, setGroup, ) => {

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
    }, [])

    return {setGroup, setUser}
}

export default useOtheruser 