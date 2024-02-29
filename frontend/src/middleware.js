// import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
// import { useDispatch } from 'react-redux'
// import { useremail } from '@/redux/slice/user/sessionSlice';
// import { authOptions } from './app/api/auth/[...nextauth]/route'

export default withAuth(
    async function middleware(req) {
        //     const dispatch = useDispatch()
        // dispatch(useremail());
        const pathname = req.nextUrl.pathname
        // const session = await getServerSession(authOptions);
        // console.log("session ",session)

        // Manage route protection
        const isAuth = await getToken({ req })
        // console.log(isAuth.email)
        const isLoginPage = pathname.startsWith('/sign-in')
        const isSignupPage = pathname.startsWith('/sign-up')

        console.log("req.nextUrl")
        console.log(isAuth)
        console.log("----- req.nextUrl ---- ")
        console.log(req)
        // console.log(req.nextUrl.pathname == "/sign-in")
        const sensitiveRoutes = ['/user']
        const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
            pathname.startsWith(route)
        )

        if (req.nextUrl.pathname == "/sign-up" || req.nextUrl.pathname == "/sign-in") {
            if (isAuth) {
                return NextResponse.redirect(new URL('/user', req.url))
            } else {

                return NextResponse.next()
            }
        }

        // if (!isAuth && isAccessingSensitiveRoute) {
        //     return NextResponse.redirect(new URL('/sign-in', req.url))
        // }
        if (!isAuth && req.nextUrl.pathname == "/user") {
            return NextResponse.redirect(new URL('/sign-in', req.url))
        }
        if (req.nextUrl.pathname == "/" && isAuth) {
            return NextResponse.redirect(new URL('/user', req.url))
        }
        if (req.nextUrl.pathname == "/" && !isAuth) {
            return NextResponse.redirect(new URL('/sign-in', req.url))
        }
    },
    {
        callbacks: {
            async authorized() {
                return true
            },
        },
    }
)

export const config = {
    matcher: ["/", "/sign-in", "/sign-up", "/user", "/user/conversations/:path*"]
}