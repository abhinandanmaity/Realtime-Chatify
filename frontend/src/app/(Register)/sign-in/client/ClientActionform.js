"use client"

import React, { useState } from 'react'
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { signIn } from "next-auth/react"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux'
import { useremail } from '@/redux/slice/user/sessionSlice';


const ClientButton = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSign, setIsLoadingSign] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlechange = (e) => {

    if (e.target.name == 'email') {
      setEmail(e.target.value);
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value);
    }

    // else if (e.target.name == 'code') {
    //     setCode(e.target.value);
    // }

    // let n = name == undefined ? 0 : name.length;
    // let p = password == undefined ? 0 : password.length;

    // if (n >= 1) {
    //     setNvalidate(true)
    // }
    // if (p >= 4) {
    //     setPvalidate(true)
    // }
  }

  const userdispatch = () => {

    dispatch(useremail());
  }

  const handlesubmit = (e) => {

    e.preventDefault();
    setIsLoadingSign(true);

    // let n = name == undefined ? 0 : name.length;
    // let p = password == undefined ? 0 : password.length;

    // if (n <= 0) {
    //     setNvalidate(false)
    // }
    // if (p <= 4) {
    //     setPvalidate(false)
    // }

    const data = {
      email, password
    };


    if (email.length >= 5 && password.length >= 0) {

      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          // console.log(callback)
          // console.log(callback.error)
          // console.log(callback.ok)
          if (callback.error) {

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
          if (callback.ok && !callback.error) {



            // router.refresh("/user")
            router.push("/user")
            // window.location.reload();

            toast.success('Sign in Successfully', {
              position: "bottom-center",
              autoClose: 941,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            // userdispatch();

          }
        })
        .finally(() => setIsLoadingSign(false))

    } else {

      setIsLoadingSign(false);
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

  const loginWithGoogle = () => {
    // e.preventDefault();
    setIsLoading(true);

    // throw new Error("does not matter")
    signIn('google', { redirect: false })
      .then((callback) => {
        // console.log("callback")
        // console.log(callback)
        // console.log(callback.error)
        // console.log(callback.ok)

        if (callback) {

          if (callback.error) {
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

          if (callback.ok && !callback.error) {
            router.push("/user")
            // window.location.reload();
            // dispatch(useremail());
          }
        }
      })
      .finally(() => setIsLoading(false));
  }
  // console.log(username);

  return (
    <>
      <div>

        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input id="email-addressq" name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-3 py-2.5 border-slate-500 placeholder:slate-400 text-slate-300 rounded-lg border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm text-xs sm:text-sm bg-slate-700" placeholder="Email address" value={email} onChange={handlechange} />
        </div>
        <div className='py-2'>
          <label htmlFor="password" className="sr-only">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none relative block w-full px-3 py-2.5 border-slate-500 placeholder-slate-400 text-slate-300 rounded-lg border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 text-xs sm:text-sm bg-slate-700" placeholder="Password" value={password} onChange={handlechange} />
        </div>
        {/* <TextField
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // autoFocus
                className='text-slate-300 bg-slate-700 '
              // color='primary'
              /> */}
        {/* <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className='text-slate-300'
              // color="primary"
              /> */}
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"

        />
        {!isLoadingSign ? (<Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 1 }}
          className='w-full bg-cyan-600 text-white hover:bg-cyan-900 hover:text-white rounded-2xl'
          onClick={handlesubmit}
        >
          Sign In
        </Button>) :
          (<Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
            className='bg-cyan-900 hover:bg-cyan-900 rounded-2xl cursor-not-allowed'
          >
            <Box sx={{ display: 'flex' }}>
              <CircularProgress className='font-extrabold' size={24} />
            </Box>
          </Button>)}

        {isLoading ? (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 0, mb: 1 }}
            type='button'
            className='bg-cyan-900 hover:bg-cyan-900 rounded-2xl cursor-not-allowed'
            onClick={loginWithGoogle}
          >

            <Box sx={{ display: 'flex' }}>
              <CircularProgress className='font-extrabold' size={24} />
            </Box>
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 0, mb: 1 }}
            type='button'
            className='bg-cyan-600 text-white hover:bg-cyan-900 hover:text-white rounded-2xl'
            onClick={loginWithGoogle}
          >

            <svg
              className='mr-2 h-4 w-4'
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='github'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'>
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                fill='#4285F4'
              />
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                fill='#34A853'
              />
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                fill='#FBBC05'
              />
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              />
              <path d='M1 1h22v22H1z' fill='none' />
            </svg>

            Google
          </Button>
        )}

      </div>
    </>

  )
}

export default ClientButton