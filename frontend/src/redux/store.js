// "use client"

import { configureStore } from '@reduxjs/toolkit'
import sessionSlice from './slice/user/sessionSlice'
import conversationidSlice from './slice/conversationidSlice'
import groupprofileSlice from './slice/groupprofileSlice'
import userprofileSlice from './slice/userprofileSlice'
import messagesSlice from './slice/messagesSlice'
import onlineuserSlice from './slice/onlineuserSlice'

export const store = configureStore({
  reducer: {
    session: sessionSlice,
    currentchatid: conversationidSlice,
    groupprofile: groupprofileSlice,
    userprofile: userprofileSlice,
    messages: messagesSlice,
    onlineuser: onlineuserSlice,
  },
})