
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import getSession from "../../session/get-session";
import Chat from "@/models/Chat";
// var jwt = require('jsonwebtoken');


export async function POST(req) {

    const session = await getSession();
    try {
        await connectDb()
        const body = await req.json();
        const { receiveremail, isGroupChat, participants, Groupname } = body;

        // // console.log(body)
        // // console.log(body.name)

        let finduser = await User.findOne({ email: session.user.email })
        // let finduser = await User.findOne({ email: "abhinandanmaity1122@gmail.com" })
        let finduser_ = await User.findOne({ email: receiveremail })
        if (!finduser) {
            return NextResponse.json({ error: "User Not Exist !" }, { status: 400 })
        }
        if (!finduser_ && !isGroupChat) {
            return NextResponse.json({ error: "User Not Exist !" }, { status: 400 })
        }

        if (!isGroupChat && finduser_) {

            let findchat = await Chat.findOne({ sender: finduser._id, receiver: finduser_._id })
            let findchat_ = await Chat.findOne({ sender: finduser_._id, receiver: finduser._id })
            if (findchat && findchat_) {
                return NextResponse.json({ error: "Already Have a Chat" }, { status: 400 })
            }
            let add = finduser._id + "" + finduser_._id
            let chat = new Chat({ sender: finduser._id, receiver: finduser_._id, singlechatid: add });
            await chat.save();

            let chat_ = new Chat({ sender: finduser_._id, receiver: finduser._id, singlechatid: add });
            await chat_.save();
            
        } else if (isGroupChat && Groupname && participants) {
            let a = 33333333;
            let b = 99999999;

            let groupid = Math.floor(Math.random() * Date.now() * (a + (b - a) * Math.random()));

            let array = []
            array.push(finduser._id)
            participants.forEach(element=>{

                array.push(element._id)
            })

            // // console.log(array)
            let findchat = await Chat.findOne({ sender: finduser._id, Groupid: groupid, isGroupChat: true })
            if (findchat) {
                return NextResponse.json({ error: "Already Have a Group" }, { status: 400 })
            }
            let chatadmin = new Chat({ sender: finduser._id, Groupid: groupid, admin: finduser._id, participants: array, isGroupChat: true, Groupname: Groupname });

            await chatadmin.save();

            participants.forEach(async (element) => {

                let findparticipants = await User.findById(element._id)
                let chat = new Chat({ sender: findparticipants._id, Groupid: groupid, admin: finduser._id, participants: array, isGroupChat: true, Groupname: Groupname });

                await chat.save();
            });
        }

        return NextResponse.json({ success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}