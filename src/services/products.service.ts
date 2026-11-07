


export async function getProducts(categoryId?: string, limit: number = 40) {
    const params = new URLSearchParams()

    if (categoryId) {
        params.append("category[in]", categoryId)
    }

    if (limit) {
        params.append("limit", String(limit))
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?${params.toString()}`)

    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}: Error occurred while fetching products`);
    }

    return await response.json()
}

export async function getSingleProduct(productId: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)

    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}: Error occurred while fetching product details`);
    }

    return await response.json()
}