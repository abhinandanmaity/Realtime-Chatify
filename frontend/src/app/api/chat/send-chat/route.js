
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import getSession from "../../session/get-session";
import Chat from "@/models/Chat";
import Message from "@/models/Message";
// var jwt = require('jsonwebtoken');


export async function POST(req) {

    const session = await getSession();
    try {
        await connectDb()
        const body = await req.json();
        const { id, content, attachments } = body;

        let mess_ = content.trim()
        let mess = mess_.length
        // // console.log(attachments)
        // // console.log(mess_)
        // // console.log(mess)
        // // console.log(body.name)
        if ((attachments == undefined && mess <= 0) || content == undefined) {
            // console.log("daktaha")
            return NextResponse.json({ error: "You can't send" }, { status: 400 })
        }

        let findchat = await Chat.findById(id)
        // let findchatsender = await Chat.findOne({sender: findchat.receiver, receiver: findchat.sender})
        if (!findchat) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }

        let finduser = await User.findOne({ email: session.user.email })
        // let finduser = await User.findOne({ email: "abhinandanmaity222@gmail.com" })
        let finduser_ = await User.findById(findchat.receiver)
        if (!finduser) {
            return NextResponse.json({ error: "User Not Exist !" }, { status: 400 })
        }
        // // console.log(finduser_._id)
        //     // console.log(finduser._id)


        let curr = new Date();
        let curroffset = curr.getTimezoneOffset();
        let ISToffset = 330;
        let ISTtime = new Date(curr.getTime() + (ISToffset + curroffset) * 60000)

        let hourIST = ISTtime.getHours()
        let minuteIST = ISTtime.getMinutes()
        let secondIST = ISTtime.getSeconds()

        let dayIST = ISTtime.getDate()
        let monthIST = ISTtime.getMonth() + 1
        let yearIST = ISTtime.getFullYear()

        let date = dayIST + "/" + monthIST + "/" + yearIST
        let time = hourIST + ":" + minuteIST

        // // console.log(date)

        let message = new Message({ sender: finduser._id, content: content, attachments: attachments, chat: findchat._id, messagedate: date, messagetime: time, messagehour: hourIST, messageminute: minuteIST, messagesecond: secondIST });

        await message.save();

        let isGroupChat = findchat.isGroupChat;
        let admin = findchat.admin;
        let newmessage;
        // // console.log(isGroupChat)
        // // console.log(admin)
        // // console.log(findchat)
        // // console.log(finduser)
        // // console.log(finduser_)

        if (!isGroupChat && !admin && finduser_) {

            let findmessage = await Message.findOne({ sender: finduser._id, content: content, attachments: attachments, chat: findchat._id, messagedate: date, messagetime: time, messagehour: hourIST, messageminute: minuteIST, messagesecond: secondIST })

            // // console.log(finduser_._id)
            // // console.log(finduser._id)
            // // console.log(findchat.sender)
            // // console.log(findchatsender)

            let findchat_ = await Chat.findOne({ sender: finduser_._id, receiver: finduser._id })
            // // console.log(findchat_)

            // const filter = { _id: findchat_._id }
            // const update = { $set: { lastMessage: findmessage._id } }
            await Chat.findByIdAndUpdate(findchat_._id, { lastMessage: findmessage._id })
            await Chat.findByIdAndUpdate(findchat._id, { lastMessage: findmessage._id })
            // let findchat__ = await Chat.findOne({ sender: finduser_._id, receiver: finduser._id })
            // // console.log(findchat__)

            let users = []
            users.push(finduser_._id)
            users.push(finduser._id)
            newmessage = { _doc: findmessage, reciverusername: finduser_.username, receiverimage: finduser_.image, senderusername: finduser.username, senderimage: finduser.image, chat: users, sender: finduser, room_id: findchat.singlechatid }


        } else if (isGroupChat && admin) {

            let findmessage = await Message.findOne({ sender: finduser._id, content: content, attachments: attachments, chat: findchat._id, messagedate: date, messagetime: time, messagehour: hourIST, messageminute: minuteIST, messagesecond: secondIST })

            // // console.log(findmessage)
            // let findchat_ = await Chat.findOne({ sender: finduser_._id, isGroupChat: true, Groupid: findchat.Groupid })
            await Chat.findByIdAndUpdate(findchat._id, { lastMessage: findmessage._id })
            let participants = findchat.participants;

            participants.forEach(async (element) => {

                // let findparticipants = await User.findById(element)
                // const filter = { sender: findparticipants._id, isGroupChat: true }
                // const update = { $set: { lastMessage: findmessage._id } }
                // await Chat.updateOne(filter, update);
                let findchat_ = await Chat.findOne({ sender: element, isGroupChat: true, Groupid: findchat.Groupid })
                await Chat.findByIdAndUpdate(findchat_._id, { lastMessage: findmessage._id })

                //********************************************** */
                // if (finduser._id != element) {

                // let findmember = await User.findById(element)

                //     let findchat_ = await Chat.findOne({ sender: element, isGroupChat: true, Groupid: findchat.Groupid })
                //     let findmessage_ = await Message.find({ sender: element, chat: findchat_._id }).sort({ createdAt: 1 })
                //     findmessage_.forEach((element) => {

                //         let obj1 = { ...element, reciverusername: findmember.username, receiverimage: findmember.image }

                //         array.push(obj1)
                //     })
                // }

            });

            newmessage = { _doc: findmessage, reciverusername: finduser.username, receiverimage: finduser.image, senderusername: finduser.username, senderimage: finduser.image, chat: findchat.participants, sender: finduser, room_id: findchat.Groupid }

            // newmessage = { _doc: findmessage, senderusername: finduser.username, senderimage: finduser.image, chat: findchat.participants, sender: finduser, room_id: findchat.Groupid }

        }
        // // console.log(message)

        return NextResponse.json({ newmessage }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}