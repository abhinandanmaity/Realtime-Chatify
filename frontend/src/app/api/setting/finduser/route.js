
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import getSession from "../../session/get-session";
import Friend from "@/models/Friend";
import Chat from "@/models/Chat";
import Message from "@/models/Message";
// var jwt = require('jsonwebtoken');


export async function POST(req) {

    const session = await getSession();
    try {
        await connectDb()
        const body = await req.json();

        const {searchInput} = body;

        // // console.log("findfriend")
        let finduser_ = await User.findOne({ email: session.user.email })
        // let finduser_ = await User.findOne({ email: "abhinandanmaity1122@gmail.com" })
        if (!finduser_) {
            return NextResponse.json({ error: "User Not Exist!" }, { status: 400 })
        }
        // // console.log("findfriend")
        let findfriend = await Friend.find({ receiver: finduser_.email, request: false, friend: true })
        // // console.log("findfriend")
        let findfriend_ = await Friend.find({ sender: finduser_.email, request: false, friend: true })

        // const users = await User.find({ name: { $regex: search, $options: 'i' } });

        // let chat = await Chat.find({email: session.user.email, })
        // // console.log(findfriend)
        // // console.log(findfriend_)

        let total = [];
        findfriend.forEach(element => {

            total.push(element)
        });
        findfriend_.forEach(element => {

            total.push(element)
        });

        // // console.log(total)

        let conversations = []
        for (let i = 0; i < total.length; i++) {

            let findsender = await User.findOne({ email: total[i].sender });
            let findreceiver = await User.findOne({ email: total[i].receiver});

            // // console.log(findsender.email == "abhinandanmaity1122@gmail.com")
            if (findsender.email == finduser_.email) {
                const obj = findreceiver;

                conversations.push(obj);

            } else if (findreceiver.email == finduser_.email) {

                const obj = findsender;
                // // console.log(chat)
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