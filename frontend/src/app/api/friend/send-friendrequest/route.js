
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

        // // console.log(body)
        // // console.log(body.name)

        let finduser_ = await User.findOne({ username: username })
        if (!finduser_) {
            return NextResponse.json({ error: "User Not Exist !" }, { status: 400 })
        }
        let findfriend = await Friend.findOne({ sender: session.user.email, receiver: finduser_.email })
        let findfriend_ = await Friend.findOne({ sender: finduser_.email, receiver: session.user.email })
        if (findfriend || findfriend_) {
            return NextResponse.json({ error: "Already Your Friend" }, { status: 400 })
        }

        let friend = new Friend({ sender: session.user.email, sendername: session.user.name, senderimage: session.user.image, receiver: finduser_.email, friend: false, request: true });

        await friend.save();

        return NextResponse.json({ success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}