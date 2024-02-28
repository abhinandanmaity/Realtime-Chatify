import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Tostercontex = () => {

    return (
        <>
            <ToastContainer
                style={{ fontSize: '12px' }}
                position="bottom-center"
                autoClose={941}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Tostercontex