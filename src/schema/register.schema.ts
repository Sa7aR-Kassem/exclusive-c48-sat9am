import * as z from 'zod'

export const defaultValues = {
    email: "",
    name: "",
    password: "",
    rePassword: "",
    phone: ""
}

export const registerSchema = z.object({
    name: z.string().nonempty().min(3).max(15),
    email: z.email({ error: "Invalid Email" }),
    password: z.string().nonempty({ error: "Required Password" }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, { error: "Invalid Password" }),
    rePassword: z.string().nonempty({ error: "Required Password" }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, { error: "Invalid rePassword" }),
    phone: z.string().regex(/^(002)?01[0125][0-9]{8}$/, { error: "Invalid Phone Number" })
}).refine((data) => data.password === data.rePassword, { error: "Passwords are not match", path: ["rePassword"] });

export type RegisterPayloadType = z.infer<typeof registerSchema>

