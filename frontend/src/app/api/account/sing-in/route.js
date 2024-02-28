
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


export async function GET(req) {

    try {
        await connectDb()
        const { email, password } = req.body;

        let user = await User.findOne({ email: email })

        let bytes = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_SECRET_KEY);


        if (user) {

            if ((email === user.email) && (password === bytes.toString(CryptoJS.enc.Utf8))) {

                let token = jwt.sign({ roll: user.roll, img: user.img, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '25d' });

                user.resetToken = token
                user.expireToken = Date.now() + 2160000000

                await user.save();

                return NextResponse.json({ token: token }, { status: 200 })
                // const t = jwt.verify(token, 'SDDFF%*&^%#GFGjwts763267ecretHJJK%^^&**(%^5475jhdh')
                // // // console.log(t)
                // // console.log(t.email);

            } else {
                return NextResponse.json({ error: "Invalid request type" }, { status: 400 })
            }

        } else {
            return NextResponse.json({ error: "Invalid request type" }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ error: "Invalid request type" }, { status: 400 })
    }
}