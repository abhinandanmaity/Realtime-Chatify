// "use client"

// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createSlice } from '@reduxjs/toolkit'
import { useSession } from 'next-auth/react';
// import { getServerSession } from "next-auth";


// const session = async () => {

//     return await getServerSession(authOptions);

// }

const initialState = {
    // const {data: session} = useSession();
    value: "",
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        useremail: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // session();
            const {data: session} = useSession();
            // console.log(session)
            // state.value = "user.email";
            if (session && session.user) {

                state.value = session.user;
            }
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
export const { useremail } = sessionSlice.actions

export default sessionSlice.reducer