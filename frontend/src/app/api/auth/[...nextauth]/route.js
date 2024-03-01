
import { connectDb } from "@/lib/connectDB";
import User from "@/models/User"
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');



export const authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: 'email' },
                password: { label: 'password' }
            },

            async authorize(credentials) {
                // const { email, password } = credentials;

                // // console.log(credentials)
                // // console.log(credentials.email)

                if (!credentials || !credentials.email || !credentials.password) {

                    return null;
                }

                // // console.log(credentials.password)
                try {

                    await connectDb();
                    let user = await User.findOne({ email: credentials.email })

                    if (!user || !user.password || user.password == 'google') {

                        return null;
                    }
                    // // console.log(user)

                    let bytes = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_SECRET_KEY);

                    // // console.log(credentials.password)
                    // // console.log(bytes.toString(CryptoJS.enc.Utf8))
                    // // console.log(credentials.password == bytes.toString(CryptoJS.enc.Utf8))
                    // // console.log(credentials.password != bytes.toString(CryptoJS.enc.Utf8))
                    if (credentials.password != bytes.toString(CryptoJS.enc.Utf8)) {

                        return null;
                    }
                    // // console.log(credentials.password)
                    // // console.log(credentials.email)
                    return user;
                } catch (error) {

                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account }) {

            // // console.log(account.provider)
            // // console.log(account.provider == 'google')
            await connectDb()
            if (account.provider == 'google') {

                const { name, email, image } = user;

                // let name = "Abhinandan Maity"
                let a = 33333;
                let b = 99999;

                let rand = Math.floor(Math.random() * (a + (b - a) * Math.random() * Math.random()));
                let removespace = name.split(" ").join("_");
                let usern = removespace.toLowerCase()
                let newuser = usern + "_";
                newuser = newuser + rand;
                // // console.log(newuser)
                // // console.log(account)

                let finduser = await User.findOne({ email: email, password: 'google', username: newuser })
                if (finduser) {
                    return finduser;
                }
                // // console.log(name)
                let use = new User({ name, username: newuser, email, image, password: 'google' });
                await use.save();
                // // console.log(email)

                return user;
            }

            let us = await User.findOne({ email: user.email })
            if (us) {

                return us
            }
            return null
        },
        async jwt({ token, user }) {

            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
                return token;
            }
            return token;

        },
        // async decode({ secret, token }) {
        //     return jwt.verify(token, secret)
        // },
        async session({ session, token }) {
            if (token) {

                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.image
            }
            return session
        },
        // redirect() {
        //     return "/user"
        // },
    },
    // debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/sign-in"
    }

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
