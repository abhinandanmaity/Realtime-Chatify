
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
        const { id } = body;

        // // console.log(body)
        // // console.log(body.name)

        let findchat = await Chat.findById(id)
        if (!findchat) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }

        // let finduser = await User.findOne({ email: "abhinandanmaity1122@gmail.com" })
        let finduser = await User.findOne({ email: session.user.email })
        let finduser_ = await User.findById(findchat.receiver)
        if (!finduser) {
            return NextResponse.json({ error: "User Not Exist !" }, { status: 400 })
        }

        let findchat_ = await Chat.findOne({ sender: findchat.receiver, receiver: findchat.sender, isGroupChat: false })
        // let findchatreceiver = await Chat.findOne({ sender: findchat.sender, receiver: findchat.receiver, isGroupChat: false })

        let isGroupChat = findchat.isGroupChat;
        let admin = findchat.admin;
        let messages = {};

        let room_id;
        if (!isGroupChat && !admin && finduser_ && findchat_) {

            let findmessage = await Message.find({ sender: finduser._id, chat: findchat._id }).sort({ createdAt: 1 })

            // // console.log(findmessage)
            let array = []
            findmessage.forEach((element) => {

                let obj1 = { ...element, senderusername: finduser.username, senderimage: finduser.image, reciverusername: finduser_.username, receiverimage: finduser_.image }

                array.push(obj1)
            })

            // messages = { ...messages, message: findmessage };


            let findmessage_ = await Message.find({ sender: finduser_._id, chat: findchat_._id }).sort({ createdAt: 1 })

            // // console.log(findmessage_)
            findmessage_.forEach((element) => {

                let obj1 = { ...element, senderusername: finduser.username, senderimage: finduser.image, reciverusername: finduser_.username, receiverimage: finduser_.image }

                array.push(obj1)
            })
            array.sort(function (a, b) {

                let d1 = new Date(a._doc.createdAt);
                let d2 = new Date(b._doc.createdAt);

                if (d1 > d2) {
                    return 1;
                }
                if (d1 < d2) {
                    return -1;
                }
            });
            // // console.log(array)

            messages = array;
            room_id = findchat.singlechatid;

        } else if (isGroupChat && admin) {

            let findmessage = await Message.find({ sender: finduser._id, chat: findchat._id }).sort({ createdAt: 1 })

            // // console.log(findmessage)

            // messages = { ...messages, sender: findmessage };

            let array = []
            findmessage.forEach((element) => {

                let obj1 = { ...element, senderusername: finduser.username, senderimage: finduser.image }

                array.push(obj1)
            })
            // // console.log(finduser._id)
            let part = findchat.participants;
            // // console.log(part)

            for (let i = 0; i < part.length; i++) {
                let element = part[i];

                if (finduser._id.toString() !== element.toString()) {

                    let findmember = await User.findById(element)
                    // // console.log(findmember)
                    let findchat__ = await Chat.findOne({ sender: element, isGroupChat: true, Groupid: findchat.Groupid })
                    let findmessage_ = await Message.find({ sender: element, chat: findchat__._id }).sort({ createdAt: 1 })
                    findmessage_.forEach((elemen) => {
                        // // console.log(elemen)
                        let obj1 = { ...elemen, reciverusername: findmember.username, receiverimage: findmember.image }

                        array.push(obj1)
                    })
                }
            }
            // part.forEach(async (element) => {

            //     // // console.log((finduser._id).equals(element))
            //     // if(finduser._id.toString() !== element.toString()){

            //         // console.log(element)
            //         let findmember = await User.findById(element)
            //         // // console.log(findmember)
            //         let findchat__ = await Chat.findOne({ sender: element, isGroupChat: true, Groupid: findchat.Groupid })
            //         let findmessage_ = await Message.find({ sender: element, chat: findchat__._id }).sort({ createdAt: 1 })
            //         findmessage_.forEach((elemen) => {
            //             // // console.log(elemen)
            //             let obj1 = { ...elemen, reciverusername: findmember.username, receiverimage: findmember.image }

            //             array.push(obj1)
            //         })
            //     // }
            // })


            array.sort(function (a, b) {

                let d1 = new Date(a._doc.createdAt);
                let d2 = new Date(b._doc.createdAt);

                if (d1 > d2) {
                    return 1;
                }
                if (d1 < d2) {
                    return -1;
                }
            });
            // // console.log(array)

            messages = array;

            room_id = findchat.Groupid;
        }

        // // console.log(messages);

        return NextResponse.json({ messages, socketid: finduser._id, room_id: room_id }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}