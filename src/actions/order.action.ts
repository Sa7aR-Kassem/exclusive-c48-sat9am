"use server";

import { getUserId, getUserToken } from "@/lib/server-utils";
import { AddressPayloadType } from "@/schema/address.schema";

export async function createOrder(cartId: string, formValues: AddressPayloadType) {

    const token = await getUserToken();
    console.log('createOrder', token, cartId);

    if (!token) {
        return {
            message: "Please login first"
        }
    }

    if (!cartId) {
        return {
            message: "Please login first"
        }
    }

    const { paymentMethod, ...shippingAddress } = formValues;
    const endpoint = paymentMethod === "cash" ?
        `api/v2/orders/${cartId}` :
        `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`

    const response = await fetch(`https://ecommerce.routemisr.com/${endpoint}`, {
        method: "POST",
        headers: { token, "Content-Type": "application/json", },
        body: JSON.stringify({ shippingAddress })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || `${response.status} ${response.statusText}: Error occurred while fetching cart details`);
    }

    return data
}

export async function getMyOrders() {

    const userId = await getUserId();
    // console.log('createOrder', token, cartId);

    if (!userId) {
        return {
            message: "Please login first"
        }
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,)

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || `${response.status} ${response.statusText}: Error occurred while fetching orders`);
    }

    return data
}
