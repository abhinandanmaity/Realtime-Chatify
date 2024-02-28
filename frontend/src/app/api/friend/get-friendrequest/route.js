
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

        let finduser_ = await User.findOne({ email: session.user.email })
        if (!finduser_) {
            return NextResponse.json({ error: "No Friend Exist!" }, { status: 400 })
        }
        let findfriend = await Friend.find({ receiver: session.user.email, request: true, friend: false})
        // if(!findfriend){
        //     return NextResponse.json({ error: "No friend Request" }, { status: 400 })
        // }

        return NextResponse.json({ friends: findfriend }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}