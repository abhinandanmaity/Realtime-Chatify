import React from 'react'

const InputMessage = ({content, handlechange, ref}) => {


    return (
        <>
            <div className='container mx-auto'>
                <label htmlFor="email-address" className="sr-only">Message</label>
                <input id="content" name="content" type="text" autoComplete="name" className="appearance-none relative block w-full px-3 lmd:px-5 py-3.5 lmd:py-4 border-slate-500 placeholder:slate-400 text-slate-200 rounded-xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs lmd:text-sm bg-slate-700 " placeholder="Message" 
                value={content} onChange={handlechange} ref={ref}/>
            </div>

        </>
    )
}

export default InputMessage