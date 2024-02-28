
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Chat from "@/models/Chat";
// var jwt = require('jsonwebtoken');


export async function POST(req) {

    try {
        await connectDb()
        const body = await req.json();
        const { isGroupChat, participants, id } = body;

        // // console.log(body)
        // // console.log(body.name)

        if (isGroupChat && participants) {


            
            let findchat = await Chat.findById(id)
            let array = []
            findchat.participants.forEach(element => {
                
                array.push(element)
            })

            // participants.forEach((element) => {
    
            //     array.push(element)
            // });
            
            // let chatadmin = new Chat({ sender: element, Groupid: findchat.Groupid, admin: findchat.admin, participants: array, isGroupChat: true, Groupname: findchat.Groupname });
            
            // await chatadmin.save();
            if(array.length > 0){

                participants.forEach(async (element) => {
    
                    // let findparticipants = await User.findById(element._id)
                    let chatadmin = new Chat({ sender: element, Groupid: findchat.Groupid, admin: findchat.admin, participants: array, isGroupChat: true, Groupname: findchat.Groupname });
    
                    await chatadmin.save();
                });
            }
        }

        return NextResponse.json({ success: "success" }, { status: 200 })
    } catch (error) {

        return NextResponse.json({ error: "Invalid request type !" }, { status: 400 })
    }
}