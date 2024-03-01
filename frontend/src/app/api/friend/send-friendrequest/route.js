
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import getSession from "../../session/get-session";
import Friend from "@/models/Friend";
// var jwt = require('jsonwebtoken');


export async function POST(req) {

    const session = await getSession();
    try {
        await connectDb()
        const body = await req.json();
        const { username } = body;

        // console.log("n -- session.user.email =-- ")
        // console.log(session.user.email)
        // console.log(username)
        // console.log(session.user.email)

        let finduser_ = await User.findOne({ username: username })
        let finduser = await User.findOne({ email: session.user.email })
        if (!finduser_ || !finduser) {
            return NextResponse.json({ error: "User Not Exist !" }, { status: 400 })
        }

        // console.log("finduser_")
        // console.log(finduser)
        // console.log(finduser_)
        let findfriend = await Friend.findOne({ sender: finduser.email, receiver: finduser_.email })
        let findfriend_ = await Friend.findOne({ sender: finduser_.email, receiver: finduser.email })
        // let findfriend = await Friend.findOne({ sender: "abhinandanmaity222@gmail.com", receiver: finduser_.email })
        // let findfriend_ = await Friend.findOne({ sender: finduser_.email, receiver: "abhinandanmaity222@gmail.com" })

        if (findfriend || findfriend_) {
            return NextResponse.json({ error: "Already Your Friend" }, { status: 400 })
        }

        // console.log(findfriend)
        // console.log(findfriend_)
        if (finduser.image) {
            // console.log("--- hot hot --- ")
            let friend = new Friend({ sender: finduser.email, sendername: finduser.name, senderimage: finduser.image, receiver: finduser_.email, friend: false, request: true });
            // let friend = new Friend({ sender: "abhinandanmaity222@gmail.com", sendername: "session.user.name", senderimage: "session.user.image", receiver: finduser_.email, friend: false, request: true });
            // console.log("friend")
            // console.log(friend)
            await friend.save();
        } else {

            // console.log("hot hot")
            let friend = new Friend({ sender: finduser.email, sendername: finduser.name, receiver: finduser_.email, friend: false, request: true });
            // let friend = new Friend({ sender: "abhinandanmaity222@gmail.com", sendername: "session.user.name", senderimage: "session.user.image", receiver: finduser_.email, friend: false, request: true });
            // console.log("friend")
            // console.log(friend)
            await friend.save();
            // console.log("friend")
        }

        // console.log("friend")

        return NextResponse.json({ success: "success" }, { status: 200 })

    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}