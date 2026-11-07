import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectRoutes = ['/cart', '/checkout', '/allorders', '/profile']
const authRoutes = ['/login', '/register']



export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    console.log('pathname', pathname);

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET, secureCookie: process.env.NODE_ENV === "production" })
    console.log('proxy token', token);

    // !token & cart => /login
    if (!token && protectRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    // token & auth => /
    if (token && authRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }


    // token & cart
    return NextResponse.next()
}


export const config = {
    matcher: [
        "/cart/:path*",
        "/profile/:path*",
        "/login",
        "/register"
    ],
}