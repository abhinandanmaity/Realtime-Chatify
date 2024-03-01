const mongoose = require('mongoose');

// TODO: Add image and pdf file sharing in the next version
const FriendSchema = new mongoose.Schema({

    sender: {
        type: String,
        // required: true,
    },
    sendername: {
        type: String,
        // required: true,
    },
    senderimage: {
        type: String,
        // required: true,
    },
    receiver: {
        type: String,
        // required: true,
    },
    friend: {
        type: Boolean,
        default: false
    },
    request: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });


const Friend = mongoose.models.Friend || mongoose.model('Friend', FriendSchema);
export default Friend;