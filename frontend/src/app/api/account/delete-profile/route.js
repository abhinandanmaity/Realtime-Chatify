
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import getSession from "../../session/get-session";
import Chat from "@/models/Chat";
import Message from "@/models/Message";


export async function POST(req) {

    let session = await getSession()

    try {
        await connectDb()
        const body = await req.json();

        // // console.log(body)
        // // console.log(body.name)

        let finduser = await User.findOne({ email: session.user.email })
        if (!finduser) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }
        let findchat = await Chat.find({ sender: finduser._id });

        findchat.forEach(async element => {

            if (element.isGroupChat == true) {

                let arr = element.participants
                let array = arr.filter(ele => ele != finduser._id)

                element.participants.forEach(async eleme => {

                    // await Chat.findByIdAndUpdate(eleme, { participants: array })
                    await Chat.findOneAndUpdate({ sender: eleme, Groupid: element.Groupid, isGroupChat: true }, { participants: array })
                });
                await Chat.findByIdAndDelete(element._id);
                await Message.deleteMany({ sender: finduser._id })
            } else {

                await Chat.deleteOne({ sender: element.receiver, receiver: element.sender })
                await Chat.deleteOne({ receiver: element.receiver, sender: element.sender })
                await Message.deleteMany({ sender: finduser._id })
            }
        });

        await Friend.deleteMany({ sender: finduser.email })
        await Friend.deleteMany({ receiver: finduser.email })
        await User.findByIdAndDelete(finduser._id);

        return NextResponse.json({ success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}