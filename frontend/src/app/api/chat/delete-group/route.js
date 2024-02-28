
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Chat from "@/models/Chat";
import Message from "@/models/Message";


export async function POST(req) {

    try {
        await connectDb()
        const body = await req.json();
        const { id } = body

        // // console.log(body)
        // // console.log(body.name)

        let findchat = await Chat.findById(id)
        if (!findchat) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }
        findchat.participants.forEach(async element => {

            let findc = await Chat.findOne({ sender: element, Groupid: findchat.Groupid })
            await Message.deleteMany({ sender: element, chat: findc._id })
        });
        await Chat.deleteMany({ Groupid: findchat.Groupid })

        return NextResponse.json({ success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}