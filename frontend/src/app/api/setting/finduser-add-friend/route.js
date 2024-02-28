
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import getSession from "../../session/get-session";
import Friend from "@/models/Friend";
// var jwt = require('jsonwebtoken');


export async function POST(req) {

    const session = await getSession();
    try {
        await connectDb()
        const body = await req.json();

        const { searchInput } = body;

        // // console.log("findfriend")
        let finduser_ = await User.findOne({ email: session.user.email })
        // let finduser_ = await User.findOne({ email: "abhinandanmaity1122@gmail.com" })
        if (!finduser_) {
            return NextResponse.json({ error: "User Not Exist!" }, { status: 400 })
        }
        // // console.log("findfriend")
        // let findfriend = await Friend.find({ receiver: finduser_.email })
        // // // console.log("findfriend")
        // let findfriend_ = await Friend.find({ sender: finduser_.email })

        // const users = await User.find({ username: { $regex: searchInput, $options: 'i' } });
        const users = await User.find({
            $or: [
                { name: { $regex: searchInput, $options: 'i' } },
                { username: { $regex: searchInput, $options: 'i' } }
            ]
        });

        // let chat = await Chat.find({email: session.user.email, })
        // // console.log(users)
        // // console.log(findfriend_)

        // let total = [];
        // users.forEach(element => {

        // total.push(element)
        // });

        // // console.log(users)
        // // console.log(users.length)

        let conversations = []
        for (let i = 0; i < users.length; i++) {

            let findfriend = await Friend.findOne({ receiver: users[i].email, sender: finduser_.email })
            // // console.log("findfriend")
            let findfriend_ = await Friend.findOne({ sender: users[i].email, receiver: finduser_.email })

            // // console.log(!findfriend)
            // // console.log(!findfriend_)
            // // console.log(findsender.email == "abhinandanmaity1122@gmail.com")
            if ((!findfriend && !findfriend_) && users[i].email != finduser_.email) {
                const obj = users[i];
                // // console.log(obj)
                conversations.push(obj);

            }
        }

        // const conversations = conversation.filter(name => inputValue.test(name.name));

        // // console.log(conversations)
        return NextResponse.json({ conversations: conversations }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}