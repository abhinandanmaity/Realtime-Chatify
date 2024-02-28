
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Chat from "@/models/Chat";
import Message from "@/models/Message";
import getSession from "../../session/get-session";


export async function POST(req) {

    let session = await getSession()
    try {
        await connectDb()
        const body = await req.json();
        const { id } = body

        // // console.log(body)
        // // console.log(body.name)

        let findchat = await Chat.findById(id)
        let finduser = await User.findOne({ email: session.user.email })
        if (!findchat) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }

        let arr = findchat.participants
        let array = arr.filter(ele => ele != finduser._id)

        array.forEach(async eleme => {

            // let findc = await Chat.findOne({ sender: eleme, Groupid: findchat.Groupid })
            await Chat.findOneAndUpdate({ sender: eleme, Groupid: findchat.Groupid, isGroupChat: true }, { participants: array })
        });

        await Message.deleteMany({ sender: finduser._id, chat: findchat._id })
        await Chat.deleteOne({ sender: finduser._id, Groupid: findchat.Groupid })

        return NextResponse.json({ success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}