
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    desc: { type: String, default: undefined },
    image: { type: String, default: undefined },
    friend_id: {
        friend: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Friend"
            }
        ],
    }
    // resetToken: { type: String },
    // expireToken: { type: Date },
    // presetToken: { type: String },
    // pexpireToken: { type: Date },

}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("User", UserSchema);
