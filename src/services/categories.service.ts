


export async function getCategories() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')

    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}: Error occurred while fetching categories`);
    }

    return await response.json()
}