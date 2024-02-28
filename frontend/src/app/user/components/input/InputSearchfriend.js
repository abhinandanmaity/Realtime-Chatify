import React from 'react'
// import Input from '@mui/joy/Input';
import { ChatState } from '@/app/Provider/ChatProvider';

const InputSearchfriend = () => {

    const { inputfieldsearch, setInputfieldsearch } = ChatState()

    return (
        <>
            <div className="">
                {/* <Input
                    disabled={false}
                    placeholder="Search chat"
                    size="md"
                    variant="solid"
                /> */}

                <div className='container mx-auto'>
                    <label htmlFor="email-address" className="sr-only">Name</label>
                    <input id="inputfieldsearch" name="inputfieldsearch" type="text" autoComplete="name" className="appearance-none relative block w-52 lmd:w-64 px-3 lmd:px-5 py-3 lmd:py-3.5 border-slate-500 placeholder:slate-400 text-slate-200 rounded-xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs lmd:text-sm bg-slate-700 " placeholder="Search user"
                        value={inputfieldsearch}
                        onChange={(e) => setInputfieldsearch(e.target.value)}
                    />
                </div>

            </div>
        </>
    )
}

export default InputSearchfriend
