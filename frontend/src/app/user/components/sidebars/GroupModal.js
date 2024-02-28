'use client';

import React, { useState, useEffect, useRef } from 'react'
import Modal from '../modals/Modal'
import Button from '@mui/material/Button'
import CldUploadButton from '../../client/CldUploadButton'
// import { Avatar, Chip } from "@material-tailwind/react"
import axios from 'axios'
import { RxCrossCircled } from "react-icons/rx";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GroupModal = ({ isOpen, setIsOpen }) => {

    // const [Selectedvalue, setSelectedvalue] = useState([]);
    // const [value, setValue] = useState([]);


    const inputref = useRef(null)

    const [isLoading, setIsLoading] = useState(false);
    const [isbtnLoading, setIsbtnLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [searchInput, setSearchInput] = useState("")
    const [groupname, setGroupname] = useState("")
    const [friends, setFriends] = useState()
    const [selectedfriend, setSelectedfriend] = useState([])
    const [selectedfriendSet, setSelectedfriendSet] = useState(new Set())


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
            const response = await axios.post('/api/setting/finduser', { searchInput });
            // const op = []
            // response.data.conversations.map((item) => {
            //     if (item.name)
            //         op.push(item)
            // })
            // console.log(response.data.conversations)
            const regexPattern = new RegExp(searchInput, 'i');
            const filteredNames = response.data.conversations.filter(name => regexPattern.test(name.name));
            // console.log(filteredNames)

            setFriends(filteredNames)
            // return filteredNames;
        } catch (error) {
            console.error('Error fetching users:', error);
            // return [];
            setFriends([])
        } finally {
            setIsLoading(false)
        }
    };

    const handleKeydown = (e) => {

        // console.log(e)
    }
    // const handleFocus = () => {

    //     // console.log("focus")
    //     setShow(true)
    // }
    // const handleBlur = () => {

    //     // console.log("blur")
    //     setSearchInput("")
    //     setFriends()
    //     setShow(false)
    // }

    const onClose = () => {

        setSearchInput("")
        setFriends()
        setSelectedfriendSet(new Set())
        setSelectedfriend([])
        setGroupname("")
        setIsOpen(false)
    }

    const handleInputChange = (e) => {

        // console.log(e)
        if (e.target.name == "searchInput") {

            setSearchInput(e.target.value);
        } else if (e.target.name == "groupname") {

            setGroupname(e.target.value);
        }
    }
    const handleSelectfriend = (user) => {

        // console.log("selected")
        setSelectedfriend([...selectedfriend, user])
        setSelectedfriendSet(new Set([...selectedfriendSet, user.email]))

        setSearchInput("")
        setFriends()
        inputref.current.focus()
    }
    const handleDeletefriend = (user) => {

        // console.log(user)
        const updatefriend = selectedfriend.filter((element) =>
            element._id !== user._id
        )

        setSelectedfriend(updatefriend)
        // console.log(user)
        // console.log(updatefriend)

        const updateEmails = new Set(selectedfriendSet)
        updateEmails.delete(user.email)
        setSelectedfriendSet(updateEmails)
    }

    const customStyles = {
        multiValue: (base, state) => ({
            ...base,
            backgroundColor: '#cfd6e2', // Change background color
            borderRadius: '20px', // Change border radius
            padding: '4px 4px', // Change padding
            zIndex: 9999,
        }),
        multiValueLabel: (base, state) => ({
            ...base,
            color: '#333', // Change label color
            fontWeight: 'bold', // Change label font weight
            fontSize: '10px'
        }),
        multiValueRemove: (base, state) => ({
            ...base,
            color: '#ff4d4d', // Change remove button color
            ':hover': {
                backgroundColor: '#ff4d4d', // Change remove button background color on hover
                color: 'white', // Change remove button text color on hover
                borderRadius: '10px'
            },
            zIndex: 9999,
        }),
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '2px' : '2px', // Example border style
            boxShadow: 'none',
            '&:hover': {
                // borderColor: '#9fadc6', // Example hover styles
            },
            backgroundColor: '#394760',
            borderRadius: '10px',
            borderColor: state.isFocused ? '#afbbcf' : '#7085a9',
            zIndex: 9999,

        }),
        container: (provided) => ({
            ...provided,
            // width: 300, // Example: set the width of the container
            // borderRadius: '20px'
            // backgroundColor: '#394760',
        }),
        option: (provided, state) => ({
            ...provided,
            // backgroundColor: state.isSelected ? '#007bff' : 'green', // Example: change background color of selected option
            // color: state.isSelected ? 'white' : '#333', // Example: change text color of selected option
            zIndex: 9999,
            backgroundColor: state.isFocused ? '#303c50' : '#394760',
            color: state.isFocused ? '#dfe4ec' : '#cfd6e2',
            cursor: 'pointer',
            fontSize: '14px', // Change font size
            // borderRadius: '10px'

        }),
        noOptionsMessage: (base, state) => ({
            ...base,
            // backgroundColor: state.isSelected ? '#7085a9' : '#394760',
            backgroundColor: '#394760',
            color: '#cfd6e2', // Change the color to red or any other color you prefer
            fontSize: '14px', // Change font size
            borderRadius: '7px',
            // padding: '13px'
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#afbbcf', // Customize placeholder color here
            fontSize: '12px',
            padding: '6px 6px'
        }),
        input: (provided) => ({
            ...provided,
            color: '#eff1f5', // Example text color
            borderRadius: '10px',
            fontSize: '14px',
            padding: '6px 6px'
        }),
        menuPortal: (base) => ({
            ...base,
            borderRadius: '8px', // Set your desired border radius here
            backgroundColor: 'red',
            zIndex: 9999,
        }),
        menu: (provided) => ({
            ...provided,
            // maxHeight: '300px', // Set max height to enable vertical scrolling
            // overflowY: 'auto', // Enable vertical scrolling
            zIndex: 9999,
            borderRadius: '13px',
            backgroundColor: '#303c50',
            // backgroundColor: state.isFocused ? '#303c50' : '#394760',
        }),
        loadingIndicator: (provided, state) => ({
            ...provided,
            color: 'white', // Change color to red
            // fontSize: '20px', // Change font size
            // Add any additional styles you want to apply
        }),
        loadingMessage: (base) => ({
            ...base,
            color: '#cfd6e2', // Change color to blue
            fontStyle: 'italic', // Make the message italic
            fontSize: '14px', // Change font size
            borderRadius: '7px',
            backgroundColor: '#394760',
        }),
    };


    const createGroup = (e) => {

        e.preventDefault()
        setIsbtnLoading(true)

        if(!groupname || groupname.length <= 0){
            
            toast.error('At first fill input', {
                position: "bottom-center",
                autoClose: 941,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        const data = {
            isGroupChat: true,
            Groupname: groupname,
            participants: selectedfriend
        }

        axios.post('/api/chat/create-chat', data)
            .then(() => {

                onClose()
                toast.success('Created Successfully', {
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

                toast.error('Slow internet connection', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .finally(()=>setIsbtnLoading(false))
    }

    // const handlegetfriends = (e) => {

    useEffect(() => {

        fetchUsers()

    }, [searchInput])

    useEffect(() => {

        const checkFocus = () => {
            setShow(document.activeElement === inputref.current);
            // console.log("in")
        }
        // const checkFocusout = () => {
        //     setShow(document.activeElement === inputref.current);
        //     setSearchInput("")
        // setFriends()
        //     console.log("out")
        // }

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
            <Modal isOpen={isOpen} onClose={onClose}>
                {/* <form
                // onSubmit={handleSubmit(onSubmit)}
                > */}

                <div className="">
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-6">
                            <div
                                className="
                text-sm 
                font-semibold 
                leading-7 
                text-slate-200
              "
                            >
                                Create group
                            </div>
                            <p className="mt-1 text-sm leading-6 text-gray-600">

                            </p>

                            <div className="mt-5 flex flex-col gap-y-2">
                                {/* <Input
                                    disabled={isLoading}
                                    label="Name"
                                    id="name"
                                    // errors={errors}
                                    required
                                // register={register}
                                /> */}

                                <div className='pt-1'>
                                    <label htmlFor="email-address" className="sr-only">Group name</label>
                                    <input id="groupname" name="groupname" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2.5 border-slate-500 placeholder:slate-400 text-slate-300 rounded-lg border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs sm:text-sm bg-slate-700" placeholder="Group name" value={groupname} onChange={handleInputChange} />
                                </div>
                                <div className=''>
                                    {/* <label htmlFor="email-address" className="sr-only">Search friend</label>
                                    <input id="name" name="text" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2.5 border-slate-500 placeholder:slate-400 text-slate-300 rounded-lg border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs sm:text-sm bg-slate-700" placeholder="Search friend" /> */}

                                    <div className=''>

                                        {/* <div className="">

<label
                                        htmlFor="photo"
                                        className=" pt-4
                    block 
                    text-xs 
                    font-medium 
                    leading-6 
                    text-gray-300
                  "
                                    >
                                        Selected participants
                                    </label>
                                    </div> */}

                                        {/* <div className="">
        <AsyncSelect
          value={Selectedvalue}
          cacheOptions
          loadOptions={fetchUsers}
        //   defaultOptions 
          onInputChange={handleInputChange}
          getOptionLabel={e => e.name}
          getOptionValue={e => e._id}
          isMulti
        //   isClearable
          noOptionsMessage={()=> "No User Found"}
          placeholder="Search friend"
          // onChange={(value) => setSelectedvalue(value)}
          onChange={handlechange}
          // components={customcomponent}
          styles={customStyles}
        //   className="z-50"
        />
</div> */}
                                        {/* <div className="">Selected User:
          {member.map((item) => {

            return (

              <p> {item.name}</p>

            )
          })}
        </div> */}
                                    </div>

                                </div>

                                <div>
                                    <div className='pt-1'>
                                        <label htmlFor="email-address" className="sr-only">Search Friend</label>
                                        <input id="searchInput" name="searchInput" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2.5 border-slate-500 placeholder:slate-400 text-slate-300 rounded-lg border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs sm:text-sm bg-slate-700" placeholder="Search Friend" value={searchInput} onChange={handleInputChange}
                                            ref={inputref}
                                        // onKeyDown={handleKeydown} 
                                        //     onFocus={handleFocus}
                                        // onBlur={handleBlur}
                                        />

                                        <div className="pt-3 shadow-xl shadow-stone-500">
                                            <ul
                                                className='rounded-2xl bg-slate-700 
                                            absolute 
                                  right-4                                       left-4  sm:right-6                                     sm:left-6
                                             z-50'>
                                                {
                                                    (friends && friends.map((item) => {

                                                        return (
                                                            (selectedfriendSet && !selectedfriendSet.has(item.email)) ? (<li className='text-sm text-slate-200 hover:bg-sky-800  hover:text-slate-100 p-2.5 pt-1 h-full  cursor-pointer rounded-md'
                                                                key={item._id} onClick={() => handleSelectfriend(item)}
                                                            >
                                                                {item.name}
                                                            </li>) : <></>
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
                                    <label
                                        htmlFor="photo"
                                        className=" pt-1
                    block 
                    text-xs 
                    font-semibold 
                    leading-6 
                    text-gray-300
                  "
                                    >
                                        Selected participants
                                    </label>
                                    <div className="min-h-10">
                                        <div className="mt-2 flex flex-wrap items-center gap-x-1">

                                            <div className="flex gap-1 ">

                                                {selectedfriend && selectedfriend.map((item) => {

                                                    return (

                                                        <div className=" rounded-2xl bg-slate-300 flex  text-center justify-center p-1" key={item._id}>
                                                            <div className=' text-center font-bold text-black text-xs pl-0.5 pt-0.5 pb-0.5'
                                                            >
                                                                {item.name}
                                                            </div>
                                                            <div className="pl-1.5">                                  <div className=' text-red-600 hover:bg-red-500 hover:text-gray-100 rounded-full  cursor-pointer'
                                                                onClick={() => handleDeletefriend(item)}>
                                                                <RxCrossCircled className="text-xl font-semibold"
                                                                />
                                                            </div>
                                                            </div>                             </div>
                                                    )
                                                })}




                                            </div>                        </div>

                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="
            flex 
            items-center 
            justify-end 
            gap-x-4
          "
                    >
                        <Button
                            // disabled={isLoading}
                            secondary
                            onClick={onClose}
                            type="button"
                            fullWidth
                            variant="contained"
                            // sx={{ mt: 3, mb: 1 }}
                            className='w-full bg-cyan-600 text-white hover:bg-cyan-900 hover:text-white rounded-2xl py-1.5 lmd:py-2 text-sm'
                        >
                            Close
                        </Button>
                        {isbtnLoading ? <button
                            // disabled={isLoading}
                            // type="submit"
                            type="button"
                            fullWidth
                            variant="contained"
                            // sx={{ mt: 3, mb: 1 }}
                            className='w-full bg-cyan-900 text-white rounded-2xl py-1 lmd:py-2 item-center cursor-not-allowed'
                            onClick={createGroup}
                        >
                            <Box sx={{  }}>
                                    <CircularProgress className='font-extrabold' size={20} />
                                </Box>
                        </button> : <button
                            // disabled={isLoading}
                            // type="submit"
                            type="button"
                            fullWidth
                            variant="contained"
                            // sx={{ mt: 3, mb: 1 }}
                            className='w-full bg-cyan-600 text-white hover:bg-cyan-900 hover:text-white rounded-2xl py-1.5 lmd:py-2 text-sm'
                            onClick={createGroup}
                        >
                            Create
                        </button>}
                    </div>

                </div>
                {/* </form> */}

            </Modal>
        </>
    )
}

export default GroupModal