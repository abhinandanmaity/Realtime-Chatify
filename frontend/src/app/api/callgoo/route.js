
// import { Server } from "socket.io";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDB";


export async function GET(req, res) {

    try {

        await connectDb()
        let finduser = await User.find({})

        // console.log("finduser")
        // console.log(finduser)

        return NextResponse.json({ data: finduser }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }

}