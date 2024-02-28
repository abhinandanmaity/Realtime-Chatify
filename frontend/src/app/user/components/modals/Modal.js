"use client"

import React, { useState, Fragment } from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
// import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Dialog, Transition } from '@headlessui/react'
import { IoIosCloseCircleOutline } from "react-icons/io";


const ModalAddchat = ({ onClose, isOpen, children }) => {

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="
              fixed 
              inset-0 
              bg-gray-500 
              bg-opacity-45 
              transition-opacity
            "
            />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="
              flex 
              min-h-screen 
              items-center 
              justify-center 
              p-4 
              text-center 
              sm:p-0
              overflow-hidden
            "
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="
                  relative 
                  transform 
                  
                  rounded-2xl 
                  bg-slate-800 
                  px-4 
                  pb-4
                  pt-5 
                  text-left 
                  shadow-2xl 
                  transition-all
                  
                  w-full
                  sm:my-8 
                  sm:container 
                  sm:max-w-2xl 
                  sm:p-6
                "
                >
                  <div
                    className="
                    absolute 
                    right-0 
                    top-0
                    pr-4 
                    pt-4 
                    z-10
                    "
                    // for hidden in sm media quary
                    // hidden 
                    // sm:block
                  >
                    <button
                      type="button"
                      className="
                      rounded-lg 
                      bg-white 
                      text-gray-400 
                      hover:text-gray-500 
                      focus:outline-none 
                      
                    "
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      {/* <IoClose className="h-6 w-6" aria-hidden="true" /> */}
                      <IoIosCloseCircleOutline className="h-6 w-6  text-white bg-slate-800" aria-hidden="true"/>
                    </button>
                  </div>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

    </>
  )
}

export default ModalAddchat