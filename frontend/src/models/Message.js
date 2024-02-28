const mongoose = require('mongoose');

// TODO: Add image and pdf file sharing in the next version
const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
  },
  attachments: {
    // type: [
    //   {
    //     url: String,
    //     localPath: String,
    //   },
    // ],
    // default: [],
    type: String
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  seen: { type: Boolean, default: false },
  messagedate: { type: String },
  messagetime: { type: String },
  messagehour: { type: String },
  messageminute: { type: String },
  messagesecond: { type: String },

}, { timestamps: true });


const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
export default Message;