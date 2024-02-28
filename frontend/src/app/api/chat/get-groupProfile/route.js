
import { connectDb } from "@/lib/connectDB";
import Chat from "@/models/Chat";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
        await connectDb()
        const body = await req.json();
        const { id } = body
        // // console.log(body.email)
        // // console.log("session")
        // // console.log(session)

        let findchat = await Chat.findOne({_id: id, isGroupChat: true})
        if (!findchat) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }
        let finduser = await User.findOne( findchat.admin )
        if (!finduser) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }
        let array = []
        // findchat.participants.forEach(async (element) => {

        //     let findparticipants = await User.findById(element)
        //     // console.log(element)

        //     array.push(findparticipants)
        // });
        // // console.log(findchat.participants)
        let arr = findchat.participants
        for (let i = 0; i < findchat.participants.length; i++) {
            const element = arr[i];
            
            let findparticipants = await User.findById(element)
            // let user = await User.findById(findparticipants.sender)
            // // console.log(element)

            array.push(findparticipants)
        }
        // // console.log(array)
        let group = { ...findchat, participant: array, user: finduser };

        return NextResponse.json({ group: group, profile: false }, { success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}