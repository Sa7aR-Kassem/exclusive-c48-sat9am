import * as z from 'zod'

enum PaymentMethod {
    CASH = "cash",
    CARD = "card"
}

export const defaultValues = {
    details: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: PaymentMethod.CASH
}

export const addressSchema = z.object({
    details: z.string().nonempty().min(3).max(15),
    city: z.string().nonempty().min(3).max(15),
    postalCode: z.string().nonempty().min(3).max(15),
    phone: z.string().regex(/^(002)?01[0125][0-9]{8}$/, { error: "Invalid Phone Number" }),
    paymentMethod: z.enum(["cash", "card"], { error: "Payment Method is Required" })
})

export type AddressPayloadType = z.infer<typeof addressSchema>

