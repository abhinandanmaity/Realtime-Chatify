
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import getsession from "../../session/get-session";

export async function POST(req) {

    const session = await getsession();
    try {
        await connectDb()
        // const body = await req.json();
        // // console.log(body.email)
        // // console.log("session")
        // // console.log(session)

        let finduser = await User.findOne({ email: session.user.email })
        if (!finduser) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }
        // // console.log(finduser)

        return NextResponse.json({ name: finduser.name, email: finduser.email, image: finduser.image, desc: finduser.desc, createdAt: finduser.createdAt, _id: finduser._id, profile: true }, { success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}