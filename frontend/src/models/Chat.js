// import mongoose, { Schema } from "mongoose";

// const chatSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     isGroupChat: {
//       type: Boolean,
//       default: false,
//     },
//     lastMessage: {
//       type: Schema.Types.ObjectId,
//       ref: "ChatMessage",
//     },
//     participants: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     admin: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export const Chat = mongoose.model("Chat", chatSchema);


const mongoose = require('mongoose');


const ChatSchema = new mongoose.Schema({

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  singlechatid:{
    type: String
  },
  Groupid:{
    type: String
  },
  Groupdesc:{
    type: String
  },
  Groupname:{
    type: String
  },
  Groupimage:{
    type: String
  },
  isGroupChat: {
    type: Boolean,
    default: false,
  },
  notilen: {
    type: Number,
    default: 0
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  // message_id: {
  // message: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Message",
  //   }
  // ],
  //   default: [],
  // },

}, { timestamps: true });


const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
export default Chat;