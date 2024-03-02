// "use client"

import React from 'react'
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { FaLock } from "react-icons/fa6";
import ClientButton from './client/ClientActionform'
import { TbMessageCircle2Filled } from "react-icons/tb";

const signup = () => {


  return (
    <>

      <Box
        sx={{
          marginTop: 7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // height: screen
        }}
      >
        <Avatar sx={{ m: 0, bgcolor: 'secondary.main' }}
          src='/favicon.ico'
        >
          {/* <LockOutlinedIcon /> */}
          {/* <TbMessageCircle2Filled className='text-xl text-sky-500'/> */}

        </Avatar>
        <Typography component="h1" variant="h5" className='text-white text-lg font-semibold pt-14'>
          <div className='flex flex-col items-center gap-2'>
            <div className="text-xl"><FaLock /></div>
            <h2 className='text-xl md:text-3xl text-center font-bold tracking-tight text-gray-100 mb-3'>
              Register
            </h2>
          </div>
        </Typography>
        <Box
          className='text-slate-400 text-sm pt-9 w-full lmd:container lmd:w-1/2 '
        >

          <ClientButton >  </ClientButton>

          <Grid container>
            <Grid item>
              Already have an account?
              <Link href={`/sign-in`} className='text-cyan-500 font-semibold' >
                {"  Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}

    </>
  )
}

export default signup