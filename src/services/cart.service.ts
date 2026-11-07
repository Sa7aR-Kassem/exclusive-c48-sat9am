


export async function getProducts() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products')

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