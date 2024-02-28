
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import getSession from "../../session/get-session";

export async function POST(req) {

    const session = await getSession();
    try {
        await connectDb()
        // const body = await req.json();
        // // console.log(body.email)

        let finduser = await User.findOne({ email: session.user.email })
        if (!finduser) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }
        // // console.log(finduser)

        return NextResponse.json({ name: finduser.name, email: finduser.email, image: finduser.image, _id: finduser._id, username: finduser.username }, { success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}