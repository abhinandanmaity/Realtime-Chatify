
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import getSession from "../../session/get-session";
import Chat from "@/models/Chat";


export async function POST(req) {

    // let session = await getSession()

    try {
        await connectDb()
        const body = await req.json();
        const { Groupname, Groupimage, Groupdesc, participants, id } = body;

        // // console.log(body)
        // // console.log(body.name)

        let findchat = await Chat.findById(id)
        if (!findchat) {
            return NextResponse.json({ error: "Bad request" }, { status: 400 })
        }

        if (participants) {

            let updatedparticipants = []
            
            findchat.participants.forEach(element => {

                updatedparticipants.push(element)
            });
            participants.forEach(element => {

                updatedparticipants.push(element._id)
            });
            
            

            for (let i = 0; i < updatedparticipants.length; i++) {
                const element = updatedparticipants[i];

                let findc = await Chat.findOne({Groupid: findchat.Groupid, sender: element, isGroupChat: true})

                await Chat.findByIdAndUpdate(findc._id, { participants: updatedparticipants })
            }

        }

        let findcha = await Chat.findById(id)
        if (Groupimage && Groupdesc && Groupname) {

            // await Chat.findByIdAndUpdate(findchat._id, { Groupname, Groupimage, Groupdesc })
            findcha.participants.forEach(async element => {

                let findc = await Chat.findOne({Groupid: findcha.Groupid, sender: element, isGroupChat: true})

                await Chat.findByIdAndUpdate(findc._id, { Groupname, Groupimage, Groupdesc })
            });
        } else if (Groupdesc && Groupname) {

            // await Chat.findByIdAndUpdate(findchat._id, { Groupname, Groupdesc })
            findcha.participants.forEach(async element => {

                let findc = await Chat.findOne({Groupid: findcha.Groupid, sender: element, isGroupChat: true})

                await Chat.findByIdAndUpdate(findc._id, { Groupname, Groupdesc })
            });
        } else if (Groupimage && Groupname) {

            // await Chat.findByIdAndUpdate(findchat._id, { Groupname, Groupimage })
            findcha.participants.forEach(async element => {

                let findc = await Chat.findOne({Groupid: findcha.Groupid, sender: element, isGroupChat: true})

                await Chat.findByIdAndUpdate(findc._id, { Groupname, Groupimage })
            });
        } else if (Groupimage && Groupdesc) {

            // await Chat.findByIdAndUpdate(findchat._id, { Groupimage, Groupdesc })
            findcha.participants.forEach(async element => {

                let findc = await Chat.findOne({Groupid: findcha.Groupid, sender: element, isGroupChat: true})

                await Chat.findByIdAndUpdate(findc._id, { Groupimage, Groupdesc })
            });
        } else if (Groupdesc) {

            // await Chat.findByIdAndUpdate(findchat._id, { Groupdesc })
            findcha.participants.forEach(async element => {

                let findc = await Chat.findOne({Groupid: findcha.Groupid, sender: element, isGroupChat: true})

                await Chat.findByIdAndUpdate(findc._id, { Groupdesc })
            });
        } else if (Groupname) {

            // await Chat.findByIdAndUpdate(findchat._id, { Groupname })
            findcha.participants.forEach(async element => {

                let findc = await Chat.findOne({Groupid: findcha.Groupid, sender: element, isGroupChat: true})

                await Chat.findByIdAndUpdate(findc._id, { Groupname })
            });
        } else if (Groupimage) {

            // await Chat.findByIdAndUpdate(findchat._id, { Groupimage })
            findcha.participants.forEach(async element => {

                let findc = await Chat.findOne({Groupid: findcha.Groupid, sender: element, isGroupChat: true})

                await Chat.findByIdAndUpdate(findc._id, { Groupimage })
            });
        }

        return NextResponse.json({ success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}