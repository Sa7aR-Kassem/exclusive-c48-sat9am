"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getUserJWT() {
    const decodedToken = (await cookies()).get('next-auth.session-token')?.value;

    const token = await decode({ token: decodedToken, secret: process.env.NEXTAUTH_SECRET! })

    // const accessToken = token?.accessToken

    return token
}

export async function getUserToken() {
    return (await getUserJWT())?.accessToken
}

export async function getUserId() {
    return (await getUserJWT())?.sub
}