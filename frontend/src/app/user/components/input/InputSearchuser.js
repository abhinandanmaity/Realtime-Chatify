"use client"

import React, {useState} from 'react'

const InputSearchuser = ({username, setUsername}) => {

    const handlechange = (e) => {

        if (e.target.name == 'username'){
          setUsername(e.target.value);
        }
      }

    return (
        <>
            <div className='container mx-auto'>
                <label htmlFor="email-address" className="sr-only">Search User</label>
                <input id="username" name="username" type="text" autoComplete="name" className="appearance-none relative block w-full px-3 lmd:px-5 py-3 lmd:py-3.5 border-slate-500 placeholder:slate-400 text-slate-200 rounded-xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs lmd:text-sm bg-slate-700 " placeholder="Search user" onChange={handlechange} value={username}/>
            </div>
        </>
    )
}

export default InputSearchuser