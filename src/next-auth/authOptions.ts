import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Exclusive",
            credentials: {
                email: { label: "User Email", placeholder: "example@domain.com", type: "email" },
                password: { label: "User Password", placeholder: "******", type: "password" },
            },
            authorize: async function (credentials, req) {
                // call api signin
                // return ???
                // success => User {} 
                // error => false / null

                const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
                    method: "POST",
                    body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const data = await response.json();

                console.log('auth signin', data);

                if (!response.ok) {
                    return null
                }

                const decoded = jwtDecode<{ id: string }>(data.token)

                return {
                    id: decoded?.id,
                    email: data.user.email,
                    name: data.user.name,
                    accessToken: data.token
                }
            }
        }),


    ],


    session: {
        maxAge: 60 * 60 * 24 * 7
    },




    callbacks: {

        jwt({ token, user }) {
            console.log('jwt', { token, user });

            if (user) {
                token.accessToken = user.accessToken;
                token.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }


            return token
        },

        session({ session, token }) {
            // 1. useSession , 2. getServerSession, 3. /api/auth/session
            console.log('session', { session, token });

            if (token) {
                session.user = token.user
            }


            return session
        },
    },
    pages: {
        signIn: '/login'
    }
}
