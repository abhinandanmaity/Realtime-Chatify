// "use client"

// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    value: {},
}

export const userprofileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserprofile: (state, action) => {

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
export const { setUserprofile } = userprofileSlice.actions

export default userprofileSlice.reducer