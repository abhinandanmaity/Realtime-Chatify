
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
        const { memberid, id } = body

        // // console.log(memberid)
        // // console.log(id)
        // // console.log(body.name)

        let findchat = await Chat.findById(id)
        let finduser = await User.findOne({ email: session.user.email })
        let findmember = await User.findById(memberid)
        // // console.log(findchat.admin.toString() !== finduser._id.toString())
        // console.log(findmember._id)
        if (!findchat) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }
        if (findchat.admin.toString() !== finduser._id.toString() || !findmember) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }
        
        let findchatmember = await Chat.findOne({sender: findmember._id, Groupid: findchat.Groupid, isGroupChat: true})

        let arr = findchat.participants
        let array = arr.filter(ele => ele.toString() !== findmember._id.toString())
        // // console.log(array)
        // // console.log(findchatmember)

        array.forEach(async eleme => {

            // let findc = await Chat.findOne({ sender: eleme, Groupid: findchat.Groupid })
            await Chat.findOneAndUpdate({ sender: eleme, Groupid: findchat.Groupid, isGroupChat: true }, { participants: array })
        });

        await Message.deleteMany({ sender: findmember._id, chat: findchatmember._id })
        await Chat.deleteOne({ sender: findmember._id, Groupid: findchat.Groupid })

        return NextResponse.json({ success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}