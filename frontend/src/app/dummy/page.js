"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { Dialog, Transition } from '@headlessui/react';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Select from 'react-select';
import axios from 'axios';
import AsyncSelect from "react-select/async";
import { components } from 'react-select';
// import { useSocket } from '@/components/Provider/SocketProvider';
// import Inputsocketmessage from '@/components/socket/inputsocketmessage';
import { io } from "socket.io-client";

const MultiValue = ({ data }) => (
  <div>
    {/* {data.name} */}
  </div>
);

const customcomponent = {
  MultiValue,
};

const page = () => {

  const [addchat, setAddchat] = useState(false);

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };


  const [isLoading, setIsLoading] = useState(true);

  const loginWithGoogle = (e) => {
    e.preventDefault();
  }

  // const [isOpen, setOpen] = useState(true);

  // const [options, setOptions] = useState([]);

  // const loadOptions = async (inputValue) => {
  //   axios.post('api/setting/finduser')
  //                   .then((res) => {
  //     const users = response.data.conversations.map(user => ({
  //       value: user._id, // Assuming your user model has an _id field
  //       label: user.name // Assuming your user model has a name field
  //     }));
  //     setOptions(users);
  //                   })
  //  .catch ((error) => {
  //     console.error('Error fetching users:', error);
  //   })
  // };

  const [inputmes, setInputmes] = useState()
  const [list, setList] = useState()

  const [inputvalue, setValue] = useState([]);
  const [member, setMember] = useState([]);

  // let Selectedvalue = []

  const [Selectedvalue, setSelectedvalue] = useState([]);
  const fetchUsers = async (inputValue) => {
    try {
      // console.log(inputValue)
      const response = await axios.post('/api/setting/finduser', { inputValue });
      // const op = []
      // response.data.conversations.map((item)=>{
      //   if(item.name)
      //   op.push(item)
      // })
      // console.log(response.data.conversations)
      const regexPattern = new RegExp(inputValue, 'i');
      const filteredNames = response.data.conversations.filter(name => regexPattern.test(name.name));
      // console.log(filteredNames)

      // return filteredNames;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const handleInputChange = (value) => {

    setValue(value)
  }
  const handlechange = (value) => {

    // const ar = []
    // Selectedvalue.forEach((element)=>{

    //   ar.push(element);
    // })
    // ar.push(value);
    // console.log("ar")
    // console.log(ar)
    // setMember(ar)
    setSelectedvalue(value)
  }

  const customStyles = {
    multiValue: (base, state) => ({
      ...base,
      backgroundColor: '#cfd6e2', // Change background color
      borderRadius: '20px', // Change border radius
      padding: '4px 4px', // Change padding
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
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '2px #9fadc6' : '2px #7085a9', // Example border style
      boxShadow: 'none',
      '&:hover': {
        // borderColor: '#9fadc6', // Example hover styles
      },
      backgroundColor: '#394760',
      borderRadius: '10px'

    }),
    container: (provided) => ({
      ...provided,
      // width: 300, // Example: set the width of the container
      // borderRadius: '20px'
    }),
    option: (provided, state) => ({
      ...provided,
      // backgroundColor: state.isSelected ? '#007bff' : 'green', // Example: change background color of selected option
      // color: state.isSelected ? 'white' : '#333', // Example: change text color of selected option

      backgroundColor: state.isFocused ? '#303c50' : '#394760',
      color: state.isFocused ? '#dfe4ec' : '#cfd6e2',
      cursor: 'pointer',
      fontSize: '14px', // Change font size
      // borderRadius: '10px'

    }),
    noOptionsMessage: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#007bff' : '#394760',
      color: '#cfd6e2', // Change the color to red or any other color you prefer
      fontSize: '14px', // Change font size
      borderRadius: '7px'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#bfc9d9', // Customize placeholder color here
      fontSize: '14px',
      padding: '8px 8px'
    }),
    input: (provided) => ({
      ...provided,
      color: '#eff1f5', // Example text color
      borderRadius: '10px',
      fontSize: '16px',
      padding: '8px 8px'
    }),
    menuPortal: (base) => ({
      ...base,
      borderRadius: '8px', // Set your desired border radius here
      backgroundColor: 'red'
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

  const [isOpen, setIsOpen] = useState(true);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");
  // const [socket, setSocket] = useState(null);

  // const socket = io("http://localhost:3000")
  // const socket = useMemo(
  //   () =>
  //     io("http://localhost:3000", {
  //       withCredentials: true,
  //     }),
  //   []
  // );


  
  // useEffect(() => {

  //   // const newSocket = io('http://localhost:8000');
  //   // setSocket(newSocket);

  //   socket.on("connect", () => {
  //     setSocketId(socket.id);
  //     console.log("connected", socket.id);
  //   });
    
  //   socket.on("receive-message", (data) => {
  //     console.log(data);
  //     setMessages((messages) => [...messages, data]);
  //   });
    
  //   // socket.on("welcome", (s) => {
  //   //   console.log(s);
  //   // });
    
  //   // return () => {
  //   //   newSocket.disconnect();
  //   // };
  // }, []);
  
  // const handlesendSubmit = (e) => {
  //   e.preventDefault();
  //   socket.emit("message", message);
  //   setMessage("");
  // };

  // const joinRoomHandler = (e) => {
  //   e.preventDefault();
  //   socket.emit("join-room", roomName);
  //   setRoomName("");
  // };

  return (
    <>

      {/* <input name="message" id="message" type="text" className='w-60 p-3 bg-gray-300 text-black border border-red-400 rounded-xl' value={message} onChange={(e) => { setMessage(e.target.value) }} />
      <button type="submit" className='p-2 bg-green-200' onClick={handlesendSubmit}>send</button>

      <div className="font-extrabold text-black text-xl">
        Message are
      </div> */}
      {/* <div className='pt-6'>
        {messages.map((m, i) => (
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </div> */}

      {/* <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-20 overflow-y-auto" onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle">&#8203;</span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg z-40">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Select Users
              </Dialog.Title>
              <div className="mt-2"> {/* Adjust height here */}

      {/* <div className="container mx-auto w-full">

                  <input type='text' 
                  className=''
                  />

                  <div className="">

                  </div>

                </div>
              </div>
              <div className="mt-4 text-right">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div> */}
      {/* // </div> */}
      {/* // </Transition.Child> */}
      {/* // </div> */}
      {/* // </Dialog> */}
      {/* // </Transition> */}

      {/* <Inputsocketmessage /> */}



    </>
  )
}

export default page