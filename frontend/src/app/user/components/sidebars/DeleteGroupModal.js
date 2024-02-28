import React, { useState } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import Modal from '../modals/Modal';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';


const DeleteGroupModal = ({ isOpenDelete, onClose, dat }) => {

    const router = useRouter();

    const [isbtnLoading, setIsbtnLoading] = useState(false);

    const handleDelete = (e) => {

        e.preventDefault();
        let data = { id: dat._doc._id }

        setIsbtnLoading(true)

        axios.post('/api/account/delete-group', data)
            .then((res) => {

                onClose()
                router.push("/user/conversations")
                window.location.reload();
            })
            .catch((callback) => {

                toast.error('Slow Internet Speed', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // console.log("callback")
            })
            .finally(() => setIsbtnLoading(false))
    }

    return (
        <Modal isOpen={isOpenDelete} onClose={onClose}>

            <div className="">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-6 flex justify-start">
                        <div className="pr-5">
                            <div className=" bg-red-100 rounded-full p-1.5">
                                <FiAlertTriangle className='h-6 w-6  text-red-700' />
                            </div>
                        </div>
                        <div
                            className="
text-sm 
font-semibold 
leading-7 
text-slate-200
"
                        >
                            Delete Account
                        </div>

                    </div>
                </div>

                <div className="text-gray-100 text-sm pt-2 pb-9 pl-5">

                    Are you sure you want to delete your account ?

                </div>

                <div
                    className="
flex
 items-end
justify-end 
gap-x-4
"
                >
                    <button
                        // secondary
                        onClick={onClose}
                        type="button"
                        // fullWidth
                        // variant="contained"
                        // sx={{ mt: 3, mb: 1 }}
                        className=' bg-cyan-600 text-white hover:bg-cyan-900 hover:text-white rounded-2xl py-1.5 lmd:py-2 text-sm
                            pt-1.5 pb-1.5 pl-4 pr-4
                            '
                    >
                        Cancel
                    </button>
                    {/* <button
                        // type="submit"
                        type="button"
                        // fullWidth
                        // variant="contained"
                        // sx={{ mt: 3, mb: 1 }}
                        className=' bg-red-700 text-white hover:bg-red-900 hover:text-white rounded-2xl py-1.5 lmd:py-2 text-sm
                            pt-1.5 pb-1.5 pl-4 pr-4'
                        
                    >
                        
                    </button> */}
                    {isbtnLoading ? <button
                        // disabled={isLoading}
                        // type="submit"
                        type="button"
                        // fullWidth
                        // variant="contained"
                        // sx={{ mt: 3, mb: 1 }}
                        className='w-full bg-red-900 text-white rounded-2xl py-1 lmd:py-2 cursor-not-allowed item-center'
                    // onClick={createGroup}
                    >
                        <Box sx={{ }}>
                            <CircularProgress className='font-extrabold' size={21} />
                        </Box>
                    </button> : <button
                        // disabled={isLoading}
                        // type="submit"
                        type="button"
                        // fullWidth
                        // variant="contained"
                        // sx={{ mt: 3, mb: 1 }}
                        className=' bg-red-700 text-white hover:bg-red-900 hover:text-white rounded-2xl py-1.5 lmd:py-2 text-sm
                            pt-1.5 pb-1.5 pl-4 pr-4'
                        onClick={handleDelete}
                    >
                        Delete
                    </button>}
                </div>

            </div>

        </Modal>
    )
}

export default DeleteGroupModal