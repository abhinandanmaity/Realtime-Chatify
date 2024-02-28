
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
        const { email, reques } = body;

        // // console.log(body)
        // // console.log(body.name)

        let finduser_ = await User.findOne({ email: email })
        // // console.log(finduser_)
        if (!finduser_) {
            return NextResponse.json({ error: "User Not Exist !" }, { status: 400 })
        }

        let findfriend = await Friend.findOne({ sender: finduser_.email, receiver: session.user.email, request: true})
        if(!findfriend){
            return NextResponse.json({ error: "Already friend" }, { status: 400 })
        }
        
        const filter = {sender: finduser_.email, receiver: session.user.email, request: true}
        if(reques){

            const update = {$set:{friend: true, request: false}}
            const friend = await Friend.updateOne(filter, update);
        }else if(!reques){
            
            const friend = await Friend.deleteOne(filter)
        }

        return NextResponse.json({ success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}