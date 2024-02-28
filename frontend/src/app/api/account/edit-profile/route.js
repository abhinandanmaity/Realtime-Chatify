
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import getSession from "../../session/get-session";


export async function POST(req) {

    let session = await getSession()

    try {
        await connectDb()
        const body = await req.json();
        const { name, image, desc } = body;

        // // console.log(body)
        // // console.log(body.name)

        let finduser = await User.findOne({ email: session.user.email })
        if (!finduser) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }

        if (image && desc && name) {

            await User.findByIdAndUpdate(finduser._id, { name: name, image: image, desc: desc })
        } else if (desc && name) {

            await User.findByIdAndUpdate(finduser._id, { name: name, desc: desc })
        } else if (image && name) {

            await User.findByIdAndUpdate(finduser._id, { name: name, image: image })
        } else if (image && desc) {

            await User.findByIdAndUpdate(finduser._id, { image: image, desc: desc })
        } else if (desc) {

            await User.findByIdAndUpdate(finduser._id, { desc: desc })
        } else if (name) {

            await User.findByIdAndUpdate(finduser._id, { name: name })
        } else if (image) {

            await User.findByIdAndUpdate(finduser._id, { image: image })
        }

        //         let f = await User.findOne({ email: session.user.email })
        // // console.log(f)
        // await finduser.save();

        return NextResponse.json({ success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}