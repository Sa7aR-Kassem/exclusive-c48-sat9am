"use server"

import { RegisterPayloadType } from "@/schema/register.schema";
import { cookies } from "next/headers";

export async function registerHandler(formValues: RegisterPayloadType) {
    try {
        const response = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signup",
            {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        const data = await response.json();


        if (!response.ok) {
            throw new Error(data.message || "Invalid Credentials");
        }

        const cookie = await cookies()
        cookie.set('userToken', data.token, {
            maxAge: 60 * 60 * 34 * 7,
            httpOnly: true,
            // secure: 
        })

        return {
            ...data,
            message: "Account has been created successfully",
            status: true
        }
    } catch (error) {

        return {
            message: (error as Error)?.message,
            status: false
        }
    }
}

/// localStorage 
// 5M : 10M
// client
// xxx expire

// cookies
// 4K
// access : client / server 
// http
// expire ??



// 1. Server Action
// 1. Secure Request
// 2. Secure Response
// 3. Store Token (cookies)


// 2. Route Handler
// 1. Secure Request
// 2. Secure Response
// 3. Store Token (cookies) ... 
// encryption token => secret key



