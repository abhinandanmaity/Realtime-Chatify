
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
        // let groups = []
        for (let i = 0; i < total.length; i++) {

            let findsender = await User.findOne({ email: total[i].sender });
            let findreceiver = await User.findOne({ email: total[i].receiver });

            // // console.log(findsender.email == "abhinandanmaity1122@gmail.com")
            if (findsender.email == finduser_.email) {

                let chat = await Chat.findOne({ sender: findsender._id, receiver: findreceiver._id, isGroupChat: false })
                // let group = await Chat.findOne({ sender: finduser_.email, isGroupChat: true })

                const obj = findreceiver;

                if (chat && chat.lastMessage) {
                    let lastMessage = await Message.findById(chat.lastMessage);

                    const newobj = { ...obj, content: lastMessage.content, attachments: lastMessage.attachments, time: lastMessage.messagetime, date: lastMessage.messagedate, hour: lastMessage.messagehour, minute: lastMessage.messageminute, second: lastMessage.messagesecond, chatid: chat._id, notification: chat.notilen }
                    // // console.log("chat we --user")
                    conversations.push(newobj);
                } else if (chat && !chat.lastMessage) {

                    const newobj = { ...obj, content: undefined, attachments: undefined, time: undefined, date: undefined, hour: undefined, minute: undefined, second: undefined, chatid: chat._id, notification: chat.notilen }
                    // // console.log(newobj)
                    // // console.log("chat 1 -- user")
                    conversations.push(newobj);
                }

            } else if (findreceiver.email == finduser_.email) {

                let chat = await Chat.findOne({ receiver: findsender._id, sender: findreceiver._id, isGroupChat: false })
                // // console.log(chat)
                // let group = await Chat.findOne({ sender: findreceiver._id, isGroupChat: true })
                // // console.log(group)
                // // console.log(lastMessage)

                const obj = findsender;
                // // console.log(chat)
                if (chat && chat.lastMessage) {
                    let lastMessage = await Message.findById(chat.lastMessage);

                    const newobj = { ...obj, content: lastMessage.content, attachments: lastMessage.attachments, time: lastMessage.messagetime, date: lastMessage.messagedate, hour: lastMessage.messagehour, minute: lastMessage.messageminute, second: lastMessage.messagesecond, chatid: chat._id, notification: chat.notilen }
                    // // console.log(newobj)
                    // // console.log("chat -- user")
                    conversations.push(newobj);
                } else if (chat && !chat.lastMessage) {

                    const newobj = { ...obj, content: undefined, attachments: undefined, time: undefined, date: undefined, hour: undefined, minute: undefined, second: undefined, chatid: chat._id, notification: chat.notilen }
                    // // console.log(newobj)
                    // // console.log("chat 2 -- user")
                    conversations.push(newobj);
                }

            }
        }

        let grou = await Chat.find({ sender: finduser_._id, isGroupChat: true })
        let groups = []
        // // console.log(grou)
        // // console.log(conversations)
        for (let i = 0; i < grou.length; i++) {

            let group = await Chat.findOne({ sender: grou[i].sender, isGroupChat: true, Groupid: grou[i].Groupid })
            // // console.log(group)
            let obj = finduser_
            // // console.log(group.lastMessage)
            if (group && group.lastMessage) {
                let lastMessage_ = await Message.findById(group.lastMessage);
                // // console.log(lastMessage_)
                const newobj = { ...obj, content: lastMessage_.content, attachments: lastMessage_.attachments, time: lastMessage_.messagetime, date: lastMessage_.messagedate, hour: lastMessage_.messagehour, minute: lastMessage_.messageminute, second: lastMessage_.messagesecond, chatid: group._id, Groupname: group.Groupname, Groupimage: group.Groupimage, notification: group.notilen }
                // // console.log("newobj -- group")
                groups.push(newobj);
            } else if (group && !group.lastMessage) {

                const newobj = { ...obj, content: undefined, attachments: undefined, time: undefined, date: undefined, hour: undefined, minute: undefined, second: undefined, chatid: group._id, Groupname: group.Groupname, Groupimage: group.Groupimage, notification: group.notilen }
                // // console.log(" chat 2 -- group")
                groups.push(newobj)
            }
            // // console.log("group")
            // // console.log(groups)
        }

        // // console.log(grou)
        // // console.log(groups)
        // // console.log(conversations)

        return NextResponse.json({ conversations: conversations, groups: groups }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}