// "use client"

// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    
    value: [],
}

export const onlineuserSlice = createSlice({
    name: 'onlineuser',
    initialState,
    reducers: {
        setOnlineuser: (state, action) => {

            state.value = action.payload
        },
        // decrement: (state) => {
        //   state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { setOnlineuser } = onlineuserSlice.actions

export default onlineuserSlice.reducer