// "use client"

// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    
    value: "",
}

export const conversationidSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setChatid: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // session();
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
export const { setChatid } = conversationidSlice.actions

export default conversationidSlice.reducer