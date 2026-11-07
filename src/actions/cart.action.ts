"use server";

import { getUserToken } from "@/lib/server-utils";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";

export async function getCartUser() {

    const token = await getUserToken()
    if (!token) {
        return {
            message: "Please login first"
        }
    }

    const response = await fetch('https://ecommerce.routemisr.com/api/v2/cart', {
        headers: { token },
        next: { tags: ["cartDetails"] }
    })

    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}: Error occurred while fetching cart details`);
    }

    return await response.json()
}

export async function addToCart(productId: string) {

    const token = await getUserToken();
    console.log('token', token);
    console.log('productId', productId);

    if (!token) {
        return {
            message: "Please login first"
        }
    }

    const response = await fetch('https://ecommerce.routemisr.com/api/v2/cart', {
        method: "POST",
        headers: { token, "Content-Type": "application/json", },
        body: JSON.stringify({ productId: productId })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || `${response.status} ${response.statusText}: Error occurred while adding a product to cart`);
    }


    if (data.status == "success") {
        // revalidateTag("cartDetails", "max")
        updateTag("cartDetails")
    }

    return data
}

export async function updateProductQty(productId: string, count: number) {

    const token = await getUserToken();

    if (!token) {
        return {
            message: "Please login first"
        }
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
        method: "PUT",
        headers: { token, "Content-Type": "application/json", },
        body: JSON.stringify({ count })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || `${response.status} ${response.statusText}: Error occurred while adding a product to cart`);
    }

    if (data.status == "success") {
        // revalidateTag("cartDetails", "max")
        updateTag("cartDetails")
    }

    return data
}
export async function removeFromCart(productId: string) {

    const token = await getUserToken();

    if (!token) {
        return {
            message: "Please login first"
        }
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
        method: "DELETE",
        headers: { token, "Content-Type": "application/json", },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || `${response.status} ${response.statusText}: Error occurred while adding a product to cart`);
    }

    if (data.status == "success") {
        // revalidateTag("cartDetails", "max")
        updateTag("cartDetails")
    }

    return data
}




export async function removeCartUser() {

    const token = await getUserToken()
    if (!token) {
        return {
            message: "Please login first"
        }
    }

    const response = await fetch('https://ecommerce.routemisr.com/api/v2/cart', {
        method: "DELETE",
        headers: { token }
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || `${response.status} ${response.statusText}: Error occurred while fetching cart details`);
    }

    if (data.status == "success") {
        // revalidateTag("cartDetails", "max")
        updateTag("cartDetails")
    }

    return data
}
