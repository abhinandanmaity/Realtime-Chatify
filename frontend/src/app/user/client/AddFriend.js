"use client"

import React, { useState, useRef, useEffect } from 'react'
import InputSearchuser from '../components/input/InputSearchuser'
import { Avatar, Box, Button, CircularProgress } from '@mui/material'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


const AddFriend = () => {

  const inputref = useRef(null)

  const [isbtnLoading, setIsbtnLoading] = useState(false);
  // const [username, setUsername] = useState("");
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [friends, setFriends] = useState()
  const [show, setShow] = useState(false);


  const fetchUsers = async () => {

    if (searchInput.trim().length <= 0) {
      setSearchInput("");
      setFriends()
      return;
    }
    try {
      setIsLoading(true)
      setFriends()
      // console.log(inputValue)
      const response = await axios.post('/api/setting/finduser-add-friend', { searchInput });

      // console.log(response.data.conversations)
      // const regexPattern = new RegExp(searchInput, 'i');
      // const filteredNames = response.data.conversations.filter(name => regexPattern.test(name.username));
      // console.log("filteredNames")

      // setFriends(filteredNames)
      setFriends(response.data.conversations)

    } catch (error) {
      // console.error('Error fetching users:', error);
      // return [];
      setFriends([])
    } finally {
      setIsLoading(false)
    }
  };

  const handleSelectfriend = (user) => {

    setSearchInput(user.username)
    inputref.current.focus()
  }

  const handleInputChange = (e) => {

    // console.log(e)
    if (e.target.name == "searchInput") {

      setSearchInput(e.target.value);
    }
  }

  const handlesubmit = (e) => {

    e.preventDefault();
    setIsbtnLoading(true);


    const data = {
      username: searchInput
    };

    //   console.log("My data is that")
    //   console.log(data)


    if (username.length >= 1) {

      axios.post(`/api/friend/send-friendrequest`, data)
        .then(() => {

          toast.success('Request send Successfully', {
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
          // console.log(callback)
          // console.log("callback")
          // console.log(callback.response.data.error)
          if (callback.response.data.error == "User Not Exist !") {
            toast.error('User Not Exist !', {
              position: "bottom-center",
              autoClose: 941,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (callback.response.data.error == "Already Your Friend") {

            toast.error('Already Send Request', {
              position: "bottom-center",
              autoClose: 941,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {

            toast.error('Internal Server Error !', {
              position: "bottom-center",
              autoClose: 941,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }

        })
        .finally(() => setIsbtnLoading(false))

      // setCode('');
    } else {

      setIsLoading(false);
      toast.error('Check your input', {
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

  useEffect(() => {

    fetchUsers()

  }, [searchInput])

  useEffect(() => {

    const checkFocus = () => {
      setShow(document.activeElement === inputref.current);

    }
    inputref.current.focus()
    // console.log("triggered")
    document.addEventListener('focusin', checkFocus)
    document.addEventListener('focusout', checkFocus)
    return () => {
      document.removeEventListener('focusin', checkFocus)
      document.removeEventListener('focusout', checkFocus)
    }
  }, [])

  return (
    <>
      <div className="">

        <div className=' '>
          <div className="text-xl text-white font-extrabold pb-6">Add Friends</div>
          <div className="flex flex-col gap-2">

            <div className="flex flex-row gap-2  ">
              <input id="searchInput" name="searchInput" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2.5 border-slate-500 placeholder:slate-400 text-slate-300 rounded-lg border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-0 placeholder:text-xs text-xs sm:text-sm bg-slate-700" placeholder="Search User"

                value={searchInput} onChange={handleInputChange}
                ref={inputref}
              />
              {!isbtnLoading ?
                <Button
                  type="button"
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 0, mb: 0 }}
                  className='text-xs lmd:text-sm  bg-cyan-600  text-white hover:bg-cyan-900 hover:text-white rounded-2xl '
                  onClick={handlesubmit}
                >
                  Add

                </Button> :
                <Button
                  type="button"
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 0, mb: 0 }}
                  className='text-xs lmd:text-sm  text-white  hover:text-white bg-cyan-900 hover:bg-cyan-900 rounded-2xl cursor-not-allowed'
                >
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress className='font-extrabold' size={25} />
                  </Box>

                </Button>
              }
            </div>
          </div>

        </div>
        <div className="

          ">
          <ul
            className="

            pt-3
            pb-7
               ">
            {/* rounded-2xl bg-slate-700 */}
            {
              (friends && friends.map((item) => {

                return (
                  <li className='text-sm text-slate-200 hover:text-slate-100 p-0.5 pt-1 h-full rounded-md'
                    key={item._id} onClick={() => handleSelectfriend(item)}
                  >

                    <div className="mt-0.5 cursor-pointer ">
                      <div className=" appearance-none relative px-4 lmd:px-5 py-3 lmd:py-3.5 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-0 placeholder:text-sm bg-slate-700 hover:bg-slate-600 flex justify-start "
                      >
                        <div className="flex flex-row items-center pl-1.5">
                          <div className="">
                            {item.image != undefined ? <Avatar
                              src={item.image}
                              sx={{ width: 37, height: 37 }} /> :

                              <Avatar
                                sx={{ width: 37, height: 37 }}
                              />
                            }
                          </div>
                          <div className="flex flex-col justify-start pl-2">

                            <div className="text-xs lmd:text-sm pl-3 text-white">{item.name}</div>
                            <div className="text-xxs lmd:text-sm pl-3 text-white">{item.username}</div>
                          </div>
                        </div>
                        <div className="flex flex-row items-center">
                          {/* <div className="text-xxxs lmd:text-xxs">a few seconds</div> */}
                          {/* <div className='pr-3.5'>
                                        <PiCheckCircleDuotone className="bg-green-700 rounded-full text-xl lmd:text-2xl cursor-pointer text-white"
                                            onClick={() => { handlesubmitaccept(item.sender) }} />
                                    </div>
                                    <div >
                                        <RxCrossCircled className="bg-red-600 rounded-full text-xl lmd:text-2xl cursor-pointer text-white"
                                            onClick={() => { handlesubmitreject(item.sender) }} />
                                    </div> */}
                        </div>
                      </div>
                    </div>

                  </li>
                )
              })
              )

            }
            {isLoading && <div className=' text-slate-300 items-center flex justify-center m-2.5 text-sm'>
              Loading...
            </div>}
            {(show && !friends && !isLoading) && <div className=' text-slate-300 items-center flex justify-center m-2.5 text-sm'>
              No friend found
            </div>}
          </ul>
        </div>

      </div>
    </>
  )
}

export default AddFriend