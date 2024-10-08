
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");


export async function POST(req) {

    try {
        await connectDb()
        const body = await req.json();
        const { name, username, email, password } = body;

        // // console.log(body)
        // // console.log(body.name)

        let finduser = await User.findOne({ email: email })
        let finduser_ = await User.findOne({ username: username })
        if (finduser) {
            return NextResponse.json({ error: "Email Already Exist !" }, { status: 400 })
        }
        if (finduser_) {
            return NextResponse.json({ error: "Username Already Exist !" }, { status: 400 })
        }

        let user = new User({ name, username, email, password: CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET_KEY).toString() });

        await user.save();

        return NextResponse.json({ success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}