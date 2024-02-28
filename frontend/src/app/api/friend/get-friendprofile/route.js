
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

        let findchat = await Chat.findById(id)
        if (!findchat) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }
        let finduser = await User.findById(findchat.receiver)
        if (!finduser) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }
        // // console.log(finduser)

        return NextResponse.json({ _id: finduser._id, name: finduser.name, email: finduser.email, image: finduser.image, desc: finduser.desc, createdAt: finduser.createdAt, profile: true }, { success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}