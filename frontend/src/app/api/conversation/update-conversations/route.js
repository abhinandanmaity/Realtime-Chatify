
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Chat from "@/models/Chat";
import getSession from "../../session/get-session";


export async function POST(req) {

    const session = await getSession();
    try {
        await connectDb()
        const body = await req.json();
        const { id, konsa } = body

        // // console.log(body)
        // // console.log(body.name)
        let finduser_ = await User.findOne({ email: session.user.email })

        let findchat = await Chat.findById(id)
        if (!findchat) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }

        if (konsa == "getchat") {

            if (findchat.isGroupChat == true) {

                // let arr = findchat.participants;

                // for (let i = 0; i < arr.length; i++) {
                //     const element = arr[i];
                //     if ((finduser_._id).toString() == element.toString()) {

                await Chat.updateOne({ sender: findchat.sender, isGroupChat: true, Groupid: findchat.Groupid }, { notilen: 0 })
                //     }
                // }
            } else if (findchat.isGroupChat == false) {

                await Chat.updateOne({ sender: findchat.sender, isGroupChat: false, singlechatid: findchat.singlechatid }, { notilen: 0 })
            }
        }
        if (konsa == "newmessage") {

            // await Chat.findByIdAndUpdate(findchat._id, { notilen: num })
            // // console.log(" == num -- ")
            // // console.log(num)

            if (findchat.isGroupChat == true) {

                let sot = findchat.participants;
                let arr = []
                for (let i = 0; i < sot.length; i++) {
                    const element = sot[i];

                    if (!(findchat.sender).equals(element)) {

                        arr.push(element)
                    }
                }

                // console.log(arr)
                for (let i = 0; i < arr.length; i++) {
                    const element = arr[i];

                    let findchat_ = await Chat.findOne({ sender: element, isGroupChat: true, Groupid: findchat.Groupid })
                    let num = findchat_.notilen + 1;
                    // // console.log(" == num -- ")
                    // // console.log(num)
                    // if ((finduser_._id).toString() == element.toString()) {
                    // console.log(finduser_._id)
                    // console.log(element)
                    // console.log((finduser_._id).equals(element))
                    // console.log((finduser_._id).toString() == element.toString())
                    // } else 
                    // if ((finduser_._id).equals(element)) {



                    // } else {

                    // console.log("-- update --")
                    // console.log(element)
                    await Chat.updateOne({ sender: element, isGroupChat: true, Groupid: findchat.Groupid }, { notilen: num })
                    // }
                }
            } else if (findchat.isGroupChat == false) {

                let findchat_ = await Chat.findOne({ sender: findchat.receiver, isGroupChat: false, singlechatid: findchat.singlechatid })
                let num = findchat_.notilen + 1;
                // // console.log(" == num -- ")
                // // console.log(num)
                await Chat.updateOne({ sender: findchat.receiver, isGroupChat: false, singlechatid: findchat.singlechatid }, { notilen: num })
            }
        }

        return NextResponse.json({ success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}