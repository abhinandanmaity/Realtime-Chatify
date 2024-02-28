
// import { Server } from "socket.io";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function POST(req, res) {

    try {

        let finduser = await User.find()

        console.log("finduser")
        console.log(finduser)

        return NextResponse.json({ data: finduser }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }

}